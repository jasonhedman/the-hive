'use client'

import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link';

import { Search } from 'lucide-react';

import {
    Button,
    Input, 
    Skeleton, 
} from '@/components/ui';

import SaveToken from '../../_components/save-token';

import { useDebounce, useSearchTokens } from '@/hooks';

import type { TokenSearchResult } from '@/services/birdeye/types';

const SearchBar: React.FC = () => {
    
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const debouncedValue = useDebounce(inputValue, 500);

    const { data, isLoading, setSearch } = useSearchTokens();

    useEffect(() => {
        setSearch(debouncedValue);
    }, [debouncedValue, setSearch]);

    const tokens = data?.[0]?.result ?? [];

    const sortTokens = (tokens: TokenSearchResult[]) => {
        const priorityAddresses = new Set([
            'So11111111111111111111111111111111111111112', // SOL
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
            'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
        ]);

        return tokens.sort((a, b) => {
            if (priorityAddresses.has(a.address) && !priorityAddresses.has(b.address)) return -1;
            if (!priorityAddresses.has(a.address) && priorityAddresses.has(b.address)) return 1;
            
            if (priorityAddresses.has(a.address) && priorityAddresses.has(b.address)) {
                return Array.from(priorityAddresses).indexOf(a.address) - Array.from(priorityAddresses).indexOf(b.address);
            }
            
            return 0;
        });
    };

    const sortedResults = sortTokens(tokens);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Search</h2>
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
                <Input
                    placeholder="Search tokens..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pl-9 w-full cursor-text bg-neutral-200 dark:bg-neutral-800"
                    ref={inputRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        if (!e.relatedTarget?.closest('.search-results')) {
                            setIsFocused(false);
                        }
                    }}
                    autoFocus
                />
                {isFocused && (
                    <div 
                        className="search-results absolute top-full left-0 right-0 mt-2 bg-popover border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 rounded-md shadow-md z-50"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {isLoading ? (
                            <Skeleton className="h-48 w-full" />
                        ) : (
                            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                                {inputValue ? (
                                    sortedResults.length === 0 ? (
                                        <p className="text-xs text-muted-foreground p-2">
                                            No results for &quot;{inputValue}&quot;
                                        </p>
                                    ) : (
                                        sortedResults.map((token: TokenSearchResult) => (
                                            <Link
                                                href={`/token/${token.address}`}
                                                key={token.address}
                                                onMouseDown={(e) => e.preventDefault()}
                                                className="h-fit"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start gap-4 px-2 py-1 h-fit"
                                                >
                                                    <img
                                                        src={token.logo_uri}
                                                        alt={token.name}
                                                        className="rounded-full size-8"
                                                    />
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-bold text-sm">{token.name} ({token.symbol})</span>
                                                        <p className="text-xs text-muted-foreground">
                                                            ${token.price.toLocaleString(undefined, { maximumFractionDigits: 5 })} <span className={token.price_change_24h_percent > 0 ? 'text-green-500' : 'text-red-500'}>({token.price_change_24h_percent > 0 ? '+' : ''}{token.price_change_24h_percent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)</span>
                                                        </p>
                                                    </div>
                                                    <SaveToken address={token.address} />
                                                </Button>
                                            </Link>
                                        ))
                                    )
                                ) : (
                                    <p className="text-xs text-muted-foreground p-2">
                                        Start typing to search for tokens
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar