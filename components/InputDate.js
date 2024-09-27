import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from './MyText';

const InputDate = ({ label, value, onPressFn }) => {
    return (
        <View style={styles.inputContainer}>
            {label && <MyText style={globalStyles.inputLabel}>{label}</MyText>}
            <View style={[globalStyles.input, styles.row]}>
                <MyText style={styles.fullWidthInput}>
                    {value}
                </MyText>
                <TouchableOpacity onPress={onPressFn} style={styles.iconButton}>
                    <Ionicons name="calendar-outline" size={17} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.white,
        paddingVertical: 10,
    },
    fullWidthInput: {
        flex: 1,
    },
    iconButton: {
        paddingLeft: 10,
    },
});

export default InputDate;
