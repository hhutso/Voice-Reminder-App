import React, {useState, useEffect} from 'react';
import { FlatList, Text, TouchableOpacity, View, TextInput, Switch, } from 'react-native';
import { GestureHandlerRootView, RectButton, Swipeable} from 'react-native-gesture-handler';
import { styles as lightMode} from '../styles/lightMode';
import { styles as darkMode} from '../styles/darkMode';
import {useRecorder} from './utils/record';
import {usePlayback} from './utils/playhelper';
import { formatDateTime } from './utils/datehelper';
import { Link } from 'expo-router';

import { observer } from "mobx-react-lite";
import { remindersStore } from "./store/reminderStore";



//hi
type Reminder = {
  id: number;
  title: string;
  date: number;
  audioUri: string | null;
};

//  TODO:  close the observer parenthesis somewhere down here
export default observer(function Index() {
  const { isRecording, recordingUri, startRecording, stopRecording} = useRecorder();
  const [activeUri, setActiveUri] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([
    {id: 1, title: 'Test1', date: 2025, audioUri: null},
  ]);
  const {play, pause, playing, isLoaded} = usePlayback(activeUri);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const styles = isDarkMode ? darkMode : lightMode;

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

  const handlePlayback = (uri: string | null) => {
    if (!uri){
      console.log("no uri found for playback");
      return;
    }

    console.log("playback pressed for uri:", uri);

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
      //play();
    }
  }

  // edit the title 
  const[editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  // DELETE REMINDER FUNCTIONALITY
  const handleDeleteSwipeReminder = (id: number) => {
    setReminders(currentReminders => currentReminders.filter(reminder => reminder.id !== id));
  };
  const renderRightActions = (id: number) => {
    return (
      <RectButton style={styles.deleteButton} onPress={() => handleDeleteSwipeReminder(id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
    );
  };

  // EDIT REMINDER FUNCTIONALITY
  const handleEditSwipeReminder = (id: number) => {
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return;
    setEditingId(id);
    setEditingTitle(reminder.title);
  };
  const renderLeftActions = (item: Reminder) => {
    return (
      <Link
        href={{
          pathname: "/components/editReminder",
          params: { id: item.id.toString() }, // must be string for Expo Router
        }}
        asChild
      >
        <RectButton style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </RectButton>
      </Link>
    );
  };

  const saveEditedReminder = () => {
    setReminders(prev =>
      prev.map(r =>
        r.id === editingId ? { ...r, title: editingTitle} : r
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={{ position: 'absolute', marginTop: 25, top: 10, right: 12, zIndex: 10}}>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(previousState => !previousState)}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#555' }}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voice Reminders</Text>
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
          <Swipeable 
            renderRightActions={() => renderRightActions(item.id)}
            renderLeftActions={() => renderLeftActions(item)}
          >
            <View style={styles.reminderCard}>
              <View>
                {/* <Text style={styles.reminderTitle}>{item.title}</Text> */}
                {editingId === item.id ? (
                  <TextInput
                    style={styles.reminderTitleInput}
                    value={editingTitle}
                    onChangeText={setEditingTitle}  
                    autoFocus={true}           //  pops open keyboard immediately
                    onSubmitEditing={saveEditedReminder} // press enter to save
                    returnKeyType="done"
                  />
                ) : (
                  <Text style={styles.reminderTitle}>{item.title}</Text>
                )}
                <Text style={styles.reminderDate}>{formatDateTime(new Date (item.date))}</Text>
              </View>
              <TouchableOpacity style={styles.playButton} onPress={() => handlePlayback(item.audioUri)}>
                <Text style={styles.playIcon}>{activeUri === item.audioUri && playing ? '| |' : '▶'}</Text>
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
      />
    </View>
    </GestureHandlerRootView>
  );
});
