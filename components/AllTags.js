import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, globalStyles } from "../styles/globalStyles";
import MyText from "../components/MyText";
import { TagsContext } from "../context/TagsContext";
import { getColorId } from "../db/tasks";
import { getTextColorForBackground } from "../utils/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useFocusEffect} from "@react-navigation/native";

const AllTags = () => {
    const { allTags, handleDeleteTag } = useContext(TagsContext);
    const [tagsWithColors, setTagsWithColors] = useState([]);

    const confirmDeleteTag = (tagId) => {
        Alert.alert(
            'Delete Tag',
            'Are you sure you want to delete this tag?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => handleDeleteTag(tagId),
                },
            ],
            { cancelable: true }
        );
    };

    useFocusEffect(
        useCallback(() => {
            const fetchTagColors = async () => {
                const tagsWithResolvedColors = await Promise.all(
                    allTags.map(async (tag) => {
                        const resolvedColor = await getColorId(tag.colorId);
                        const textColor = resolvedColor ? getTextColorForBackground(resolvedColor) : 'black';

                        return { ...tag, tagColor: resolvedColor, textColor: textColor };
                    })
                );
                setTagsWithColors(tagsWithResolvedColors);
            };

            fetchTagColors();
        }, [allTags])
    );

    return (
        <View style={styles.container}>
            {tagsWithColors.length > 0 && <MyText style={[{ marginTop: 20 }]}>Your tags</MyText>}
            <View style={styles.tagsContainer}>
                {tagsWithColors.map((tag) => (
                    <View key={tag.id} style={[globalStyles.taskTag, { backgroundColor: tag.tagColor, marginRight: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }]}>
                        <MyText style={[{ color: tag.textColor, fontSize: 13 }]}>{tag.name}</MyText>
                        <TouchableOpacity onPress={() => confirmDeleteTag(tag.id)}>
                            <Ionicons name="close-outline" size={17} color={colors.white} style={styles.tagIconClose} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerSmallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: 10,
        maxHeight: 60,
    },
    tagIconClose: {
        marginLeft: 5
    }
});

export default AllTags;
