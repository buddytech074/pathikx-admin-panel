import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../redux/slices/dashboardSlice';
import { Users, Car, MapPin, DollarSign } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import VehicleTypeChart from '../components/dashboard/VehicleTypeChart';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading stats...</div>;
    }

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatsCard
                    title="Total Users"
                    value={stats?.totalUsers}
                    icon={<Users size={24} />}
                    trend="12%"
                    trendUp={true}
                />
                <StatsCard
                    title="Active Drivers"
                    value={stats?.activeDrivers}
                    icon={<Car size={24} />}
                    trend="5%"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Bookings"
                    value={stats?.totalBookings}
                    icon={<MapPin size={24} />}
                    trend="8%"
                    trendUp={true}
                />
                <StatsCard
                    title="Revenue"
                    value={`₹${stats?.totalRevenue}`}
                    icon={<DollarSign size={24} />}
                    trend="2%"
                    trendUp={false}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <RevenueChart />
                <VehicleTypeChart />
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Recent Activity</h3>
                <p>No recent activity loaded.</p>
            </div>
        </div>
    );
};

export default Dashboard;
