import { useEffect } from 'react';
import AppNavigator from "./navigation/AppNavigator";
import {createTable, dropTables} from './db/tasks';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TasksProvider } from "./context/TasksContext";
import { StatusBar } from 'react-native';
import {colors} from "./styles/globalStyles";
import {ColorsProvider} from "./context/ColorsContext";
import {TagsProvider} from "./context/TagsContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {ThemeProvider} from "./context/ThemeContext";

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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <TasksProvider>
                    <TagsProvider>
                        <ColorsProvider>
                                <StatusBar
                                    backgroundColor={colors.backgroundGray}
                                    barStyle="dark-content"
                                />
                                <AppNavigator />
                        </ColorsProvider>
                    </TagsProvider>
                </TasksProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
