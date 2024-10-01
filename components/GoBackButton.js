import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {colors} from "../styles/globalStyles";

const GoBackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Add')}>
            <Ionicons name="chevron-back-outline" style={styles.pickerIcon} size={20} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pickerIcon : {
        color: colors.black,
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
    },
});

export default GoBackButton;
