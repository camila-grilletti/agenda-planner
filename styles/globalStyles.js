import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#98b4d4',
    secondary: '#333',
    background: '#fff',
    inactive: 'gray',
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
});
