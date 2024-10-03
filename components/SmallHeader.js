import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const SmallHeader = ({ title }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <MyText style={globalStyles.textSmallHeader}>{title}</MyText>
    );
};

export default SmallHeader;
