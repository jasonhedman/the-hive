import React from 'react'

import ToolCard from '../../../tool-card';

import DepositLiquidityCall from './call';
import DepositLiquidityResult from './result';

import type { ToolInvocation } from 'ai';
import type { SolanaDepositLiquidityArgumentsType, SolanaDepositLiquidityResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const DepositLiquidity: React.FC<Props> = ({ tool, prevToolAgent }) => {
    
    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Liquidity Pools...`}
            result={{
                heading: (result: SolanaDepositLiquidityResultType) => result.body
                    ? `Deposited Liquidity` 
                    : `Failed to deposit liquidity`,
                body: (result: SolanaDepositLiquidityResultType) => result.body 
                    ? (
                        <DepositLiquidityResult body={result.body} />
                    ) : result.message
            }}
            prevToolAgent={prevToolAgent}
            call={{
                heading: "Deposit Liquidity",
                body: (toolCallId: string, args: SolanaDepositLiquidityArgumentsType) => (
                    <DepositLiquidityCall toolCallId={toolCallId} args={args} />
                )
            }}
            className="w-96 max-w-full"
        />
    )
}

export default DepositLiquidity;