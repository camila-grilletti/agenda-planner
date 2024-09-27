import { useEffect } from 'react';
import AppNavigator from "./navigation/AppNavigator";
import { createTable } from './db/tasks';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loaded, error] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
        createTable();
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return <AppNavigator />;
}
