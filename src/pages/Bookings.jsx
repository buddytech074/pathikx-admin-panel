import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../redux/slices/bookingsSlice';
import Table from '../components/common/Table';
import { MapPin } from 'lucide-react';

const Bookings = () => {
    const dispatch = useDispatch();
    const { list: bookings, loading } = useSelector((state) => state.bookings);
    const [filter, setFilter] = useState('ALL'); // ALL, PENDING, COMPLETED, CANCELLED

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const filteredBookings = bookings.filter(b => filter === 'ALL' || b.status === filter);

    const columns = [
        { header: 'Booking ID', accessor: 'id' },
        { header: 'Customer', render: (row) => row.user?.fullName },
        // { header: 'Driver', render: (row) => row.vehicle?.owner?.fullName || 'Pending' }, // Logic might differ
        { header: 'Route', render: (row) => `${row.pickupLocation} → ${row.dropLocation}` },
        { header: 'Date', render: (row) => new Date(row.startDateTime).toLocaleDateString() },
        { header: 'Amount', render: (row) => `₹${row.totalAmount || 0}` },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => {
                let badgeClass = 'neutral';
                if (row.status === 'COMPLETED') badgeClass = 'success';
                if (row.status === 'PENDING') badgeClass = 'warning';
                if (row.status === 'CANCELLED') badgeClass = 'danger';
                return <span className={`status-badge ${badgeClass}`}>{row.status}</span>;
            }
        },
    ];

    if (loading && bookings.length === 0) return <div>Loading bookings...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>All Bookings</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'].map(status => (
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
                data={filteredBookings}
                actions={(row) => (
                    <button className="icon-btn" title="View Map & Details">
                        <MapPin size={18} />
                    </button>
                )}
            />
        </div>
    );
};

export default Bookings;
