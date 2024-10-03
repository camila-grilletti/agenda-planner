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
    },
    Light: {
        primary: 'tomato',
        secondary: '#333',
        background: '#ffffff',
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
    },
    Dark: {
        primary: 'tomato',
        secondary: '#333',
        background: '#000000',
        backgroundGray: '#f2f2f2',
        inactive: 'gray',
        inputBorder: '#ccc',
        inputBackground: '#000000',
        white: '#ffffff',
        black: '#000000',
        whiteTransparent: 'rgba(255, 255, 255, 0.8)',
        blackTransparent: 'rgba(0, 0, 0, 0.5)',
        whiteDescription: '#ebebeb',
        greenState: '#66CDAA',
        yellowState: '#FFC300',
        redState: '#FF7F7F',
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
