import { createContext, useState, useEffect } from 'react';
import {getTasks, deleteTask, getTagId, getColorId} from "../db/tasks";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchTasks = async (load = true) => {
        try {
            load && setLoading(true);
            const result = await getTasks();

            const tasksByDate = await result.reduce(async (accPromise, task) => {
                const acc = await accPromise;
                const { date, id, title, description, tagId, colorId, time } = task;

                if (!acc[date]) {
                    acc[date] = [];
                }

                let tagName = null;
                let tagColor = null;
                let color = null;

                if (tagId) {
                    let tag = await getTagId(tagId);
                    tagName = tag.name;
                    let tagColorId = tag.colorId;
                    tagColor = await getColorId(tagColorId);
                }

                if (colorId) {
                    color = await getColorId(colorId);
                }

                acc[date].push({ id, task: title, description: description, tagName, tagColor, color, time });
                return acc;
            }, Promise.resolve({}));

            setTasks(tasksByDate);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        } finally {
            load && setLoading(false);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks(false);
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const value = { tasks, loading, fetchTasks, handleDeleteTask };

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};
