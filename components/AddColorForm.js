import React, {useContext, useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import { addColor } from "../db/tasks";
import ColorPicker from 'react-native-wheel-color-picker';
import GoBackButton from "./GoBackButton";
import SmallHeader from "./SmallHeader";
import {globalStyles} from "../styles/globalStyles";
import MyText from "./MyText";
import {ColorsContext} from "../context/ColorsContext";

const AddColorForm = () => {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const { createColor } = useContext(ColorsContext);

    const handleAddColor = async () => {
        if (selectedColor.trim()) {
            try {
                await createColor(selectedColor);
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
        <View style={styles.mainContainer}>
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Create Color" />
                <TouchableOpacity style={[globalStyles.link, {position: 'absolute', right: 0}]} onPress={handleAddColor}>
                    <MyText style={globalStyles.linkText}>Done</MyText>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={[styles.colorText, { color: selectedColor }]}>
                    {selectedColor}
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});

export default AddColorForm;
