import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PricingConfig.css';

const API_BASE_URL = 'http://localhost:8080/api';

const PricingConfig = () => {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const categoryLabels = {
        'BASE_RATES': '🚗 Base Rates per Kilometer',
        'MINIMUM_FARES': '💰 Minimum Fare Requirements',
        'RENTAL': '🏠 Rental Pricing (5+ Hours)',
        'SYSTEM': '⚙️ System Configuration'
    };

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/pricing-config`);
            setConfigs(response.data);
        } catch (error) {
            console.error('Error fetching pricing configs:', error);
            showMessage('error', 'Failed to load pricing configurations');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (config) => {
        setEditingKey(config.configKey);
        setEditValue(config.configValue.toString());
    };

    const handleCancel = () => {
        setEditingKey(null);
        setEditValue('');
    };

    const handleSave = async (configKey) => {
        try {
            setSaving(true);
            const numValue = parseFloat(editValue);

            if (isNaN(numValue) || numValue < 0) {
                showMessage('error', 'Please enter a valid positive number');
                return;
            }

            await axios.put(`${API_BASE_URL}/pricing-config/${configKey}`, {
                value: numValue
            });

            showMessage('success', '✓ Configuration updated successfully');
            setEditingKey(null);
            setEditValue('');
            fetchConfigs();
        } catch (error) {
            console.error('Error updating config:', error);
            showMessage('error', 'Failed to update configuration');
        } finally {
            setSaving(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const groupedConfigs = configs.reduce((acc, config) => {
        const category = config.category || 'OTHER';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(config);
        return acc;
    }, {});

    const formatKey = (key) => {
        // Add vehicle type icons
        const vehicleIcons = {
            'BIKE': '🏍️',
            'AUTO': '🛺',
            'SEDAN': '🚗',
            'SUV': '🚙',
            'SAFARI': '🚐',
            'EV': '⚡'
        };

        let formatted = key
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase());

        // Add emoji icon if it's a vehicle-specific config
        for (const [vehicle, icon] of Object.entries(vehicleIcons)) {
            if (key.includes(vehicle)) {
                formatted = `${icon} ${formatted}`;
                break;
            }
        }

        return formatted;
    };

    const formatCurrency = (value) => {
        return `₹${parseFloat(value).toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="pricing-config-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading pricing configurations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pricing-config-container">
            {message.text && (
                <div className={`message message-${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="config-sections">
                {Object.entries(groupedConfigs).map(([category, categoryConfigs]) => (
                    <div key={category} className="config-section">
                        <h2 className="section-title">
                            {categoryLabels[category] || category}
                        </h2>
                        <div className="config-list">
                            {categoryConfigs.map((config) => {
                                const isEditing = editingKey === config.configKey;
                                const isPercentage = config.configKey.includes('PERCENTAGE') ||
                                    config.configKey.includes('VARIATION');

                                return (
                                    <div key={config.configKey} className="config-row">
                                        <div className="config-info">
                                            <h3 className="config-name">
                                                {formatKey(config.configKey)}
                                            </h3>
                                            <span className="config-description">
                                                {config.description}
                                            </span>
                                        </div>

                                        <div className="config-actions">
                                            {isEditing ? (
                                                <div className="edit-mode">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        className="value-input"
                                                        autoFocus
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSave(config.configKey);
                                                            }
                                                        }}
                                                    />
                                                    <div className="edit-buttons">
                                                        <button
                                                            onClick={() => handleSave(config.configKey)}
                                                            disabled={saving}
                                                            className="btn btn-save"
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            onClick={handleCancel}
                                                            disabled={saving}
                                                            className="btn btn-cancel"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="view-mode">
                                                    <div className="current-value">
                                                        {isPercentage
                                                            ? `${(parseFloat(config.configValue) * 100).toFixed(0)}%`
                                                            : formatCurrency(config.configValue)
                                                        }
                                                    </div>
                                                    <button
                                                        onClick={() => handleEdit(config)}
                                                        className="btn btn-edit"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingConfig;
