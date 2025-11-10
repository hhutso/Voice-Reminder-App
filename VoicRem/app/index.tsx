import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/style';

type Reminder = {
  id: number;
  title: string;
  date: number;
};

const reminderCreator = () => {
  const [items, setItems] = useState([]); // state to hold the list of items
  const[itemCount, setItemCount] = useState(0); // unique keys to items 
}

export default function Index() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {id: 1, title: 'Test1', date: 2025},
  ]);

  const handleAddReminder = () => {
    // add a new reminder
    // TODO: add recording feature
    const newReminder: Reminder = {
      id: Date.now(),
      title: 'New Reminder',
      date: Date.now(),
    }

    setReminders(currentReminders => [...currentReminders, newReminder]);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Voice Reminders</Text>
      </View>

      <View style={styles.newReminderContainer}>
        <TouchableOpacity style={styles.recordButton} onPress={handleAddReminder}>
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
              <Text style={styles.reminderDate}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

