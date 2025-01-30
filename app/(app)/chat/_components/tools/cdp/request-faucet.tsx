import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { RequestFaucetFundsActionResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const RequestFaucet: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard
            tool={tool}
            loadingText="Requesting Faucet Funds..."
            result={{
                heading: (result: RequestFaucetFundsActionResultType) => result.body 
                    ? "Received Faucet Funds" 
                    : "Failed to receive faucet funds",
                body: (result: RequestFaucetFundsActionResultType) => result.body 
                    ? `[Transaction Link](${result.body.transactionLink})` 
                    : result.message
            }}
        />
    )
}

export default RequestFaucet;