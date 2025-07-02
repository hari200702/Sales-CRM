import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('Error Rendering');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [globalFilter, setGlobalFilter] = useState('');
    
    const value = {
        globalFilter,
        setGlobalFilter,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};