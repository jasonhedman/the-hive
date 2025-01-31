import React from 'react';

interface Props {
    label: string;
    value: string | number;
    formatter?: (value: number) => string;
    suffix?: string;
}

const StatItem: React.FC<Props> = ({ label, value, formatter, suffix = '' }) => {
    const formattedValue = typeof value === 'number' && formatter 
        ? formatter(value)
        : value;

    return (
        <div className="b">
            <p className="font-medium text-xs opacity-50">{label}</p>
            <p className="text-sm">{formattedValue}{suffix}</p>
        </div>
    );
};

export default StatItem; 