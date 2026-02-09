import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Car,
    Ticket,
    MapPin,
    LogOut,
    Receipt,
    AlertCircle,
    DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/users', label: 'Users', icon: <Users size={20} /> },
        { path: '/drivers', label: 'Drivers', icon: <Car size={20} /> },
        { path: '/bookings', label: 'Bookings', icon: <MapPin size={20} /> },
        { path: '/vouchers', label: 'Vouchers', icon: <Ticket size={20} /> },
        { path: '/refunds', label: 'Refunds', icon: <Receipt size={20} /> },
        { path: '/complaints', label: 'Complaints', icon: <AlertCircle size={20} /> },
        { path: '/pricing', label: 'Pricing', icon: <DollarSign size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>PathikX</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
