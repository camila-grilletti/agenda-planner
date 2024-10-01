import { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import GoBackButton from "../components/GoBackButton";
import InputName from "../components/InputName";
import SmallHeader from "../components/SmallHeader";
import { globalStyles } from "../styles/globalStyles";
import MyText from "../components/MyText";
import ColorSelect from "../components/ColorSelect";
import { TagsContext } from "../context/TagsContext";
import Toast from 'react-native-toast-message';

const AddTagForm = () => {
    const { createTag } = useContext(TagsContext);
    const [tagName, setTagName] = useState('');
    const [colorId, setColorId] = useState(null);

    const handleAddTag = async () => {
        if (tagName.trim() && colorId) {
            try {
                await createTag(tagName, colorId);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Tag added successfully',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
                setTagName('');
                setColorId(null);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'There was a problem adding the tag',
                    position: 'bottom',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 13 },
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter a tag name and select a color',
                position: 'bottom',
                text1Style: { fontSize: 16 },
                text2Style: { fontSize: 13 },
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerSmallHeader}>
                <GoBackButton />
                <SmallHeader title="Create Tag" />
                <TouchableOpacity style={[globalStyles.link, { position: 'absolute', right: 0 }]} onPress={handleAddTag}>
                    <MyText style={globalStyles.linkText}>Done</MyText>
                </TouchableOpacity>
            </View>
            <InputName placeholder="Tag name..." value={tagName} onChangeInput={setTagName} />
            <ColorSelect onChangeInput={setColorId} />

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});

export default AddTagForm;
