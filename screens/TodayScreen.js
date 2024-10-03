import { useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import TaskContainer from "../components/TasksContainer";
import Header from "../components/Header";
import MyText from "../components/MyText";
import formatDate from "../formats/formats";
import { createGlobalStyles } from "../styles/globalStyles";
import noTasksImg from '../assets/no-tasks.webp';
import { TasksContext } from "../context/TasksContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";

const TodayScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { tasks, loading, handleDeleteTask } = useContext(TasksContext);
    const globalStyles = createGlobalStyles(theme);
    const today = new Date().toLocaleDateString('en-CA');
    const formattedDate = formatDate(new Date());

    const tasksToday = tasks[today] || [];

    return (
        <View style={globalStyles.container}>
            <View style={styles.headerContainer}>
                <Header title="Today" />
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color={theme.blackTransparent} />
                </TouchableOpacity>
            </View>
            <MyText style={[styles.dateText, { color: theme.blackTransparent }]}>{formattedDate}</MyText>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={theme.primary} />
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
                        <MyText style={[styles.textNoTask, { color: theme.black }]}>Enjoy your day! ❤️</MyText>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    dateText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
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
