import { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from "../styles/globalStyles";
import TaskContainer from "./TasksContainer";
import MyText from './MyText';
import { TasksContext } from "../context/TasksContext";

const MyCalendar = () => {
    const { tasks, loading, handleDeleteTask } = useContext(TasksContext);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

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
                            textDayHeaderFontFamily: 'Poppins',
                            calendarBackground: 'transparent',
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
        color: 'gray',
    },
});

export default MyCalendar;
