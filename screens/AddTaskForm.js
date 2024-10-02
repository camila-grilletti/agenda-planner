import { useState, useContext } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from "../db/tasks";
import InputComponent from "../components/Input";
import InputDate from "../components/InputDate";
import { TasksContext } from '../context/TasksContext';
import { Picker } from '@react-native-picker/picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, globalStyles } from "../styles/globalStyles";
import { useNavigation } from '@react-navigation/native';
import ColorSelect from "../components/ColorSelect";
import SmallHeader from "../components/SmallHeader";
import MyText from "../components/MyText";
import { TagsContext } from "../context/TagsContext";
import Toast from 'react-native-toast-message';

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tagId, setTagId] = useState(null);
    const [colorId, setColorId] = useState(null);
    const [time, setTime] = useState(new Date());

    const { fetchTasks } = useContext(TasksContext);
    const { allTags } = useContext(TagsContext);

    const navigation = useNavigation();

    const handleAddTask = async () => {
        if (title && date) {
            try {
                const formattedDate = date.toLocaleDateString('en-CA');

                await addTask(
                    title,
                    description,
                    formattedDate,
                    tagId,
                    colorId,
                    time.toISOString().split('T')[1].slice(0, 5)
                );
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Task added successfully',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
                setTitle('');
                setDescription('');
                setTagId(null);
                setColorId(null);
                setTime(new Date());
                fetchTasks();
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'There was a problem adding the task',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'All fields are required',
                position: 'bottom',
                text1Style: { fontSize: 16 },
                text2Style: { fontSize: 13 },
            });
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
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
                <View style={styles.containerSmallHeader}>
                    <SmallHeader title="Create Task" />
                    <TouchableOpacity style={[globalStyles.link, { position: 'absolute', right: 0 }]} onPress={handleAddTask}>
                        <MyText style={globalStyles.linkText}>Done</MyText>
                    </TouchableOpacity>
                </View>

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
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textArea}
                />
                <InputDate
                    label="Date"
                    value={date.toLocaleDateString('en-CA')}
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
                            {allTags.map(tag => (
                                <Picker.Item key={tag.id} label={tag.name} value={tag.id} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Tag')}>
                        <Ionicons name="add-outline" style={styles.pickerIcon} size={20} />
                    </TouchableOpacity>
                </View>

                {/* Time Picker */}
                <InputDate
                    label="Time"
                    value={time.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    onPressFn={() => setShowTimePicker(true)}
                />
                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}

                <ColorSelect onChangeInput={setColorId} />
            </ScrollView>

            <Toast />
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
        marginBottom: 10
    },
    pickerContainer: {
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: colors.white,
        borderColor: colors.white,
    },
    pickerIcon : {
        color: colors.primary,
        marginLeft: 10,
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        paddingVertical: 10
    }
});

export default AddTaskForm;
