'use client'

import React from 'react'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { 
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Skeleton 
} from '@/components/ui';

import { useTokenUsersOverTime } from '@/hooks';
import { useColorMode } from '@/app/_contexts';

interface Props {
    mint: string;
}

const chartConfig = {
    users: {
        label: "Active Users",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const TokenUsersOverTime: React.FC<Props> = ({ mint }) => {

    const { mode } = useColorMode();

    const { data, isLoading } = useTokenUsersOverTime(mint);

    if (isLoading) return <Skeleton className="h-full w-full" />;

    if(!data) return <div>No data</div>;

    return (
        <div className="h-full max-h-full overflow-hidden w-full flex flex-col gap-2">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Users who sent or received tokens on a given day.
            </p>
            <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 24,
                        }}
                    >
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="day"
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
                            dataKey="activeUserCount"
                            name="users"
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

export default TokenUsersOverTime;