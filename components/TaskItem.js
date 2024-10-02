import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import { CheckBox } from '@rneui/themed';
import MyText from './MyText';
import { getTextColorForBackground } from '../utils/utils';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const TaskItem = ({ task, onDelete }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };

    const textColor = task.tagColor ? getTextColorForBackground(task.tagColor) : null;

    const renderLeftActions = (progress, dragX) => {
        if (dragX.__getValue() > 100) {
            onDelete(task.id);
        }

        return (
            <RectButton style={styles.hiddenAction} />
        );
    };

    return (
        <Swipeable
            renderLeftActions={renderLeftActions}
            leftThreshold={100}
        >
            <View style={[styles.itemContainer, { backgroundColor: task.color || colors.primary }]}>
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
                    <MyText style={[styles.taskTextTitle, { color: colors.white }]}>{task.task}</MyText>
                    {task.tagName && (
                        <View style={[globalStyles.taskTag, { backgroundColor: task.tagColor }]}>
                            <MyText style={[{ color: textColor, fontSize: 10 }]}>{task.tagName}</MyText>
                        </View>
                    )}
                    {task.description && (
                        <MyText style={styles.taskTextDescription}>{task.description}</MyText>
                    )}
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
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
        flex: 1,
        flexDirection: 'column',
    },
    taskTextTitle: {
        fontSize: 16,
        color: colors.white,
        marginTop: 2,
    },
    taskTextDescription: {
        fontSize: 13,
        color: colors.whiteTransparent,
        marginBottom: 5,
    },
    hiddenAction: {
        backgroundColor: 'transparent',
        width: 1,
    },
});

export default TaskItem;
