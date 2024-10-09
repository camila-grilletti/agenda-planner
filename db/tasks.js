import * as SQLite from 'expo-sqlite';
import {cancelTaskNotification, scheduleTaskNotification} from "./notifications";

const db = SQLite.openDatabaseAsync('tasks.db');

export const createTable = async () => {
    const database = await db;

    // TASKS
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT, 
            description TEXT, 
            date TEXT, 
            tagId INTEGER, 
            colorId INTEGER, 
            time TEXT,
            notificationId TEXT,
            FOREIGN KEY (tagId) REFERENCES tags(id),
            FOREIGN KEY (colorId) REFERENCES colors(id)
        );
    `);


    // TAGS
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL,
            colorId INTEGER,
            FOREIGN KEY (colorId) REFERENCES colors(id)
        );
    `);

    // COLORS
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS colors (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL
        );
    `);

    // THEMES
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS theme (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL,
            selected BOOL NOT NULL DEFAULT 0
        );
    `);

    await database.runAsync(`
        INSERT INTO theme (name, selected)
        SELECT 'Light', 1
        WHERE NOT EXISTS (SELECT 1 FROM theme WHERE name = 'Light');
    `);

    await database.runAsync(`
        INSERT INTO theme (name, selected)
        SELECT 'Dark', 0
        WHERE NOT EXISTS (SELECT 1 FROM theme WHERE name = 'Dark');
    `);
    await database.runAsync(`
        INSERT INTO colors (name)
        SELECT '#FF6347'
        WHERE NOT EXISTS (SELECT 1 FROM colors WHERE name = '#FF6347');
    `);
};

export const addTask = async (title, description, date, tagId, colorId, time) => {
    const database = await db;
    await database.runAsync(
        'INSERT INTO tasks (title, description, date, tagId, colorId, time) VALUES (?, ?, ?, ?, ?, ?)',
        title,
        description,
        date,
        tagId,
        colorId,
        time
    );

    const result = await database.getAllAsync(
        'SELECT id FROM tasks ORDER BY id DESC LIMIT 1'
    );

    const newTaskId = result[0].id;

    const newTask = {
        id: newTaskId,
        title,
        description,
        date,
        tagId,
        colorId,
        time,
    };

    const notificationId = await scheduleTaskNotification(newTask);
    await database.runAsync(
        'UPDATE tasks SET notificationId = ? WHERE id = ?',
        notificationId,
        newTaskId
    );

    return newTask;
};

export const editTask = async (id, newTitle, newDescription, newDate, newTagId, newColorId, newTime) => {
    const database = await db;
    await database.runAsync(
        'UPDATE tasks SET title = ?, description = ?, date = ?, tagId = ?, colorId = ?, time = ? WHERE id = ?',
        newTitle,
        newDescription,
        newDate,
        newTagId,
        newColorId,
        newTime,
        id
    );

    const updatedTask = {
        id,
        title: newTitle,
        description: newDescription,
        date: newDate,
        time: newTime,
    };

    await scheduleTaskNotification(updatedTask);
};

export const updateSelectedTheme = async (themeName) => {
    const database = await db;
    await database.runAsync(`UPDATE theme SET selected = 0`);
    await database.runAsync(`UPDATE theme SET selected = 1 WHERE name = ?`, [themeName]);
};

export const getSelectedTheme = async () => {
    const database = await db;
    const result = await database.getAllAsync(`SELECT name FROM theme WHERE selected = 1`);
    return result.length ? result[0].name : null;
};

export const deleteTask = async (id) => {
    const database = await db;

    const task = await database.getAllAsync('SELECT notificationId FROM tasks WHERE id = ?', id);

    if (task[0]?.notificationId) {
        await cancelTaskNotification(task[0].notificationId)
    }

    await database.runAsync('DELETE FROM tasks WHERE id = ?', id);
};


export const getTasks = async () => {
    const database = await db;
    return await database.getAllAsync(`
        SELECT tasks.*, tags.name as tagName, colors.name as colorName 
        FROM tasks 
        LEFT JOIN tags ON tasks.tagId = tags.id 
        LEFT JOIN colors ON tasks.colorId = colors.id
    `);
};

export const addTag = async (name, colorId) => {
    const database = await db;
    await database.runAsync('INSERT INTO tags (name, colorId) VALUES (?, ?)', name, colorId);
};

export const addColor = async (name) => {
    const database = await db;
    await database.runAsync('INSERT INTO colors (name) VALUES (?)', name);
};

export const getTags = async () => {
    const database = await db;
    return await database.getAllAsync('SELECT * FROM tags');
};

export const getColors = async () => {
    const database = await db;
    return await database.getAllAsync('SELECT * FROM colors');
};

export const getTagId = async (tagId) => {
    const database = await db;
    const result = await database.getAllAsync('SELECT name, colorId FROM tags WHERE id = ?', tagId);
    return result.length ? { name: result[0].name, colorId: result[0].colorId } : null;
};

export const getColorId = async (colorId) => {
    const database = await db;
    const result = await database.getAllAsync('SELECT name FROM colors WHERE id = ?', colorId);
    return result.length ? result[0].name : null;
};

export const getTomatoColorId = async () => {
    const database = await db;
    const result = await database.getAllAsync('SELECT id FROM colors WHERE name = ?', '#FF6347');
    return result.length ? result[0].id : null;
}

export const deleteTag = async (id) => {
    const database = await db;
    await database.runAsync('UPDATE tasks SET tagId = NULL WHERE tagId = ?', id);
    await database.runAsync('DELETE FROM tags WHERE id = ?', id);
};

export const deleteColor = async (id) => {
    const database = await db;

    const tomatoColor = await database.getAllAsync('SELECT id FROM colors WHERE name = ?', '#FF6347');
    const tomatoColorId = tomatoColor[0].id;

    await database.runAsync('UPDATE tags SET colorId = ? WHERE colorId = ?', tomatoColorId, id);
    await database.runAsync('UPDATE tasks SET colorId = ? WHERE colorId = ?', tomatoColorId, id);

    await database.runAsync('DELETE FROM colors WHERE id = ?', id);
};

export const dropTables = async () => {
    const database = await db;
    await database.execAsync('DROP TABLE IF EXISTS tasks');
    await database.execAsync('DROP TABLE IF EXISTS tags');
    await database.execAsync('DROP TABLE IF EXISTS colors');
};

