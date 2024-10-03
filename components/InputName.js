import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const InputName = ({ placeholder, value, onChangeInput }) => {
    const { theme } = useTheme();

    return (
        <TextInput
            style={[styles.inputName, { color: theme.text, borderColor: 'transparent', backgroundColor: theme.backgroundColor }]}
            placeholder={placeholder}
            placeholderTextColor={theme.inactive}
            value={value}
            onChangeText={onChangeInput}
        />
    );
};

const styles = StyleSheet.create({
    inputName: {
        fontSize: 30,
        fontFamily: 'Poppins',
        height: 45,
        paddingVertical: 0,
        textAlignVertical: 'center',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
});

export default InputName;
