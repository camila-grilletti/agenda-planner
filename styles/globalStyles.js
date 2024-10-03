import { StyleSheet } from 'react-native';

export const colors = {
    primary: 'tomato',
    secondary: '#333',
    background: '#f5f5f5',
    backgroundGray: '#f2f2f2',
    inactive: 'gray',
    inputBorder: '#ccc',
    inputBackground: '#f5f5f5',
    white: '#fff',
    black: 'black',
    whiteTransparent: 'rgba(255, 255, 255, 0.8)',
    blackTransparent: 'rgba(0, 0, 0, 0.5)',
    whiteDescription: '#ebebeb',
    greenState: '#66CDAA',
    yellowState: '#FFC300',
    redState: '#FF7F7F',
};

export const createGlobalStyles = (theme) => ({
    container: {
        flex: 1,
        padding: 20,
    },
    fontFamily: {
        fontFamily: "Poppins",
    },
    text: {
        fontSize: 18,
        color: colors.secondary,
        fontFamily: "Poppins",
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
        fontFamily: 'Poppins',
    },
    inputLabel: {
        fontSize: 13,
        marginBottom: 10,
        color: colors.inactive,
        fontFamily: 'Poppins',
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        fontFamily: 'Poppins',
    },
    link: {
        borderRadius: 8,
        alignItems: 'center',
    },
    linkText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    buttonPressed: {
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    textHeader: {
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
        marginBottom: -5,
    },
    textSmallHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        marginTop: 5
    },
    textSubHeader: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
    },
    taskTag: {
        paddingVertical: 1,
        paddingHorizontal: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
});
