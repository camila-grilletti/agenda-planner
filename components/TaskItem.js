import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from "../styles/globalStyles";
import { CheckBox } from '@rneui/themed';

const TaskItem = ({ task, onDelete }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
        if (!isChecked) onDelete(task.id);
    };

    return (
        <View style={styles.itemContainer}>
            <CheckBox
                checked={isChecked}
                onPress={handleCheckboxPress}
                uncheckedColor={colors.white}
                checkedColor={colors.white}
                checkedIcon="check-circle"
                uncheckedIcon="circle-o"
                containerStyle={styles.checkboxContainer}
            />
            <View style={styles.taskTextContainer}>
                <Text style={styles.taskTextTitle}>{task.task}</Text>
                {task.description && <Text style={styles.taskTextDescription}>{task.description}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.primary,
        borderRadius: 15,
        marginBottom: 10, // Espacio entre items
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderWidth: 0, // Quitar borde del checkbox
    },
    taskTextContainer: {
        flexDirection: 'column',
    },
    taskTextTitle: {
        fontSize: 16,
        color: colors.white,
    },
    taskTextDescription: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",

    },
});

export default TaskItem;
