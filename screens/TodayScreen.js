import { View, Text, StyleSheet } from 'react-native';
import AddTaskForm from "../components/AddTaskForm";

const TodayScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Welcome to the Today Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TodayScreen;
