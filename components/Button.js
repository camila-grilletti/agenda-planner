import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ButtonComponent = ({ title, onPressFn }) => {
    return (
        <TouchableOpacity style={globalStyles.button} onPress={onPressFn}>
            <Text style={globalStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComponent;
