import { Text } from 'react-native';
import { createGlobalStyles } from '../styles/globalStyles';
import { useTheme } from "../context/ThemeContext";

const MyText = ({ style, children, ...props }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    const styles = {
        text: {
            fontFamily: globalStyles.text.fontFamily,
            color: theme.text,
        },
    };

    return (
        <Text style={[globalStyles.text, styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

export default MyText;
