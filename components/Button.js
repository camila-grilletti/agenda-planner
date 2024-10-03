import { TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const ButtonComponent = ({ title, onPressFn }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <TouchableOpacity style={globalStyles.button} onPress={onPressFn}>
            <MyText style={globalStyles.buttonText}>{title}</MyText>
        </TouchableOpacity>
    );
};

export default ButtonComponent;
