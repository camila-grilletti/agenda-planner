import { useState, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getTasks, deleteTask } from "../db/tasks";
import { useFocusEffect } from '@react-navigation/native';
import TaskContainer from "../components/TasksContainer";
import Header from "../components/Header";
import MyText from "../components/MyText";
import formatDate from "../formats/formats";
import {colors, globalStyles} from "../styles/globalStyles";
import noTasksImg from '../assets/no-tasks.webp';

const TodayScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const formattedDate = formatDate(new Date());

    const fetchTasks = async () => {
        try {
            const result = await getTasks();
            const tasksToday = result.filter(task => task.date === today).map(task => ({
                id: task.id,
                task: task.title,
                description: task.description,
                date: task.date
            }));

            setTasks(tasksToday);
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
        <View style={globalStyles.container}>
            <Header title="Today" />
            <MyText style={styles.dateText}>{formattedDate}</MyText>
            {tasks.length > 0 ? (
                <TaskContainer tasks={tasks} onDeleteTask={handleDeleteTask} />
            ) : (
                <View style={styles.imageContainer}>
                    <Image
                        source={noTasksImg}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <MyText style={styles.textNoTask}>Enjoy your day! ❤️</MyText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noTasks: {
        fontSize: 16,
        color: 'gray',
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: colors.blackTransparent,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNoTask: {
        fontSize: 14,
        marginTop: 5
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        alignSelf: 'center',
    },
});

export default TodayScreen;
