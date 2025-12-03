import React from 'react';
import { FlatList, Text, TouchableOpacity, View, } from 'react-native';
import { styles } from '../../styles/lightMode';


export default function EditReminder({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.titleEditButton}>
            <Text style={styles.titleEditButtonText}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}