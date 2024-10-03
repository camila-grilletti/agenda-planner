import { View, StyleSheet } from 'react-native';
import MyCalendar from "../components/MyCalendar";
import { useTheme } from "../context/ThemeContext";
import { createGlobalStyles } from '../styles/globalStyles';

const OverviewScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <MyCalendar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default OverviewScreen;
