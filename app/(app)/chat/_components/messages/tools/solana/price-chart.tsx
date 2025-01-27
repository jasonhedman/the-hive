import React from 'react'

import { Card, Skeleton } from '@/components/ui';

import TokenChart from '@/app/(app)/_components/token/chart';

import ToolCard from '../tool-card';

import { useTokenMetadata } from '@/hooks';

import type { ToolInvocation } from 'ai';
import type { TokenPriceChartResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const PriceChart: React.FC<Props> = ({ tool, prevToolAgent }) => {
    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Token Price Chart...`}
            result={{
                heading: (result: TokenPriceChartResultType) => result.body 
                    ? `Fetched Token Price Chart` 
                    : `Failed to fetch token price chart`,
                body: (result: TokenPriceChartResultType) => result.body 
                    ? <PriceChartBody tokenAddress={tool.args.tokenAddress} /> 
                    : "No token price chart found"
            }}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

const PriceChartBody = ({ tokenAddress }: { tokenAddress: string }) => {
    
    const { data: tokenMetadata, isLoading } = useTokenMetadata(tokenAddress);

    return (
        <Card className="w-full p-4 flex flex-col gap-4">
            {
                isLoading ? (
                    <Skeleton className="w-full h-8" />
                ) : (
                    tokenMetadata && (
                        <div className="w-full flex items-center gap-2">
                            <img 
                                src={tokenMetadata.logo_uri} 
                                alt={tokenMetadata.name} 
                                className="rounded-full h-8 w-8"
                            />
                            <h3 
                                className="text-xl font-bold">{tokenMetadata.name} (${tokenMetadata.symbol})
                            </h3>
                        </div>
                    )
                )
            }
            <TokenChart mint={tokenAddress} />
        </Card>
    )
}

export default PriceChart;