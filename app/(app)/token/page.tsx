import React from 'react'

import SearchBar from './_components/search-bar'
import TrendingTokens from './_components/trending-tokens'
import SmartMoneyTokens from './_components/smart-money'

const TokenPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full h-full max-h-full overflow-y-auto px-1">
            <h1 className='text-2xl font-bold'>Tokens</h1>
            <SearchBar />
            <TrendingTokens />
            <SmartMoneyTokens />
        </div>
    )
}

export default TokenPage