'use client'

import React from 'react'

import { Skeleton } from '@/components/ui'

import TokenSelect from '@/app/_components/token-select'
import TokenDisplay from '@/app/_components/token-display'

import TokenBalance from './token-balance'

import { usePrice } from '@/hooks/queries/price'

import { cn } from '@/lib/utils'

import type { Token } from '@/db/types'

interface Props {
    label: string,
    amount: string,
    onChange?: (amount: string) => void,
    token: Token | null,
    onChangeToken?: (token: Token | null) => void,
    address?: string,
}

const TokenInput: React.FC<Props> = ({ label, amount, onChange, token, onChangeToken, address }) => {

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div className={cn(
            "flex flex-col border border-transparent rounded-md p-2 w-full transition-colors bg-neutral-100 dark:bg-neutral-700 gap-2",
            isFocused && "border-brand-600"
        )}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold">
                    {label}
                </p>
                {
                    token && address && (
                        <TokenBalance
                            address={address}
                            tokenAddress={token.id}
                            tokenSymbol={token.symbol}
                            setAmount={onChange}
                        />
                    )
                }
            </div>
            <div className={cn(
                "flex items-center w-full",
            )}>
                <div className="w-full">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => onChange && onChange(e.target.value)} 
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        disabled={!onChange}
                        placeholder="0.00"
                    />
                    {
                        token && (
                            <TokenInputValue
                                amount={amount}
                                token={token}
                            />
                        )
                    }
                </div>
                {
                    onChangeToken ? (
                        <TokenSelect
                            value={token}
                            onChange={onChangeToken}
                        />
                    ) : (
                        token && (
                            <TokenDisplay token={token} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export const TokenInputValue = ({ amount, token }: { amount: string, token: Token }) => {
    const { data: price, isLoading: isPriceLoading } = usePrice(token.id);
    
    if(isPriceLoading) return <Skeleton className="w-16 h-4" />

    if(!price) return null;

    return (
        <p className="text-[10px] text-neutral-600 dark:text-neutral-400">
            ${(price.value * Number(amount)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    )
}

export default TokenInput