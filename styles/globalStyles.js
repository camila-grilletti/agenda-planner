import { StyleSheet } from 'react-native';

export const colors = {
    primary: 'tomato',
    secondary: '#333',
    background: '#fff',
    inactive: 'gray',
    inputBorder: '#ccc',
    inputBackground: '#f5f5f5',
    white: 'white',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: 18,
        color: colors.secondary,
    },
    input: {
        height: 50,
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        fontSize: 16,
        color: colors.secondary,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 13,
        marginBottom: 10,
        color: colors.inactive,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
