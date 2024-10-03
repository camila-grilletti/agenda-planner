import { View, StyleSheet } from 'react-native';
import { createGlobalStyles } from "../styles/globalStyles";
import GoBackButton from "../components/GoBackButton";
import SmallHeader from "../components/SmallHeader";
import MyText from "../components/MyText";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CheckBox } from '@rneui/themed';
import { useTheme } from '../context/ThemeContext';
import { useState } from "react";

const Settings = ({ navigation }) => {
    const { theme, changeTheme } = useTheme();
    const globalStyles = createGlobalStyles(theme);
    const [selectedTheme, setSelectedTheme] = useState('Automatic');

    const handleCheckboxPress = (theme) => {
        setSelectedTheme(theme);
        changeTheme(theme);
    };

    return (
        <View style={[globalStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Settings" />
            </View>
            <View style={styles.settingsContainer}>
                <MyText style={[{ marginLeft: 10, marginBottom: 5, color: theme.text, fontSize: 13 }]}>Theme</MyText>
                <View style={[styles.themeContainer, { borderColor: theme.blackTransparent }]}>
                    <View style={styles.singleThemeContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="contrast-outline" size={20} color={theme.text} style={{ marginRight: 10 }} />
                            <MyText style={{ fontSize: 15, color: theme.text }}>Automatic</MyText>
                        </View>
                        <CheckBox
                            checked={selectedTheme === 'Automatic'}
                            onPress={() => handleCheckboxPress('Automatic')}
                            uncheckedColor={theme.text}
                            checkedColor={theme.primary}
                            checkedIcon="check-circle"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.blackTransparent }]} />

                    <View style={styles.singleThemeContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="sunny-outline" size={20} color={theme.text} style={{ marginRight: 10 }} />
                            <MyText style={{ fontSize: 15, color: theme.text }}>Light</MyText>
                        </View>
                        <CheckBox
                            checked={selectedTheme === 'Light'}
                            onPress={() => handleCheckboxPress('Light')}
                            uncheckedColor={theme.text}
                            checkedColor={theme.primary}
                            checkedIcon="check-circle"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.blackTransparent }]} />

                    <View style={styles.singleThemeContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="moon-outline" size={20} color={theme.text} style={{ marginRight: 10 }} />
                            <MyText style={{ fontSize: 15, color: theme.text }}>Dark</MyText>
                        </View>
                        <CheckBox
                            checked={selectedTheme === 'Dark'}
                            onPress={() => handleCheckboxPress('Dark')}
                            uncheckedColor={theme.text}
                            checkedColor={theme.primary}
                            checkedIcon="check-circle"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    settingsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    themeContainer: {
        borderRadius: 15,
        borderWidth: 1,
    },
    singleThemeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    divider: {
        height: 1,
    },
});

export default Settings;
