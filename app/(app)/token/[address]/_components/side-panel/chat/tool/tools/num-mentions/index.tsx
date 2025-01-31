import React from 'react';
import ToolCard from '../../base';
import DailyStats from './daily-stats';
import HourlyActivity from './hourly-activity';
import TimeOfDayPatterns from './time-of-day-patterns';

import type { ToolInvocation } from 'ai';
import type { TokenPageNumMentionsResultType } from '@/ai';

interface Props {
    tool: ToolInvocation;
}

const NumMentions: React.FC<Props> = ({ tool }) => {
    
    return (
        <ToolCard 
            tool={tool}
            loadingText={`Analyzing Mentions...`}
            result={{
                heading: (result: TokenPageNumMentionsResultType) => result.body 
                    ? `Analyzed Mentions` 
                    : `Failed to Analyze Mentions`,
                body: (result: TokenPageNumMentionsResultType) => result.body 
                    ? (
                        <div className="flex flex-col gap-2">
                            <DailyStats trendMetrics={result.body.trendMetrics} />
                            <HourlyActivity hourlyStats={result.body.trendMetrics.hourlyStats} />
                            <TimeOfDayPatterns timeOfDayStats={result.body.trendMetrics.timeOfDayStats} />
                        </div>
                    ) : "No mentions found"
            }}
            className="w-full"
        />
    );
};

export default NumMentions; 