import React, { useEffect } from 'react';
import AppNavigator from "./navigation/AppNavigator";
import { createTable } from './db/tasks';

export default function App() {
    useEffect(() => {
        createTable();
    }, []);

    return <AppNavigator />;
}
