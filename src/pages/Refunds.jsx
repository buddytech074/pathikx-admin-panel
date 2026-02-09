import React, { useState } from 'react';
import Table from '../components/common/Table';
import { Search, CheckCircle, XCircle } from 'lucide-react';

const Refunds = () => {
    const [refunds] = useState([
        { id: 'RF-501', bookingId: 'BK-1003', user: 'Jane Smith', amount: '₹450', reason: 'Driver Cancelled', status: 'PENDING', date: '2026-01-14' },
        { id: 'RF-502', bookingId: 'BK-0998', user: 'Anon User', amount: '₹120', reason: 'Changed Plan', status: 'PROCESSED', date: '2026-01-12' },
    ]);

    const columns = [
        { header: 'Refund ID', accessor: 'id' },
        { header: 'Booking Ref', accessor: 'bookingId' },
        { header: 'User', accessor: 'user' },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Reason', accessor: 'reason' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`status-badge ${row.status === 'PROCESSED' ? 'success' : 'warning'}`}>
                    {row.status}
                </span>
            )
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Refund Requests</h2>
            </div>

            <Table
                columns={columns}
                data={refunds}
                actions={(row) => (
                    row.status === 'PENDING' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="icon-btn" title="Approve Refund" style={{ color: 'var(--secondary-color)' }}>
                                <CheckCircle size={18} />
                            </button>
                            <button className="icon-btn" title="Reject Refund" style={{ color: 'var(--danger-color)' }}>
                                <XCircle size={18} />
                            </button>
                        </div>
                    )
                )}
            />
        </div>
    );
};

export default Refunds;
