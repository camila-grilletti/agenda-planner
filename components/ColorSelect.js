import { StyleSheet, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { ColorsContext } from "../context/ColorsContext";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '../context/ThemeContext';

const ColorSelect = ({ onChangeInput }) => {
    const { theme } = useTheme();
    const { allColors } = useContext(ColorsContext);
    const [selectedColor, setSelectedColor] = useState(null);
    const navigation = useNavigation();

    const handleColorPress = (colorId) => {
        setSelectedColor(colorId);
        onChangeInput(colorId);
    };

    return (
        <View style={styles.scrollWrapper}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollContainer}
                showsHorizontalScrollIndicator={true}
                style={styles.scrollView}
            >
                <View style={styles.container}>
                    {allColors.length === 0 ? (
                        <Text style={[styles.noColorsText, { color: theme.primary }]}>
                            No colors available. Add a new one!
                        </Text>
                    ) : (
                        allColors.map((color) => (
                            <TouchableOpacity
                                key={color.id}
                                onPress={() => handleColorPress(color.id)}
                            >
                                <View
                                    style={[
                                        styles.circleColor,
                                        {
                                            backgroundColor: color.name,
                                            borderColor: selectedColor === color.id ? theme.text : 'transparent'
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        ))
                    )}
                    <TouchableOpacity
                        key='create-color'
                        onPress={() => navigation.navigate('Color')}
                    >
                        <Ionicons name="add-outline" style={[styles.pickerIcon, { color: theme.primary }]} size={25} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        maxHeight: 60,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    scrollView: {
        paddingVertical: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleColor: {
        width: 25,
        height: 25,
        borderRadius: 30,
        marginRight: 10,
        marginBottom: 5,
        borderWidth: 2,
    },
    pickerIcon: {
        width: 25,
        height: 25,
        textAlign: 'center',
        marginTop: -5
    },
    noColorsText: {
        fontSize: 14,
        marginRight: 10,
    }
});

export default ColorSelect;
