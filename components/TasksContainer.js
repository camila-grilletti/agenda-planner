import { FlatList, StyleSheet, View } from 'react-native';
import TaskItem from './TaskItem';
import MyText from "./MyText";
import {colors} from "../styles/globalStyles";
import SubHeader from "./SubHeader";

const TaskContainer = ({ tasks, onDeleteTask }) => {
    return (
        <View style={styles.container}>
            <View style={styles.tasksInfoContainer}>
                <SubHeader title="To-dos" />
                {tasks.length > 0 && (<MyText style={styles.tasksCount}>{tasks.length} task{tasks.length > 1 && "s"}</MyText>)}
            </View>
            <FlatList
                style={styles.container}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TaskItem task={item} onDelete={onDeleteTask} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    tasksInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    tasksCount: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginLeft: 10,
        color: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 0,
        textAlign: 'center',
        fontSize: 11,
    }
});

export default TaskContainer;
