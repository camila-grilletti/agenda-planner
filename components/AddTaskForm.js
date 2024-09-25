import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from "../db/tasks";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import InputDate from "./InputDate";

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddTask = () => {
        if (title && description && date) {
            addTask(title, description, date.toISOString().split('T')[0]);
            Alert.alert('Éxito', 'Tarea añadida exitosamente');
            setTitle('');
            setDescription('');
        } else {
            Alert.alert('Error', 'Todos los campos son obligatorios');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
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
            <InputDate
                label="Date"
                value={date.toISOString().split('T')[0]}
                onPressFn={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
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
    dateText: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default AddTaskForm;
