import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { GetBalanceActionResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const GetBalance: React.FC<Props> = ({ tool }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting ${tool.args.assetId} Balance...`}
            result={{
                heading: (result: GetBalanceActionResultType) => result.body 
                    ? `Read ${tool.args.assetId.toUpperCase()} Balance` 
                    :  "Failed to read balance",
                body: (result: GetBalanceActionResultType) => result.body 
                    ? `${result.body.balance.toFixed(4)} ${tool.args.assetId.toUpperCase()}` 
                    :  "No balance found"
            }}
        />
    )
}

export default GetBalance;