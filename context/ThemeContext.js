import { createContext, useState, useContext } from 'react';

const themes = {
    Automatic: {
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
        barStyle: 'dark-content',
        inputComponentBackground: '#f5f5f5',
    },
    Light: {
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
        barStyle: 'dark-content',
        inputComponentBackground: '#f5f5f5',
    },
    Dark: {
        primary: 'tomato',
        secondary: '#333',
        background: '#000000',
        backgroundColor: 'black',
        backgroundGray: '#f2f2f2',
        inactive: 'gray',
        inputBorder: '#ccc',
        inputBackground: '#000000',
        white: 'black',
        black: 'white',
        blackTransparent: 'rgba(255, 255, 255, 0.6)',
        whiteTransparent: 'rgba(0, 0, 0, 0.5)',
        whiteDescription: '#ebebeb',
        greenState: '#66CDAA',
        yellowState: '#FFC300',
        redState: '#FF7F7F',
        barStyle: 'light-content',
        inputComponentBackground: 'rgba(255, 255, 255, 0.2)',
    },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('Automatic');

    const changeTheme = (theme) => {
        setCurrentTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[currentTheme], changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
