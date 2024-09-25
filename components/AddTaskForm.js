import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addTask } from "../db/tasks";
import { globalStyles } from "../styles/globalStyles";
import InputComponent from "./Input";
import ButtonComponent from "./Button";

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
            <InputComponent
                label="Name"
                placeholder="Add task name..."
                value={title}
                onChangeText={setTitle}
            />
            <InputComponent
                label="Description"
                placeholder="Add task description..."
                value={description}
                onChangeText={setDescription}
            />
            <InputComponent
                label="Date"
                placeholder="Add task date..."
                value={date}
                onChangeText={setDate}
            />
            <ButtonComponent
                title="Create Task"
                onPressFn={handleAddTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    fullWidthInput: {
        width: '100%',
        marginBottom: 15,
    },
});

export default AddTaskForm;
