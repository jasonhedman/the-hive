import React from 'react';
import StatItem from './stat-item';
import StatsSection from './stats-section';
import type { TokenPageNumMentionsResultBodyType } from '@/ai';

interface Props {
    timeOfDayStats: TokenPageNumMentionsResultBodyType['trendMetrics']['timeOfDayStats'];
}

const TimeOfDayPatterns: React.FC<Props> = ({ timeOfDayStats }) => {
    const formatNumber = (num: number) => num.toLocaleString(undefined, {maximumFractionDigits: 2, notation: 'compact'});

    return (
        <StatsSection title="Time of Day Patterns">
            <StatItem
                label="Most Active Period"
                value={timeOfDayStats.mostActiveTimeOfDay}
            />
            <StatItem
                label="Morning Avg (6am-12pm)"
                value={timeOfDayStats.morningAvg}
                formatter={formatNumber}
                suffix=" mentions"
            />
            <StatItem
                label="Afternoon Avg (12pm-6pm)"
                value={timeOfDayStats.afternoonAvg}
                formatter={formatNumber}
                suffix=" mentions"
            />
            <StatItem
                label="Evening Avg (6pm-12am)"
                value={timeOfDayStats.eveningAvg}
                formatter={formatNumber}
                suffix=" mentions"
            />
            <StatItem
                label="Night Avg (12am-6am)"
                value={timeOfDayStats.nightAvg}
                formatter={formatNumber}
                suffix=" mentions"
            />
        </StatsSection>
    );
};

export default TimeOfDayPatterns; 