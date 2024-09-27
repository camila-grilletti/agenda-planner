import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from "../styles/globalStyles";
import { CheckBox } from '@rneui/themed';
import MyText from './MyText';

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
                <MyText style={styles.taskTextTitle}>{task.task}</MyText>
                {task.description && (
                    <MyText style={styles.taskTextDescription}>{task.description}</MyText>
                )}
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
        marginBottom: 10,
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
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
        color: colors.whiteTransparent,
    },
});

export default TaskItem;
