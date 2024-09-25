import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const InputComponent = ({ label, placeholder, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            {label && <Text style={globalStyles.inputLabel}>{label}</Text>}
            <TextInput
                style={[
                    globalStyles.input,
                    styles.fullWidthInput
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 5,
    },
    fullWidthInput: {
        width: '100%',
    },
});

export default InputComponent;
