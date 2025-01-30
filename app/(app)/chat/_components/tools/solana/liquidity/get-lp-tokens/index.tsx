import React from 'react'

import ToolCard from '../../../tool-card';

import LpToken from './lp-token';

import type { ToolInvocation } from 'ai';
import type { GetLpTokensResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetLpTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting All Balances...`}
            result={{
                heading: (result: GetLpTokensResultType) => result.body 
                    ? `Fetched LP Tokens`
                    : `Failed to fetch LP tokens`,
                body: (result: GetLpTokensResultType) => result.body && result.body.lpTokens.length > 0
                    ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {result.body.lpTokens.map((lpToken) => (
                                <LpToken
                                    key={lpToken.mint}
                                    lpToken={lpToken}
                                    balance={lpToken.amount}
                                    decimals={lpToken.decimals}
                                />
                            ))}
                        </div>
                    )
                    :  "No LP tokens found"
            }}
            prevToolAgent={prevToolAgent}
            className="w-full"
        />
    )
}

export default GetLpTokens;