import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/style';
import {useRecorder} from './utils/record';
import {usePlayback} from './utils/playhelper';
import { formatDateTime } from './utils/datehelper';

type Reminder = {
  id: number;
  title: string;
  date: string;
};

export default function Index() {
  const reminders: Reminder[] = [
    { id: 1, title: 'Interview', date: '23 May, 2024 02:00PM' },
    { id: 2, title: 'Birthday', date: '13 April, 2024 12:00AM' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Voice Reminders</Text>
      </View>

      <View style={styles.newReminderContainer}>
        <TouchableOpacity style={styles.recordButton}>
          <Text style={styles.recordButtonText}>Click to Start Recording</Text>
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
              <Text style={styles.playIcon}>{playing ? '| |' : '▶'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

