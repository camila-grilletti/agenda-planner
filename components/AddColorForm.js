import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {addColor} from "../db/tasks";

const AddColorForm = () => {
    const [colorName, setColorName] = useState('');

    const handleAddColor = async () => {
        if (colorName.trim()) {
            try {
                await addColor(colorName);
                Alert.alert('Success', 'Color added successfully');
                setColorName('');
            } catch (error) {
                Alert.alert('Error', 'There was a problem adding the color');
            }
        } else {
            Alert.alert('Error', 'Please enter a color name');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter color name..."
                value={colorName}
                onChangeText={setColorName}
            />
            <Button title="Add Color" onPress={handleAddColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default AddColorForm;
