import React from 'react';
import '../../styles/StatsCard.css';

const StatsCard = ({ title, value, icon, trend, trendUp }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon">
                {icon}
            </div>
            <div className="stats-info">
                <h3>{title}</h3>
                <p className="stats-value">{value}</p>
                {trend && (
                    <p className={`stats-trend ${trendUp ? 'up' : 'down'}`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
