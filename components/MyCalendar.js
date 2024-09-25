import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from "../styles/globalStyles";

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [tasks, setTasks] = useState({
        '2024-09-25': [{ id: 1, task: 'Go to the gym' }, { id: 2, task: 'Buy groceries' }],
        '2024-09-26': [{ id: 3, task: 'Doctor appointment' }],
    });

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={{
                    ...Object.keys(tasks).reduce((acc, date) => {
                        acc[date] = { marked: true };
                        return acc;
                    }, {}),
                    [selectedDate]: { selected: true, marked: true, selectedColor: colors.primary },
                }}
                onDayPress={handleDayPress}
            />
            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>Tasks for {selectedDate}:</Text>
                {tasks[selectedDate] ? (
                    <FlatList
                        data={tasks[selectedDate]}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.taskItem}>{item.task}</Text>}
                    />
                ) : (
                    <Text style={styles.noTasks}>No tasks for this day</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    taskContainer: {
        marginTop: 20,
        padding: 10,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskItem: {
        fontSize: 16,
        paddingVertical: 5,
    },
    noTasks: {
        fontSize: 16,
        color: 'gray',
    },
});

export default MyCalendar;
