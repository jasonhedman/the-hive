"use client"

import React from 'react'

import TimeStats from './time-stats';

import { useTokenOverview } from '@/hooks';
import { Skeleton } from '@/components/ui';

interface Props {
    address: string;
}

const MarketStats: React.FC<Props> = ({ address }) => {

    const { data: tokenOverview, isLoading } = useTokenOverview(address);

    if(isLoading) {
        return <Skeleton className="h-full w-full" />
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className="text-lg font-semibold">
                Market Stats
            </h2>
            {
                tokenOverview ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                            <StatItem label="Market Cap" value={tokenOverview.mc} prefix="$" />
                            <StatItem label="Liquidity" value={tokenOverview.liquidity} prefix="$" />
                            <StatItem label="# of Holders" value={tokenOverview.holder} />
                            <StatItem label="# of Markets" value={tokenOverview.numberMarkets} />
                        </div>
                        <TimeStats token={tokenOverview} />
                    </>
                ) : (
                    <p className="text-sm text-neutral-500">
                        No data available
                    </p>
                )
            }
        </div>
    )
}

interface StatItemProps {
    label: string;
    value: number;
    formatOptions?: Intl.NumberFormatOptions;
    prefix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, formatOptions = {}, prefix = '' }) => {
    return (
        <div className="flex flex-col border rounded-md p-2 border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xs font-semibold">
                {label}
            </h3>
            <p className="text-sm">
                {prefix}{value.toLocaleString(undefined, { notation: 'compact', ...formatOptions })}
            </p>
        </div>
    );
};

export default MarketStats