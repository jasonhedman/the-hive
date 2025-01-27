"use client"

import React from 'react'

import { Skeleton } from '@/components/ui'

import Address from '@/app/_components/address'

import Links from './token-links'

import { useTokenOverview } from '@/hooks'

interface Props {
    address: string
}

const Header: React.FC<Props> = ({ address }) => {


    const { data: tokenOverview, isLoading } = useTokenOverview(address);

    if (isLoading) {
        return <Skeleton className="h-6 w-full" />
    }

    if (!tokenOverview) {
        return <div>No token found</div>
    }

    return (
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
                <img 
                    src={tokenOverview.logoURI} 
                    alt={tokenOverview.name} 
                    className="w-6 h-6 rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-bold">{tokenOverview.name} ({tokenOverview.symbol})</h1>
                        <Address address={tokenOverview.address} />
                    </div>
                </div>
            </div>
            <Links extensions={tokenOverview.extensions} />
        </div>
    )
}

export default Header