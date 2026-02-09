import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, blockUser } from '../redux/slices/usersSlice';
import Table from '../components/common/Table';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';

const Users = () => {
    const dispatch = useDispatch();
    const { list: users, loading } = useSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleBlockToggle = (id) => {
        dispatch(blockUser(id));
    };

    const filteredUsers = users.filter(user =>
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm)
    );

    const columns = [
        { header: 'Name', accessor: 'fullName' },
        { header: 'Phone', accessor: 'phoneNumber' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Role',
            render: (row) => <span className="status-badge neutral">{row.role}</span>
        },
        // { header: 'Total Bookings', accessor: 'bookings' }, // Not in User model yet
    ];

    if (loading && users.length === 0) return <div>Loading users...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>User Management</h2>

                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem 0.6rem 2.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            width: '300px',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            <Table
                columns={columns}
                data={filteredUsers}
                actions={(row) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn" title="View Details">
                            <Eye size={18} />
                        </button>
                        <button
                            className="icon-btn"
                            title="Block User"
                            onClick={() => handleBlockToggle(row.id)}
                            style={{ color: 'var(--danger-color)' }}
                        >
                            <Ban size={18} />
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default Users;
