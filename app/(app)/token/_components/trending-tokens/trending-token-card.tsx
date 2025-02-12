import React from 'react'

import { Card } from '@/components/ui'

import type { TrendingToken } from '@/services/birdeye/types'
import Link from 'next/link'

import SaveToken from '@/app/(app)/_components/save-token'

interface Props {
    token: TrendingToken
}

const TrendingTokenCard: React.FC<Props> = ({ token }) => {
    
    return (
        <Link href={`/token/${token.address}`}>
            <Card className="flex flex-col gap-2 p-2 justify-between hover:border-brand-600 dark:hover:border-brand-600 transition-all duration-300 cursor-pointer h-full">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <img 
                            src={token.logoURI} 
                            alt={token.name} 
                            className="size-8 rounded-full" 
                        />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{token.name} ({token.symbol})</p>
                            <p className="text-xs text-muted-foreground">${token.price.toLocaleString(undefined, { maximumFractionDigits: 5})} <span className={token.price24hChangePercent > 0 ? 'text-green-500' : 'text-red-500'}>({token.price24hChangePercent > 0 ? '+' : ''}{token.price24hChangePercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)</span></p>
                        </div>
                    </div>
                    <SaveToken address={token.address} />
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground">24h Volume: ${token.volume24hUSD.toLocaleString()}</p>
                </div>
            </Card>
        </Link>
    )
}

export default TrendingTokenCard