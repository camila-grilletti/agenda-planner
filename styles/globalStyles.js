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
        backgroundColor: theme.background,
    },
    fontFamily: {
        fontFamily: "Poppins",
    },
    text: {
        fontSize: 18,
        color: theme.secondary,
        fontFamily: "Poppins",
    },
    input: {
        height: 50,
        borderColor: theme.inputComponentBackground,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: theme.white,
        fontSize: 16,
        color: theme.black,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
    },
    inputLabel: {
        fontSize: 13,
        marginBottom: 10,
        color: theme.inactive,
        fontFamily: 'Poppins',
    },
    button: {
        backgroundColor: theme.primary,
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
        color: theme.primary,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    buttonPressed: {
        backgroundColor: theme.secondary,
    },
    buttonText: {
        color: theme.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    textHeader: {
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
        marginBottom: -5,
        color: theme.black
    },
    textSmallHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        marginTop: 5,
        color: theme.black
    },
    textSubHeader: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
        color: theme.black
    },
    taskTag: {
        paddingVertical: 1,
        paddingHorizontal: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
});
