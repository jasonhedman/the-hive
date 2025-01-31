import React from 'react';
import StatItem from './stat-item';
import StatsSection from './stats-section';
import type { TokenPageNumMentionsResultBodyType } from '@/ai';

interface Props {
    trendMetrics: TokenPageNumMentionsResultBodyType['trendMetrics'];
}

const DailyStats: React.FC<Props> = ({ trendMetrics }) => {
    const formatNumber = (num: number) => num.toLocaleString(undefined, {maximumFractionDigits: 2, notation: 'compact'});

    return (
        <StatsSection title="Daily Stats">
            <StatItem
                label="Daily Average"
                value={trendMetrics.dailyAverage}
                formatter={formatNumber}
                suffix=" mentions"
            />
            <StatItem
                label="Peak Day"
                value={`${formatNumber(trendMetrics.maxDailyMentions)} on ${trendMetrics.mostActiveDay}`}
            />
        </StatsSection>
    );
};

export default DailyStats; 