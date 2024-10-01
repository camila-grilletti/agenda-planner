import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from "../styles/globalStyles";
import { CheckBox } from '@rneui/themed';
import MyText from './MyText';

const getTextColorForBackground = (backgroundColor) => {
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? 'black' : 'white';
};

const TaskItem = ({ task, onDelete }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
        if (!isChecked) onDelete(task.id);
    };

    const textColor = task.tagColor ? getTextColorForBackground(task.tagColor) : null;
    const itemColor = task.color ? getTextColorForBackground(task.color) : colors.white;

    return (
        <View style={[styles.itemContainer, {backgroundColor: task.color || colors.primary}]}>
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
                <MyText style={[styles.taskTextTitle, {color: itemColor}]}>{task.task}</MyText>
                {task.tagName && (
                    <View style={[styles.taskTag, { backgroundColor: task.tagColor }]}>
                        <MyText style={[{ color: textColor, fontSize: 10 }]}>{task.tagName}</MyText>
                    </View>
                )}
                {task.description && (
                    <MyText style={[styles.taskTextDescription, {color: itemColor}]}>{task.description}</MyText>
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
    taskTag: {
        paddingVertical: 1,
        paddingHorizontal: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 5
    },
});

export default TaskItem;
