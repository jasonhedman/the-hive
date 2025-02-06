import React from 'react'

import TrendingTokenCard from './trending-token-card';

import { getTrendingTokens } from '@/services/birdeye'

const TrendingTokens: React.FC = async () => {

    const { tokens } = await getTrendingTokens(0, 9).catch((error) => {
        console.error(error);
        return { tokens: [] };
    });

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Trending Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {tokens.map((token) => (
                    <TrendingTokenCard key={token.address} token={token} />
                ))}
            </div>
        </div>
    )
}

export default TrendingTokens