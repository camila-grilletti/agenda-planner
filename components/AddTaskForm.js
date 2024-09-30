import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addTask, getColors, getTags} from "../db/tasks";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import InputDate from "./InputDate";
import { TasksContext } from '../context/TasksContext';
import {Picker} from '@react-native-picker/picker';

const fetchTags = async () => {
    return await getTags();
};

const fetchColors = async () => {
    return await getColors();
};

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tagId, setTagId] = useState(null);
    const [colorId, setColorId] = useState(null);
    const [time, setTime] = useState(new Date());
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);

    const { fetchTasks } = useContext(TasksContext);

    // Fetch tags and colors on mount
    useEffect(() => {
        const loadData = async () => {
            const tagsData = await fetchTags();
            const colorsData = await fetchColors();
            setTags(tagsData);
            setColors(colorsData);
        };

        loadData();
    }, []);

    const handleAddTask = async () => {
        if (title && date) {
            try {
                await addTask(
                    title,
                    description,
                    date.toISOString().split('T')[0],
                    tagId,
                    colorId,
                    time.toISOString().split('T')[1].slice(0, 5) // Format time as HH:mm
                );
                Alert.alert('Success', 'Task added successfully');
                setTitle('');
                setDescription('');
                setTagId(null);
                setColorId(null);
                setTime(new Date());
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

    const handleTimeChange = (event, selectedTime) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setTime(selectedTime);
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

            {/* Tag Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={tagId}
                    onValueChange={(itemValue) => setTagId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a tag..." value={null} />
                    {tags.map(tag => (
                        <Picker.Item key={tag.id} label={tag.name} value={tag.id} />
                    ))}
                </Picker>
            </View>

            {/* Color Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={colorId}
                    onValueChange={(itemValue) => setColorId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a color..." value={null} />
                    {colors.map(color => (
                        <Picker.Item key={color.id} label={color.name} value={color.id} />
                    ))}
                </Picker>
            </View>

            {/* Time Picker */}
            <InputDate
                label="Time"
                value={time.toISOString().split('T')[1].slice(0, 5)} // Format as HH:mm
                onPressFn={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
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
    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default AddTaskForm;
