import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('tasks.db');

export const createTable = async () => {
    await (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT);
    `);
};

export const addTask = async (title, description, date) => {
    await (await db).runAsync('INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)', title, description, date);
};

export const getTasks = async (setTasks) => {
    return await (await db).getAllAsync('SELECT * FROM tasks');
};