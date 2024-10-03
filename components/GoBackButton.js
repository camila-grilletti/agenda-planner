import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const GoBackButton = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routes);

    const handleGoBack = () => {
        if (routes.length > 1) {
            navigation.navigate(routes[routes.length - 2].name);
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Ionicons name="chevron-back-outline" style={[{ color: theme.black }]} size={20} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    goBackButton: {
        position: 'absolute',
        left: 0,
    },
});

export default GoBackButton;
