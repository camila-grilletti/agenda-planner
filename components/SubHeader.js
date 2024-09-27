import { globalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const SubHeader = ({ title }) => {
    return (
        <MyText style={globalStyles.textSubHeader}>{title}</MyText>
    );
};

export default SubHeader;
