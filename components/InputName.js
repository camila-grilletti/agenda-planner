import {StyleSheet, TextInput} from 'react-native';

const InputName = ({ placeholder, value, onChangeInput }) => {
    return (
        <TextInput
            style={styles.inputName}
            placeholder={placeholder}
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
    }
});

export default InputName;
