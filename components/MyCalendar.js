import { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
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
    const [loading, setLoading] = useState(true);

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const fetchTasks = async () => {
        try {
            setLoading(true); // Start loading
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
        } finally {
            setLoading(false);
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

    const getTaskColor = (taskCount) => {
        if (taskCount === 1) return colors.greenState;
        if (taskCount > 1 && taskCount <= 3) return colors.yellowState;
        return colors.redState;
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    <Calendar
                        markedDates={{
                            ...Object.keys(tasks).reduce((acc, date) => {
                                const taskCount = tasks[date].length;
                                acc[date] = {
                                    customStyles: {
                                        container: {
                                            backgroundColor: getTaskColor(taskCount),
                                            borderRadius: 8,
                                        },
                                        text: {
                                            color: colors.white,
                                        },
                                    },
                                };
                                return acc;
                            }, {}),
                            [selectedDate]: {
                                selected: true,
                                customStyles: {
                                    container: {
                                        backgroundColor: colors.primary,
                                        borderRadius: 20,
                                    },
                                    text: {
                                        color: colors.white,
                                    },
                                },
                            },
                        }}
                        markingType={'custom'}
                        onDayPress={handleDayPress}
                        theme={{
                            arrowColor: colors.primary,
                            monthTextColor: colors.primary,
                            textSectionTitleColor: colors.primary,
                            textMonthFontFamily: 'Poppins-Medium',
                            textDayFontFamily: 'Poppins',
                            textDayHeaderFontFamily: 'Poppins'
                        }}
                    />
                    <View style={styles.taskContainer}>
                        {tasks[selectedDate] ? (
                            <TaskContainer tasks={tasks[selectedDate]} onDeleteTask={handleDeleteTask} />
                        ) : (
                            <MyText style={styles.noTasks}>No tasks for this day</MyText>
                        )}
                    </View>
                </>
            )}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyCalendar;
