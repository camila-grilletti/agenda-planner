import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CheckBox } from '@rneui/themed';
import MyText from './MyText';
import { getTextColorForBackground } from '../utils/utils';
import {colors, createGlobalStyles} from "../styles/globalStyles";

const TaskItem = ({ task, onDelete }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);
    const [isChecked, setIsChecked] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
        onDelete(task.id);
    };

    const textColor = task.tagColor ? getTextColorForBackground(task.tagColor) : theme.black;

    const handleSwipeComplete = () => {
        Animated.timing(translateX, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onDelete(task.id);
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderMove: (_, gestureState) => {
                translateX.setValue(Math.max(gestureState.dx, -100));
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -100) {
                    handleSwipeComplete();
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.animatedContainer, { transform: [{ translateX }] }]}
        >
            <View style={[styles.itemContainer, { backgroundColor: task.color || theme.primary }]}>
                <CheckBox
                    checked={isChecked}
                    onPress={handleCheckboxPress}
                    uncheckedColor="white"
                    checkedColor="white"
                    checkedIcon="check-circle"
                    uncheckedIcon="circle-o"
                    containerStyle={styles.checkboxContainer}
                />
                <View style={styles.taskTextContainer}>
                    <MyText style={[styles.taskTextTitle, { color: "white" }]}>{task.task}</MyText>
                    {task.tagName && (
                        <View style={[globalStyles.taskTag, { backgroundColor: task.tagColor }]}>
                            <MyText style={[{ color: textColor, fontSize: 10 }]}>{task.tagName}</MyText>
                        </View>
                    )}
                    {task.description && (
                        <MyText style={[styles.taskTextDescription, { color: colors.whiteTransparent }]}>
                            {task.description}
                        </MyText>
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedContainer: {
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: 15,
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
        marginTop: 2,
    },
    taskTextDescription: {
        fontSize: 13,
        marginBottom: 5,
    },
});

export default TaskItem;
