import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TodayScreen from "../screens/TodayScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreen from "../screens/AddScreen";
import OverviewScreen from "../screens/OverviewScreen";
import AddColorForm from "../screens/AddColorForm";
import AddTagForm from "../screens/AddTagForm";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Today') {
                        iconName = focused
                            ? 'calendar-number'
                            : 'calendar-number-outline';
                    } else if (route.name === 'Add') {
                        iconName = 'add-circle';
                        size = 50;
                        color = theme.primary;
                    } else if (route.name === 'Overview') {
                        iconName = focused ? 'albums' : 'albums-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.inactive,
                tabBarStyle: {
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.background,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Today"
                options={{ tabBarShowLabel: false }}
                component={TodayScreen}
            />
            <Tab.Screen
                name="Add"
                options={{ tabBarShowLabel: false }}
                component={AddScreen}
            />
            <Tab.Screen
                name="Overview"
                options={{ tabBarShowLabel: false }}
                component={OverviewScreen}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Tabs" component={TabNavigator} />
                    <Stack.Screen name="Tag" component={AddTagForm} />
                    <Stack.Screen name="Color" component={AddColorForm} />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
