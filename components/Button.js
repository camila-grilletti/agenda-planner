import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import MyText from './MyText';

const ButtonComponent = ({ title, onPressFn }) => {
    return (
        <TouchableOpacity style={globalStyles.button} onPress={onPressFn}>
            <MyText style={globalStyles.buttonText}>{title}</MyText>
        </TouchableOpacity>
    );
};

export default ButtonComponent;
