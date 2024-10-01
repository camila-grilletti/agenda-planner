import { useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import TaskContainer from "../components/TasksContainer";
import Header from "../components/Header";
import MyText from "../components/MyText";
import formatDate from "../formats/formats";
import { colors, globalStyles } from "../styles/globalStyles";
import noTasksImg from '../assets/no-tasks.webp';
import {TasksContext} from "../context/TasksContext";

const TodayScreen = ({ navigation }) => {
    const { tasks, loading, handleDeleteTask } = useContext(TasksContext);
    const today = new Date().toLocaleDateString('en-CA');
    const formattedDate = formatDate(new Date());

    const tasksToday = tasks[today] || [];

    return (
        <View style={globalStyles.container}>
            <Header title="Today" />
            <MyText style={styles.dateText}>{formattedDate}</MyText>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                tasksToday.length > 0 ? (
                    <TaskContainer tasks={tasksToday} onDeleteTask={handleDeleteTask} />
                ) : (
                    <View style={styles.imageContainer}>
                        <Image
                            source={noTasksImg}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <MyText style={styles.textNoTask}>Enjoy your day! ❤️</MyText>
                    </View>
                )
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
        marginTop: 5,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        alignSelf: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TodayScreen;
