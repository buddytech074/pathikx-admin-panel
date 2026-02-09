import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingDrivers, verifyDriver } from '../redux/slices/driversSlice';
import Table from '../components/common/Table';
import { Search, FileText, Ban, CheckCircle } from 'lucide-react';

const Drivers = () => {
    const dispatch = useDispatch();
    const { pendingList, loading } = useSelector((state) => state.drivers);
    const [activeTab, setActiveTab] = useState('verification'); // Default to verification since that's what we fetch

    useEffect(() => {
        // Only fetch pending for now as per slice, eventually fetch all
        if (activeTab === 'verification') {
            dispatch(fetchPendingDrivers());
        }
    }, [dispatch, activeTab]);

    const handleVerify = (id) => {
        dispatch(verifyDriver(id));
    }

    const columns = [
        { header: 'Driver Name', accessor: 'fullName' },
        { header: 'Phone', accessor: 'phoneNumber' },
        { header: 'License', accessor: 'licenseNumber' },
        {
            header: 'Status',
            render: (row) => (
                <span className={`status-badge warning`}>
                    PENDING
                </span>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Driver Management</h2>
            </div>

            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '2rem' }}>
                <button
                    style={{
                        padding: '0.75rem 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'all' ? '2px solid var(--primary-color)' : '2px solid transparent',
                        color: activeTab === 'all' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                    onClick={() => setActiveTab('all')}
                >
                    All Drivers
                </button>
                <button
                    style={{
                        padding: '0.75rem 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'verification' ? '2px solid var(--primary-color)' : '2px solid transparent',
                        color: activeTab === 'verification' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onClick={() => setActiveTab('verification')}
                >
                    Verification Queue
                    {pendingList.length > 0 && (
                        <span style={{ background: 'var(--danger-color)', color: 'white', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '10px' }}>
                            {pendingList.length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'verification' && (
                <Table
                    columns={columns}
                    data={pendingList}
                    actions={(row) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="icon-btn" title="Verify Driver" onClick={() => handleVerify(row.id)} style={{ color: 'var(--secondary-color)' }}>
                                <CheckCircle size={18} />
                            </button>
                        </div>
                    )}
                />
            )}

            {activeTab === 'all' && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Feature coming soon (Fetch all drivers API needed)
                </div>
            )}
        </div>
    );
};

export default Drivers;
