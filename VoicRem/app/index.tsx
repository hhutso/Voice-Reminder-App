import React, {useState, useEffect} from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/style';
import {useRecorder} from './utils/record';
import {usePlayback} from './utils/playhelper';
import { formatDateTime } from './utils/datehelper';

type Reminder = {
  id: number;
  title: string;
  date: number;
  audioUri?: string | null | undefined;
};

const reminderCreator = () => {
  const [items, setItems] = useState([]); //state to hold the list of items
  const[itemCount, setItemCount] = useState(0); //unique keys to items
}

export default function Index() {
  const { isRecording, recordingUri, startRecording, stopRecording} = useRecorder();
  const [activeUri, setActiveUri] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([
    {id: 1, title: 'Test1', date: 2025, audioUri: null},
  ]);
  const {play, pause, playing, isLoaded} = usePlayback(activeUri);

 

  const handleAddReminder = (uri: string) => {
    //add a new reminder
    const newReminder: Reminder = {
      id: Date.now(),
      title: 'New Reminder',
      date: Date.now(),
      audioUri: uri,

    }

    setReminders(currentReminders => [...currentReminders, newReminder]);

  };

  const handlePress = async () => {
    if (isRecording){
      const uri = await stopRecording();
      if (uri) handleAddReminder(uri);
    }
    else{
      await startRecording();
    }
  }

  const handlePlayback = (uri: string | null | undefined) => {
    if (!uri){
      console.log("no uri found for playback");
      return;
    }

    if(activeUri === uri){
      if (playing){
        pause();
      }
      else {
        play();
      }
    }

    else {
      pause();
      setActiveUri(uri);
      play();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Voice Reminders</Text>
      </View>

      <View style={styles.newReminderContainer}>
        <TouchableOpacity 
          style={styles.recordButton}
          onPress={handlePress}
        >
          <Text style= {styles.recordButtonText}>
            {isRecording ? 'Stop Recording' : 'Click to Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.reminderList}
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <View>
              <Text style={styles.reminderTitle}>{item.title}</Text>
              <Text style={styles.reminderDate}>{formatDateTime(new Date (item.date))}</Text>
            </View>
            <TouchableOpacity style={styles.playButton} onPress={() => handlePlayback(item.audioUri)}>
              <Text style={styles.playIcon}>{playing ? '⏸' : '▶'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

