import { createContext, useState } from 'react';

export const LevelContext = createContext();

export function LevelProvider({ children }) {
    const [task, setTask] = useState({
        "color": "#ffffff", 
        "fields": [], 
        "name": "",
        "id": null
    });
    const [mode, setMode] = useState(false);

    const value = {
        'task': [task, setTask],
        'mode': [mode, setMode]
    };

    return (
        <LevelContext.Provider value={value}>
            {children}
        </LevelContext.Provider>
    );
}
