import {createContext, useState, useEffect, useContext} from 'react';
import {getTags, addTag, deleteTag} from "../db/tasks";
import {TasksContext} from "./TasksContext";

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchTasks } = useContext(TasksContext);

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
            await fetchTags(false);
        } catch (error) {
            console.error('Error al añadir tag:', error);
        }
    };

    const handleDeleteTag = async (id) => {
        try {
            await deleteTag(id);
            await fetchTags(false);
            await fetchTasks(false);
        } catch (error) {
            console.error('Error al eliminar tag:', error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const value = { allTags, loading, fetchTags, createTag, handleDeleteTag };

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    );
};
