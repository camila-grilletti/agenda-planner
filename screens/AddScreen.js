import { View, Text, StyleSheet } from 'react-native';

const AddScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Welcome to the Add Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddScreen;
