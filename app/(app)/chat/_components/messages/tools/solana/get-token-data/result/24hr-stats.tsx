"use client"

import React from 'react'

import { Card } from '@/components/ui'

import BuySell from '../../../utils/buy-sell'

import type { TokenOverview } from '@/services/birdeye/types'

interface Props {
    token: TokenOverview
}

const TwentyFourHrStats: React.FC<Props> = ({ token }) => {
    return (
        <Card className='p-2 flex flex-col gap-2'>
            <h2 className="text-lg font-semibold">
                Volume (24hr)
            </h2>
            <BuySell
                buy={token.vBuy24hUSD}
                sell={token.vSell24hUSD}
                prefix="$"
            />
            <div className="flex flex-col">
                <h3 className="text-sm font-semibold">
                    Unique Traders
                </h3>
                <p>{token.uniqueWallet24h.toLocaleString()} Traders</p>
            </div>
        </Card>
    )
}

export default TwentyFourHrStats