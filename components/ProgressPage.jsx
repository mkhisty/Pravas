import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProgressPage() {
  const [todayProgress, setTodayProgress] = React.useState([]);

  React.useEffect(() => {
    loadTodayProgress();
  }, []);

  const loadTodayProgress = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const progressKey = `progress_${today}`;
      const storedProgress = await AsyncStorage.getItem(progressKey);
      if (storedProgress) {
        setTodayProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Error loading today\'s progress:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Today's Progress</Text>
      {todayProgress.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item.taskName}: {item.fieldName}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
