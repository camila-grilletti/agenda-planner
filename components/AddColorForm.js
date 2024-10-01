import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { addColor } from "../db/tasks";
import ColorPicker from 'react-native-wheel-color-picker';

const AddColorForm = () => {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');

    const handleAddColor = async () => {
        if (selectedColor.trim()) {
            try {
                await addColor(selectedColor);
                Alert.alert('Success', 'Color added successfully');
                setSelectedColor('#FFFFFF');
            } catch (error) {
                Alert.alert('Error', 'There was a problem adding the color');
            }
        } else {
            Alert.alert('Error', 'Please select a color');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.colorText, { color: selectedColor }]}>
                Selected Color: {selectedColor}
            </Text>

            <ColorPicker
                color={selectedColor}
                onColorChange={(color) => setSelectedColor(color)}
                thumbSize={30}
                sliderSize={40}
                noSnap={true}
                row={false}
                swatches={false}
                style={styles.colorPicker}
            />

            <View style={styles.buttonContainer}>
                <Button title="Add Color" onPress={handleAddColor} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    colorText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    colorPicker: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    buttonContainer: {
        marginTop: 20,
        width: '80%',
    },
});

export default AddColorForm;
