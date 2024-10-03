import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const SubHeader = ({ title }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <MyText style={globalStyles.textSubHeader}>{title}</MyText>
    );
};

export default SubHeader;
