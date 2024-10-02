import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MyText from "../components/MyText";
import { ColorsContext } from "../context/ColorsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/globalStyles";

const AllColors = () => {
    const { allColors, handleDeleteColor } = useContext(ColorsContext);

    const confirmDeleteColor = (colorId) => {
        if (colorId === 1) {
            Alert.alert(
                "You can't delete this color",
                "It's useful, we promise 🍅",
            );
        } else {
            Alert.alert(
                'Delete Color',
                'Are you sure you want to delete this color?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => handleDeleteColor(colorId),
                    },
                ],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={styles.container}>
            {allColors.length > 0 && <MyText style={[{ marginTop: 20 }]}>Your colors</MyText>}
            <View style={styles.colorsContainer}>
                {allColors.map((color) => (
                    <TouchableOpacity
                        key={color.id}
                        onPress={() => confirmDeleteColor(color.id)}
                    >
                        <View
                            style={[
                                styles.circleColor,
                                { backgroundColor: color.name },
                            ]}
                        >
                            <Ionicons name="close-outline" size={17} color={colors.white} style={styles.colorIconClose} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    colorsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: 10,
        maxHeight: 60,
    },
    circleColor: {
        width: 25,
        height: 25,
        borderRadius: 30,
        marginRight: 10,
        marginBottom: 5,
    },
    colorIconClose: {
        textAlign: 'center',
        marginTop: 3
    }
});

export default AllColors;
