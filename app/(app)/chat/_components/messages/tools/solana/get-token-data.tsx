import React from 'react'

import { Button, Separator } from '@/components/ui';

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { GetTokenDataResultType } from '@/ai';
import type { JupiterTokenData } from 'solana-agent-kit';
import { DexScreenerPair } from '@/types';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Address from '@/app/_components/address';

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
                ? <TokenCard 
                    token={result.body.token} 
                    pair={result.body.pair} 
                />
                :  "No token data found"}
            defaultOpen={true}
        />
    )
}

const TokenCard = ({ token, pair }: { token: JupiterTokenData, pair: DexScreenerPair }) => {


    return (
        <div className="flex flex-col gap-2 min-w-[300px]">
            <Separator />
            <div className="flex items-center gap-2">
                <img 
                    src={token.logoURI} 
                    alt={token.name} 
                    className="w-8 h-8 rounded-full" 
                />
                <p className="text-xl font-bold">{token.name} ({token.symbol})</p>
            </div>
            <Separator />
            <div className="flex flex-col">
                <p className="text-lg font-semibold flex items-center gap-1">
                    ${pair.priceUsd} 
                    {
                        pair.priceChange && (
                            <span 
                                className={cn(
                                    "text-xs",
                                    pair.priceChange.h24 > 0 ? "text-green-500" : "text-red-500"
                                )}
                            >
                                {pair.priceChange ? `(${pair.priceChange.h24 > 0 ? "+" : ""}${pair.priceChange.h24}%)` : ""}
                            </span>
                        )
                    }
                </p>
                <p className="text-xs text-muted-foreground">24h Volume: ${pair.volume?.h24.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Liquidity: ${pair.liquidity?.usd.toLocaleString()}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
                <Address address={token.address} />
                <Link href={pair.url} target="_blank">
                    <Button 
                        variant="outline"
                        size="sm"
                    >
                        View on DexScreener <ArrowUpRightIcon className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default GetTokenData;