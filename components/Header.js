import { globalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const Header = ({ title }) => {
    return (
        <MyText style={globalStyles.textHeader}>{title}</MyText>
    );
};

export default Header;
