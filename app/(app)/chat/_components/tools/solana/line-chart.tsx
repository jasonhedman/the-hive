"use client"

import * as React from "react"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
} from "@/components/ui"

// Transform [timestamp, price] pairs into the format recharts expects
interface PriceDataPoint {
  timestamp: number
  price: number
}

interface PriceChartProps {
  data: [number, number][]
}

export function PriceChart({ data }: PriceChartProps) {
  const chartData: PriceDataPoint[] = data.map(([timestamp, price]) => ({
    timestamp: Math.floor(timestamp / 1000),
    price,
  }))

  // Calculate min and max prices with padding
  const minPrice = Math.min(...chartData.map(d => d.price))
  const maxPrice = Math.max(...chartData.map(d => d.price))

  return (
    <ChartContainer className="aspect-auto h-[250px] w-full" config={{}}>
          <LineChart
            data={chartData}
            margin={{
              left: 24,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return new Date(value * 1000).toString()
              }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="price"
                  formatter={(value) => `$${Number(value).toFixed(2)}`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ffd100"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
  )
}
