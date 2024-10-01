import { createContext, useState, useEffect } from 'react';
import { getColors, addColor } from "../db/tasks";

export const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
    const [allColors, setAllColors] = useState([]);
    const [loading, setLoading] = useState(true);

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
            fetchColors(false);
        } catch (error) {
            console.error('Error al añadir color:', error);
        }
    };

    useEffect(() => {
        fetchColors();
    }, []);

    const value = { allColors, loading, fetchColors, createColor };

    return (
        <ColorsContext.Provider value={value}>
            {children}
        </ColorsContext.Provider>
    );
};
