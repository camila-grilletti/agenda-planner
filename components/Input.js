import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const InputComponent = ({ label, placeholder, value, onChangeText, multiline = false, numberOfLines = 1, style }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <View style={styles.inputContainer}>
            {label && <MyText style={globalStyles.inputLabel}>{label}</MyText>}
            <TextInput
                style={[
                    globalStyles.input,
                    styles.fullWidthInput,
                    multiline && styles.textArea,
                    style
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
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
    textArea: {
        height: 100,
        paddingVertical: 5,
    },
});

export default InputComponent;
