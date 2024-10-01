import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import SmallHeader from "../components/SmallHeader";
import { globalStyles } from "../styles/globalStyles";
import MyText from "../components/MyText";
import { ColorsContext } from "../context/ColorsContext";
import GoBackButton from "../components/GoBackButton";
import Toast from 'react-native-toast-message';

const AddColorForm = () => {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const { createColor } = useContext(ColorsContext);

    const handleAddColor = async () => {
        if (selectedColor.trim()) {
            try {
                await createColor(selectedColor);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Color added successfully',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
                setSelectedColor('#FFFFFF');
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'There was a problem adding the color',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a color',
                position: 'bottom',
                text1Style: { fontSize: 16 },
                text2Style: { fontSize: 13 },
            });
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Create Color" />
                <TouchableOpacity style={[globalStyles.link, { position: 'absolute', right: 0 }]} onPress={handleAddColor}>
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

            <Toast />
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
