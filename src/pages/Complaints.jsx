import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaints, resolveComplaint } from '../redux/slices/complaintsSlice';
import Table from '../components/common/Table';
import { Search, MessageSquare, Check, Phone } from 'lucide-react';

const Complaints = () => {
    const dispatch = useDispatch();
    const { list: complaints, loading } = useSelector((state) => state.complaints);
    const [filter, setFilter] = useState('ALL'); // ALL, OPEN, RESOLVED

    useEffect(() => {
        dispatch(fetchComplaints());
    }, [dispatch]);

    const filteredComplaints = complaints.filter(c => filter === 'ALL' || c.status === filter);

    const handleResolve = (id) => {
        dispatch(resolveComplaint(id));
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Source',
            render: (row) => (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        background: row.type === 'DRIVER_COMPLAINT' ? '#e0f2fe' : '#fce7f3',
                        color: row.type === 'DRIVER_COMPLAINT' ? '#0369a1' : '#be185d',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600
                    }}>
                        {row.type === 'DRIVER_COMPLAINT' ? 'Driver' : 'User'}
                    </span>
                    {row.complainant?.fullName || 'N/A'}
                </span>
            )
        },
        { header: 'Issue', accessor: 'issue' },
        {
            header: 'Severity',
            render: (row) => (
                <span className={`status-badge ${row.severity === 'HIGH' ? 'danger' : row.severity === 'MEDIUM' ? 'warning' : 'neutral'}`}>
                    {row.severity}
                </span>
            )
        },
        {
            header: 'Status',
            render: (row) => (
                <span className={`status-badge ${row.status === 'RESOLVED' ? 'success' : 'danger'}`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Date', render: (row) => new Date(row.createdAt).toLocaleDateString() },
    ];

    if (loading && complaints.length === 0) return <div>Loading complaints...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Complaints & Support</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['ALL', 'OPEN', 'RESOLVED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: filter === status ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                                background: filter === status ? 'rgba(79, 70, 229, 0.1)' : 'white',
                                color: filter === status ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontSize: '0.875rem',
                                fontWeight: 500
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <Table
                columns={columns}
                data={filteredComplaints}
                actions={(row) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn" title="Contact User">
                            <Phone size={18} />
                        </button>
                        {row.status !== 'RESOLVED' && (
                            <button
                                className="icon-btn"
                                title="Mark Resolved"
                                onClick={() => handleResolve(row.id)}
                                style={{ color: 'var(--secondary-color)' }}
                            >
                                <Check size={18} />
                            </button>
                        )}
                        <button className="icon-btn" title="View Details">
                            <MessageSquare size={18} />
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default Complaints;
