import { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask, getColors, getTags } from "../db/tasks";
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import InputDate from "./InputDate";
import { TasksContext } from '../context/TasksContext';
import { Picker } from '@react-native-picker/picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation();

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
                    time.toISOString().split('T')[1].slice(0, 5)
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                <View style={styles.pickerContainerMain}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={tagId}
                            onValueChange={(itemValue) => setTagId(itemValue)}
                            style={styles.picker}
                            dropdownIconColor={colors.primary}
                        >
                            <Picker.Item label="Select a tag..." value={null} />
                            {tags.map(tag => (
                                <Picker.Item key={tag.id} label={tag.name} value={tag.id} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Tag')}>
                        <Ionicons name="add-outline" style={styles.pickerIcon} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Color Picker */}
                <View style={styles.pickerContainerMain}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={colorId}
                            onValueChange={(itemValue) => setColorId(itemValue)}
                            style={styles.picker}
                            dropdownIconColor={colors.primary}
                        >
                            <Picker.Item label="Select a color..." value={null} />
                            {colors.map(color => (
                                <Picker.Item key={color.id} label={color.name} value={color.id} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Color')}>
                        <Ionicons name="add-outline" style={styles.pickerIcon} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Time Picker */}
                <InputDate
                    label="Time"
                    value={time.toISOString().split('T')[1].slice(0, 5)}
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
    },
    pickerContainerMain: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20,
    },
    pickerContainer: {
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerIcon : {
        color: colors.primary,
        marginLeft: 10,
    },
});

export default AddTaskForm;
