'use client'

import React from 'react'

import { Skeleton } from '@/components/ui';

import { useNativeBalance, useTokenAccounts } from '@/hooks';

interface Props {
    address: string;
}

const Balances: React.FC<Props> = ({ address }) => {

    const { data: tokenAccounts, isLoading: isTokenAccountsLoading, error: tokenAccountsError } = useTokenAccounts(address);
    const { data: nativeBalance, isLoading: isNativeBalanceLoading, error: nativeBalanceError } = useNativeBalance(address);

    if (isTokenAccountsLoading || isNativeBalanceLoading) return (
        <Skeleton className="h-10 w-full" />
    )

    if (tokenAccountsError || nativeBalanceError) return (
        <p>Error fetching balances</p>
    )

    return (
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto px-2">
            <div className="flex flex-row items-center gap-2">
                <img 
                    src={"/solana.png"} 
                    alt={"Solana"} 
                    className="w-6 h-6 rounded-full" 
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium">
                        Solana (SOL)
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {nativeBalance.toFixed(4)}
                    </span>
                </div>
            </div>
            {tokenAccounts.map((account, index) => (
                <div key={`token-${index}`} className="flex flex-row items-center gap-2">
                    <img 
                        src={account.token_data.logoURI} 
                        alt={account.token_data.name} 
                        className="w-6 h-6 rounded-full" 
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {account.token_data.name} ({account.token_data.symbol})
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {(account.amount / 10 ** account.token_data.decimals).toFixed(4)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Balances;