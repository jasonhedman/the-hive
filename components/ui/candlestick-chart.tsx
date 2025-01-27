"use client"

import React, { useEffect, useRef } from 'react';

import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';
import { useColorMode } from '@/app/_contexts/color-mode';

interface CandlestickData {
    time: Time;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandlestickChartProps {
    data: CandlestickData[];
    height?: number;
    width?: number;
}

export function CandlestickChart({
    data,
    height = 400,
    width = 600,
}: CandlestickChartProps) {

    const { mode } = useColorMode();

    const colors = {
        backgroundColor: mode === 'dark' ? '#121212' : 'white',
        lineColor: mode === 'dark' ? '#404040' : '#f5f5f5',
        textColor: mode === 'dark' ? 'white' : 'black',
        upColor: mode === 'dark' ? '#26a69a' : '#26a69a',
        downColor: mode === 'dark' ? '#ef5350' : '#ef5350',
        wickUpColor: mode === 'dark' ? '#26a69a' : '#26a69a',
        wickDownColor: mode === 'dark' ? '#ef5350' : '#ef5350',
    }

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.applyOptions({ 
                    width: chartContainerRef.current?.clientWidth || width,
                    height: height 
                });
            }
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: colors.textColor,
            },
            grid: {
                vertLines: { color: colors.lineColor },
                horzLines: { color: colors.lineColor },
            },
            width: chartContainerRef.current.clientWidth,
            handleScroll: false,
            handleScale: false,
            rightPriceScale: {
                borderColor: colors.lineColor,
            },
            timeScale: {
                borderColor: colors.lineColor,
            },
        });
        chartRef.current = chart;

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: colors.upColor,
            downColor: colors.downColor,
            borderVisible: false,
            wickUpColor: colors.wickUpColor,
            wickDownColor: colors.wickDownColor,
        });

        candlestickSeries.setData(data);

        chart.timeScale().fitContent();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, [data, colors, height, width]);

    return (
        <div 
            ref={chartContainerRef} 
            className="w-full"
            style={{ height: `${height}px` }}
        />
    );
}
