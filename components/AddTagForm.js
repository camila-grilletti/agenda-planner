import { useState, useCallback } from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { addTag, getColors } from "../db/tasks";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import GoBackButton from "./GoBackButton";
import InputName from "./InputName";
import SmallHeader from "./SmallHeader";
import {globalStyles} from "../styles/globalStyles";
import MyText from "./MyText";

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
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Create Tag" />
                <TouchableOpacity style={[globalStyles.link, {position: 'absolute', right: 0}]} onPress={handleAddTag}>
                    <MyText style={globalStyles.linkText}>Done</MyText>
                </TouchableOpacity>
            </View>
            <InputName placeholder="Tag name..." value={tagName} onChangeInput={setTagName} />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={colorId}
                    onValueChange={(itemValue) => setColorId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a color..." value={null} />
                    {colors.map(color => (
                        <Picker.Item
                            key={color.id}
                            label={color.name}
                            value={color.id}
                            color={color.name}
                        />
                    ))}
                </Picker>
            </View>
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
        borderRadius: 5,
    },
    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerItem: {
        height: 50,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});

export default AddTagForm;
