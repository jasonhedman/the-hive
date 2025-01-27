'use client'

import React, { useState } from 'react'

import { Button, CandlestickChart, Skeleton } from '@/components/ui';

import { usePriceChart } from '@/hooks';

import { cn } from '@/lib/utils';

import type { UTCTimestamp } from 'lightweight-charts';
import { OHLCVTimeframe } from '@/services/birdeye/types';

const WINDOWS = [
    { 
        label: '6h', 
        timeframe: OHLCVTimeframe.OneMinute,
        numDays: 1/4
    },
    { 
        label: '12h', 
        timeframe: OHLCVTimeframe.OneMinute,
        numDays: 1/12
    },
    { 
        label: '1d', 
        timeframe: OHLCVTimeframe.FiveMinutes,
        numDays: 1
    },
    { 
        label: '3d', 
        timeframe: OHLCVTimeframe.FiveMinutes,
        numDays: 3
    },
    { 
        label: '7d', 
        timeframe: OHLCVTimeframe.FifteenMinutes,
        numDays: 7
    },
    { 
        label: '30d', 
        timeframe: OHLCVTimeframe.ThirtyMinutes,
        numDays: 30
    },
]

interface Props {
    mint: string;
    height?: number;
}

const TokenChart: React.FC<Props> = ({ mint, height = 400 }) => {

    const [timeframe, setTimeframe] = useState<OHLCVTimeframe>(OHLCVTimeframe.FiveMinutes);
    const [numDays, setNumDays] = useState<number>(1);

    const { data, isLoading } = usePriceChart(mint, timeframe, numDays);

    const price = data.length > 0 ? data[data.length - 1].c : 0;
    const open = data.length > 0 ? data[0].o : 0;
    const change = ((price - open) / open) * 100;

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-1'>
                {
                    isLoading ? (
                        <Skeleton className='h-4 w-24' />
                    ) : (
                        <p className='text-md md:text-lg font-bold'>
                            ${data[data.length - 1].c.toLocaleString(undefined, { maximumFractionDigits: 5 })} <span className={cn(change > 0 ? 'text-green-500' : 'text-red-500')}>({change > 0 ? '+' : ''}{change.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)</span>
                        </p>
                    )
                }
                <div className='flex flex-row gap-1'>
                    {
                        WINDOWS.map((window) => (
                            <Button 
                                key={window.label} 
                                onClick={() => {
                                    setNumDays(window.numDays);
                                    setTimeframe(window.timeframe)
                                }}
                                variant={numDays === window.numDays && timeframe === window.timeframe ? 'brand' : 'ghost'}
                                className='text-sm h-fit w-fit px-1 py-0.5'
                            >
                                {window.label}
                            </Button>
                        ))
                    }
                </div>
            </div>
            {
                isLoading ? (
                    <Skeleton style={{ height, width: '100%' }} />
                ) : (
                    <CandlestickChart
                        data={data.map(price => ({
                            time: price.unixTime as UTCTimestamp,
                            open: price.o,
                            high: price.h,
                            low: price.l,
                            close: price.c,
                        }))} 
                        height={height}
                    />
                )
            }
        </div>
    )
}

export default TokenChart