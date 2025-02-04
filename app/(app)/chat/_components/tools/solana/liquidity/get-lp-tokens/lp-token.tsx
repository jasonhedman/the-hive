'use client'

import React from 'react'

import type { LpToken } from '@/services/raydium/types';
import { Card } from '@/components/ui';

interface Props {
    lpToken: LpToken,
    balance: number,
    decimals: number
}

const LpToken: React.FC<Props> = ({ lpToken, balance, decimals }) => {
    return (
        <Card className="flex items-center gap-2 p-2">
            <div className="flex items-center gap-2">
                <img 
                    className="w-6 h-6 rounded-full"
                    src={lpToken.pool.mintA.logoURI} 
                    alt={lpToken.pool.mintA.name} 
                />
                <img 
                    className="w-6 h-6 rounded-full"
                    src={lpToken.pool.mintB.logoURI} 
                    alt={lpToken.pool.mintB.name} 
                />
            </div>
            <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{lpToken.pool.mintA.symbol}/{lpToken.pool.mintB.symbol}</p>
                <p className="text-sm font-bold">{(balance / 10 ** decimals).toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
            </div>
        </Card>
    )
}

export default LpToken