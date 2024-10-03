import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const Header = ({ title }) => {
    const { theme } = useTheme();
    const globalStyles = createGlobalStyles(theme);

    return (
        <MyText style={globalStyles.textHeader}>{title}</MyText>
    );
};

export default Header;
