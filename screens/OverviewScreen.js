import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import {deleteTask, editTask, getTasks} from '../db/tasks';

const OverviewScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const result = await getTasks();
            setTasks(result);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id)
        .then(() => fetchTasks());
    }

    useEffect(() => {
        navigation.addListener('focus', fetchTasks);
    }, [navigation]);

    const renderTask = ({ item }) => (
        <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.date}</Text>
            <Button title="Eliminar" onPress={() => handleDeleteTask(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Welcome to the Overview Screen</Text>
            <Button title="Actualizar22" onPress={fetchTasks} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    taskTitle: {
        fontWeight: 'bold',
    },
});

export default OverviewScreen;
