import { View, StyleSheet } from 'react-native';
import AddTaskForm from "./AddTaskForm";

const AddScreen = ({ navigation }) => (
    <View style={styles.container}>
        <AddTaskForm />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default AddScreen;
