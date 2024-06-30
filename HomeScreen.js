// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    fetchTasks();
  }, []);

  const toggleCompletion = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  const renderTask = ({ item }) => (
    <Card style={styles.task}>
      <Card.Title title={item.title} />
      <Card.Content>
        <Text style={item.completed ? styles.completed : styles.incomplete}>{item.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => toggleCompletion(item.id)}>{item.completed ? "Undo" : "Complete"}</Button>
        <Button onPress={() => deleteTask(item.id)}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
      />
      <Button mode="contained" onPress={() => navigation.navigate('Task')}>Add Task</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  task: {
    marginVertical: 8,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  incomplete: {
    color: 'black',
  },
});

export default HomeScreen;
