import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {addTask} from "../db/tasks";

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleAddTask = () => {
        if (title && description && date) {
            addTask(title, description, date);
            Alert.alert('Éxito', 'Tarea añadida exitosamente');
            setTitle('');
            setDescription('');
            setDate('');
        } else {
            Alert.alert('Error', 'Todos los campos son obligatorios');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
            />
            <Button title="Agregar Tarea" onPress={handleAddTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default AddTaskForm;
