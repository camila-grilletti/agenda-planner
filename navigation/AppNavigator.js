import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import TodayScreen from "../screens/TodayScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../styles/globalStyles";
import AddScreen from "../screens/AddScreen";
import OverviewScreen from "../screens/OverviewScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationContainer>
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
                                color = colors.primary;
                            } else if (route.name === 'Overview') {
                                iconName = focused ? 'albums' : 'albums-outline';
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: colors.primary,
                        tabBarInactiveTintColor: colors.inactive,
                        tabBarStyle: {
                            height: 70,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        headerShown: false,
                    })}
                >
                    <Tab.Screen name="Today"
                        options={{
                            tabBarShowLabel: false,
                        }}
                        component={TodayScreen}
                    />
                    <Tab.Screen name="Add"
                        options={{
                            tabBarShowLabel: false,
                        }}
                        component={AddScreen}
                    />
                    <Tab.Screen name="Overview"
                        options={{
                            tabBarShowLabel: false,
                        }}
                        component={OverviewScreen}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
});
