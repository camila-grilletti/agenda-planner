import {useContext, useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import GoBackButton from "../components/GoBackButton";
import InputName from "../components/InputName";
import SmallHeader from "../components/SmallHeader";
import {globalStyles} from "../styles/globalStyles";
import MyText from "../components/MyText";
import ColorSelect from "../components/ColorSelect";
import {TagsContext} from "../context/TagsContext";

const AddTagForm = () => {
    const { createTag } = useContext(TagsContext);
    const [tagName, setTagName] = useState('');
    const [colorId, setColorId] = useState(null);

    const handleAddTag = async () => {
        if (tagName.trim() && colorId) {
            try {
                await createTag(tagName, colorId);
                Alert.alert('Success', 'Tag added successfully');
                setTagName('');
                setColorId(null);
            } catch (error) {
                Alert.alert('Error', 'There was a problem adding the tag');
            }
        } else {
            Alert.alert('Error', 'Please enter a tag name and select a color');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Create Tag" />
                <TouchableOpacity style={[globalStyles.link, {position: 'absolute', right: 0}]} onPress={handleAddTag}>
                    <MyText style={globalStyles.linkText}>Done</MyText>
                </TouchableOpacity>
            </View>
            <InputName placeholder="Tag name..." value={tagName} onChangeInput={setTagName} />
            <ColorSelect onChangeInput={setColorId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerItem: {
        height: 50,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});

export default AddTagForm;
