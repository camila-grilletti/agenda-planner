import { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';
import TaskContainer from "./TasksContainer";
import MyText from './MyText';
import { TasksContext } from "../context/TasksContext";

const MyCalendar = () => {
    const { theme } = useTheme();
    const { tasks, loading, handleDeleteTask } = useContext(TasksContext);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const getTaskColor = (taskCount) => {
        if (taskCount === 1) return theme.greenState;
        if (taskCount > 1 && taskCount <= 3) return theme.yellowState;
        return theme.redState;
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={theme.primary} />
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
                                            color: theme.white,
                                        },
                                    },
                                };
                                return acc;
                            }, {}),
                            [selectedDate]: {
                                selected: true,
                                customStyles: {
                                    container: {
                                        backgroundColor: theme.primary,
                                        borderRadius: 20,
                                    },
                                    text: {
                                        color: theme.white,
                                    },
                                },
                            },
                        }}
                        markingType={'custom'}
                        onDayPress={handleDayPress}
                        theme={{
                            arrowColor: theme.primary,
                            monthTextColor: theme.primary,
                            textSectionTitleColor: theme.primary,
                            textMonthFontFamily: 'Poppins-Medium',
                            textDayFontFamily: 'Poppins',
                            textDayHeaderFontFamily: 'Poppins',
                            calendarBackground: 'transparent',
                        }}
                    />
                    <View style={styles.taskContainer}>
                        {tasks[selectedDate] ? (
                            <TaskContainer tasks={tasks[selectedDate]} onDeleteTask={handleDeleteTask} />
                        ) : (
                            <View style={styles.noTaskContainer}>
                                <MyText style={[styles.noTasks, { color: theme.text }]}>
                                    No tasks for this day 👀
                                </MyText>
                            </View>
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
    },
    taskContainer: {
        flex: 1,
        padding: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTasks: {
        fontSize: 16,
    },
    noTaskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyCalendar;
