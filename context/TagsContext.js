import { createContext, useState, useEffect } from 'react';
import { getTags, addTag } from "../db/tasks";

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTags = async (load = true) => {
        try {
            load && setLoading(true);
            const result = await getTags();
            setAllTags(result);
        } catch (error) {
            console.error('Error al obtener tags:', error);
        } finally {
            load && setLoading(false);
        }
    };

    const createTag = async (name, colorId) => {
        try {
            await addTag(name, colorId);
            fetchTags(false);
        } catch (error) {
            console.error('Error al añadir tag:', error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const value = { allTags, loading, fetchTags, createTag };

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    );
};
