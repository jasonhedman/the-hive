import React from 'react'

import { Card } from '@/components/ui';

import ToolCard from '../tool-card';

import { PriceChart } from './line-chart';

import type { ToolInvocation } from 'ai';
import type { GetTokenDataResultType } from '@/ai';
import type { JupiterTokenData } from 'solana-agent-kit';

interface Props {
    tool: ToolInvocation
}

const GetTokenData: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard 
            tool={tool}
            icon="ChartCandlestick"
            agentName="Market Agent"
            loadingText={`Getting Token Data...`}
            resultHeading={(result: GetTokenDataResultType) => `Fetched ${result.body?.token.symbol || "Token"} Data`}
            resultBody={(result: GetTokenDataResultType) => result.body 
                ? <TokenCard token={result.body.token} prices={result.body.prices} />
                :  "No token data found"}
            defaultOpen={true}
            className="w-full"
        />
    )
}

const TokenCard = ({ token, prices }: { token: JupiterTokenData, prices: [number, number][]}) => {
    return (
        <Card className="p-2 flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-start">
                    <img 
                        src={token.logoURI} 
                        alt={token.name} 
                        className="w-10 h-10 rounded-full" 
                    />
                    <p className="text-md font-bold">{token.name} ({token.symbol})</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-4xl font-bold">${prices[prices.length - 1][1].toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Daily Volume: ${token.daily_volume.toLocaleString()}</p>
                </div>
            </div>
            <PriceChart data={prices} />
        </Card>
    )
}

export default GetTokenData;