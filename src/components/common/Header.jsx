import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, User } from 'lucide-react';
import '../../styles/Header.css';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="header">
            <div className="header-left">
                {/* Breadcrumbs or Page Title could go here */}
                <h3>Dashboard</h3>
            </div>

            <div className="header-right">
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="badge">2</span>
                </button>

                <div className="user-profile">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <span className="user-name">{user?.name || 'Admin'}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
