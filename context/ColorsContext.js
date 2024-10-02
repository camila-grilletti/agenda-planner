import {createContext, useState, useEffect, useContext} from 'react';
import {getColors, addColor, deleteColor, getTomatoColorId} from "../db/tasks";
import {TasksContext} from "./TasksContext";
import {TagsContext} from "./TagsContext";

export const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
    const [allColors, setAllColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchTasks } = useContext(TasksContext);
    const { fetchTags } = useContext(TagsContext);

    const fetchColors = async (load = true) => {
        try {
            load && setLoading(true);
            const result = await getColors();
            setAllColors(result);
        } catch (error) {
            console.error('Error al obtener colores:', error);
        } finally {
            load && setLoading(false);
        }
    };

    const createColor = async (name) => {
        try {
            await addColor(name);
            await fetchColors(false);
        } catch (error) {
            console.error('Error al añadir color:', error);
        }
    };

    const handleDeleteColor = async (id) => {
        try {
            let tomatoColorId = await getTomatoColorId();

            if (tomatoColorId !== id) {
                await deleteColor(id);
                await fetchColors(false);
                await fetchTasks(false);
                await fetchTags(false);
            }
        } catch (error) {
            console.error('Error al eliminar color:', error);
        }
    };

    useEffect(() => {
        fetchColors();
    }, []);

    const value = { allColors, loading, fetchColors, createColor, handleDeleteColor };

    return (
        <ColorsContext.Provider value={value}>
            {children}
        </ColorsContext.Provider>
    );
};
