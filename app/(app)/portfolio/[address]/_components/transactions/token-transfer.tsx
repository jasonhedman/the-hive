'use client'

import React from 'react'

import { Skeleton } from '@/components/ui'

import { useTokenDataByAddress } from '@/hooks'

import { cn } from '@/lib/utils'

import type { TokenTransfer } from 'helius-sdk'


interface Props {
    tokenTransfer: TokenTransfer,
    address: string
}

const TokenTransfer: React.FC<Props> = ({ tokenTransfer, address }) => {

    const { data, isLoading } = useTokenDataByAddress(tokenTransfer.mint);

    if(isLoading) return <Skeleton className="w-8 h-4 rounded-full" />;


    return (
        <div className="flex items-center gap-2">
            {
                data ? (
                    <img 
                        src={data.logoURI} 
                        alt={data.name} 
                        className="w-4 h-4 rounded-full"
                    />
                ) : (
                    <div className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-700" />
                )
            }
            
            <p className={cn("text-xs", tokenTransfer.toUserAccount === address ? "text-green-500" : "text-red-500")}>
                {tokenTransfer.toUserAccount === address ? "+" : "-"}
                {tokenTransfer.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })} {data?.symbol || "Unknown"}
            </p>
        </div>
    )
}

export default TokenTransfer