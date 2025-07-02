import React,{useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/leads', label: 'Leads' },
        { path: '/employees', label: 'Employees' },
        { path: '/settings', label: 'Settings' }
    ];


    return (
        <aside className="sidebar">
            <div className="logo">Canova<span>CRM</span></div>
            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li 
                            key={item.path} 
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;