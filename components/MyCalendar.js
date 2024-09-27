import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from "../styles/globalStyles";
import { getTasks, deleteTask } from "../db/tasks";
import { useFocusEffect } from '@react-navigation/native';
import TaskContainer from "./TasksContainer";
import MyText from './MyText';

const MyCalendar = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [tasks, setTasks] = useState({});

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const fetchTasks = async () => {
        try {
            const result = await getTasks();
            const tasksByDate = result.reduce((acc, task) => {
                const { date, id, title, description } = task;
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push({ id, task: title, description: description });
                return acc;
            }, {});

            setTasks(tasksByDate);
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
                {tasks[selectedDate] ? (
                    <TaskContainer tasks={tasks[selectedDate]} onDeleteTask={handleDeleteTask} />
                ) : (
                    <MyText style={styles.noTasks}>No tasks for this day</MyText>
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
        flex: 1,
        padding: 10,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noTasks: {
        fontSize: 16,
        color: 'gray',
    },
});

export default MyCalendar;
