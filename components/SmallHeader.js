import { globalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const SmallHeader = ({ title }) => {
    return (
        <MyText style={globalStyles.textSmallHeader}>{title}</MyText>
    );
};

export default SmallHeader;
