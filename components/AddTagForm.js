import {useState, useCallback} from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {addTag, getColors} from "../db/tasks";
import {Picker} from "@react-native-picker/picker";
import {useFocusEffect} from "@react-navigation/native";

const AddTagForm = () => {
    const [tagName, setTagName] = useState('');
    const [colorId, setColorId] = useState(null);
    const [colors, setColors] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const colorsData = await getColors();
                    setColors(colorsData);
                } catch (error) {
                    console.error('Error fetching colors:', error);
                }
            };

            fetchData();
        }, [])
    );

    const handleAddTag = async () => {
        if (tagName.trim() && colorId) {
            try {
                await addTag(tagName, colorId);
                Alert.alert('Success', 'Tag added successfully');
                setTagName('');
                setColorId(null);
            } catch (error) {
                Alert.alert('Error', 'There was a problem adding the tag');
            }
        } else {
            Alert.alert('Error', 'Please enter a tag name and select a color');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter tag name..."
                value={tagName}
                onChangeText={setTagName}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={colorId}
                    onValueChange={(itemValue) => setColorId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a color..." value={null} />
                    {colors.map(color => (
                        <Picker.Item key={color.id} label={color.name} value={color.id} />
                    ))}
                </Picker>
            </View>
            <Button title="Add Tag" onPress={handleAddTag} />
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
    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default AddTagForm;
