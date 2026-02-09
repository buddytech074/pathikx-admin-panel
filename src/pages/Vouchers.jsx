import React, { useState } from 'react';
import Table from '../components/common/Table';
import { Search, Plus, Trash2, Edit } from 'lucide-react';

const Vouchers = () => {
    const [vouchers, setVouchers] = useState([
        { id: 1, code: 'WELCOME50', discount: '50%', maxLimit: '₹100', expiry: '2026-12-31', usage: 120 },
        { id: 2, code: 'FESTIVE20', discount: '20%', maxLimit: '₹200', expiry: '2026-10-15', usage: 45 },
    ]);

    const columns = [
        { header: 'Code', accessor: 'code' },
        { header: 'Discount', accessor: 'discount' },
        { header: 'Max Limit', accessor: 'maxLimit' },
        { header: 'Expiry Date', accessor: 'expiry' },
        { header: 'Usage Count', accessor: 'usage' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Voucher Management</h2>
                <button className="login-btn" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}>
                    <Plus size={18} /> Create Voucher
                </button>
            </div>

            <Table
                columns={columns}
                data={vouchers}
                actions={(row) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn"><Edit size={18} /></button>
                        <button className="icon-btn" style={{ color: 'var(--danger-color)' }}><Trash2 size={18} /></button>
                    </div>
                )}
            />
        </div>
    );
};

export default Vouchers;
