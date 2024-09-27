import { View, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const InputComponent = ({ label, placeholder, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            {label && <MyText style={globalStyles.inputLabel}>{label}</MyText>}
            <TextInput
                style={[
                    globalStyles.input,
                    styles.fullWidthInput
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 5,
    },
    fullWidthInput: {
        width: '100%',
    },
});

export default InputComponent;
