import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AppNavigator from "./navigation/AppNavigator";
import { createTable } from './db/tasks';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TasksProvider } from "./context/TasksContext";
import { StatusBar } from 'react-native';
import { ColorsProvider } from "./context/ColorsContext";
import { TagsProvider } from "./context/TagsContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from "./context/ThemeContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

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

        // Registrar permisos de notificación
        requestNotificationPermissions();
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

function AppContent() {
    const { theme } = useTheme();

    return (
        <TasksProvider>
            <TagsProvider>
                <ColorsProvider>
                    <StatusBar
                        backgroundColor={theme.background}
                        barStyle={theme.barStyle || 'dark-content'}
                    />
                    <AppNavigator />
                </ColorsProvider>
            </TagsProvider>
        </TasksProvider>
    );
}

// Función para solicitar permisos de notificación
async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
        alert('No permission for push notifications');
    }
}
