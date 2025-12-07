import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { remindersStore } from "../store/reminderStore";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditReminder() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const reminder = remindersStore.getReminder(Number(id));

  const [title, setTitle] = useState(reminder?.title || "");
  const [date, setDate] = useState(reminder?.date ? new Date(reminder.date) : new Date());

  const [showPicker, setShowPicker] = useState(false);

  const saveReminder = () => {
    remindersStore.updateReminder(Number(id), {
      title,
      date:date.getTime(),
    });
    router.back(); // go back after saving
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Reminder</Text>

      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 15 }}
      />

      <Text>Date (timestamp)</Text>
      <TouchableOpacity 
        onPress={() => setShowPicker(true)} 
        style={{ borderWidth: 1, padding: 8, marginBottom: 15 }}
      >
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date} 
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Button title="Save" onPress={saveReminder} />
    </View>
  );
}
