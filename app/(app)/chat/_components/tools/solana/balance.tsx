import React from 'react'

import ToolCard from '../tool-card';
import { TokenBalance } from '../utils';

import type { ToolInvocation } from 'ai';
import type { BalanceResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetBalance: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting ${tool.args.tokenAddress || "SOL"} Balance...`}
            result={{
                heading: (result: BalanceResultType) => result.body?.token 
                    ? `Fetched ${result.body.token} Balance` 
                    : `Failed to fetch balance`,
                body: (result: BalanceResultType) => result.body 
                    ? (
                        <TokenBalance 
                            token={result.body.token}
                            balance={result.body.balance}
                            logoURI={result.body.logoURI}
                            name={result.body.name}
                        />
                    ) : "No balance found"
            }}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default GetBalance;