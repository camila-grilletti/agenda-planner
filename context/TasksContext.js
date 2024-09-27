import { createContext, useState, useEffect } from 'react';
import { getTasks, deleteTask } from "../db/tasks";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchTasks = async (load=true) => {
        try {
            load && setLoading(true);
            const result = await getTasks();
            const tasksByDate = result.reduce((acc, task) => {
                const { date, id, title, description } = task;
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push({ id, task: title, description: description });
                return acc;
            }, {});

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
