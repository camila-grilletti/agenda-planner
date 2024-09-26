import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

const TaskContainer = ({ tasks, onDeleteTask }) => {
    return (
        <FlatList
            style={styles.container}
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TaskItem task={item} onDelete={onDeleteTask} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
});

export default TaskContainer;
