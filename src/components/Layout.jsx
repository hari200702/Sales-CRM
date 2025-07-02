import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import GlobalFilter from './GlobalFilter';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
    const {globalFilter, setGlobalFilter} = useAppContext();

    return (
        <div className="container">
            <Sidebar />
            <main className="main">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;