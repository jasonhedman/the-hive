"use client";

import { useState, useEffect } from "react";
import type { Token } from "@/db/types";
import type { SearchResultItem } from "@/services/birdeye/types";

export const useTokenSearch = (input: string) => {
    const [results, setResults] = useState<Token[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTokens = async () => {
            if (!input) {
                setResults([]);
                return;
            }
            
            setLoading(true);
            try {
                const response = await fetch("/api/token/search", {
                    method: "POST",
                    body: JSON.stringify({ search: input }),
                });
                const data: SearchResultItem[] = await response.json();
                
                const tokens: Token[] = data[0]?.result.map(item => ({
                    id: item.address,
                    symbol: item.symbol,
                    name: item.name,
                    decimals: item.decimals,
                    logoURI: item.logo_uri,
                    tags: [],
                    freezeAuthority: null,
                    mintAuthority: null,
                    permanentDelegate: null,
                    extensions: {}
                })) || [];
                
                setResults(tokens);
            } catch (error) {
                console.error('Token search error:', error);
                setResults([]);
            }
            setLoading(false);
        };

        fetchTokens();
    }, [input]);

    return { results, loading };
};