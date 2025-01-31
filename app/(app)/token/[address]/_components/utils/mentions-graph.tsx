'use client'

import React from 'react'

import { 
    Area,
    AreaChart, 
    CartesianGrid,
    ResponsiveContainer,
    XAxis, 
    YAxis 
} from 'recharts';

import { 
    ChartConfig,
    ChartContainer, 
    ChartTooltip,
    ChartTooltipContent,
    Skeleton 
} from '@/components/ui';

import { useNumMentions } from '@/hooks';

import { useColorMode } from '@/app/_contexts';

interface Props {
    username: string;
}

const chartConfig = {
    mentions: {
        label: "Mentions",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const MentionsGraph: React.FC<Props> = ({ username }) => {

    const { mode } = useColorMode();

    const { data, isLoading } = useNumMentions(username);

    if(isLoading) return <Skeleton className="h-full w-full" />;

    if(!data) return null;

    return (
        <div className="h-full w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data.data}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="start"
                            tickLine={false}
                            tickMargin={8}
                            stroke={mode === "dark" ? "#a3a3a3" : "#525252"}
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis
                            tickLine={false}
                            tickMargin={8}
                            stroke={mode === "dark" ? "#a3a3a3" : "#525252"}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                        <Area
                            dataKey="tweet_count"
                            name="mentions"
                            type="natural"
                            fill="#d19900"
                            fillOpacity={0.4}
                            stroke="#d19900"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}

export default MentionsGraph