"use client"

import React, { useRef, useLayoutEffect, useState } from 'react';

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
}

export function CandlestickChart({
    data,
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
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Update container size
    useLayoutEffect(() => {
        const container = chartContainerRef.current;
        if (!container) return;

        const updateSize = () => {
            const { clientWidth, clientHeight } = container;
            setContainerSize({ width: clientWidth, height: clientHeight });
        };

        // Initial size
        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    }, []);

    // Create and update chart
    useLayoutEffect(() => {
        const container = chartContainerRef.current;
        if (!container || containerSize.width === 0 || containerSize.height === 0) return;

        const chart = createChart(container, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: colors.textColor,
            },
            grid: {
                vertLines: { color: colors.lineColor },
                horzLines: { color: colors.lineColor },
            },
            width: containerSize.width,
            height: containerSize.height,
            handleScroll: false,
            handleScale: false,
            rightPriceScale: {
                borderColor: colors.lineColor,
            },
            timeScale: {
                borderColor: colors.lineColor,
                visible: false,
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
        candlestickSeries.applyOptions({
            priceFormat: {
                type: 'price',
                precision: 4,
                minMove: 0.00001,
            },
        });

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
            chartRef.current = null;
        };
    }, [containerSize, colors, data]);

    return (
        <div 
            ref={chartContainerRef} 
            className="w-full h-full max-h-full overflow-hidden"
            style={{ position: 'relative', minHeight: '100%', minWidth: '100%', maxWidth: '100%', maxHeight: '100%' }}
        />
    );
}
