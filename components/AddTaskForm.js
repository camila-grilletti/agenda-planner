import { useState, useContext } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from "../db/tasks";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import InputDate from "./InputDate";
import { TasksContext } from '../context/TasksContext';

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { fetchTasks } = useContext(TasksContext);

    const handleAddTask = async () => {
        if (title && date) {
            try {
                await addTask(title, description, date.toISOString().split('T')[0]);
                Alert.alert('Success', 'Task added successfully');
                setTitle('');
                setDescription('');
                fetchTasks();
            } catch (error) {
                Alert.alert('Error', 'There was a problem adding the task');
            }
        } else {
            Alert.alert('Error', 'All fields are required');
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
});

export default AddTaskForm;
