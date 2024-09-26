import { View, StyleSheet } from 'react-native';
import MyCalendar from "../components/MyCalendar";

const OverviewScreen = ({ navigation }) => (
    <View style={styles.container}>
        <MyCalendar />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default OverviewScreen;
