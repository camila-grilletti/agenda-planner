import { StyleSheet, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const MyText = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: globalStyles.text.fontFamily,
    },
});

export default MyText;
