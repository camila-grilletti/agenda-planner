import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTasks, deleteTask } from "../db/tasks";
import { useFocusEffect } from '@react-navigation/native';
import TaskContainer from "../components/TasksContainer";

const TodayScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const fetchTasks = async () => {
        try {
            const result = await getTasks();
            const tasksToday = result.filter(task => task.date === today).map(task => ({
                id: task.id,
                task: task.title,
                description: task.description,
                date: task.date
            }));

            setTasks(tasksToday);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.taskTitle}>Tasks for Today:</Text>
            {tasks.length > 0 ? (
                <TaskContainer tasks={tasks} onDeleteTask={handleDeleteTask} />
            ) : (
                <Text style={styles.noTasks}>No tasks for today</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noTasks: {
        fontSize: 16,
        color: 'gray',
    },
});

export default TodayScreen;
