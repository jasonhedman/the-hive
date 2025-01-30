import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { GetWalletDetailsActionResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const GetWalletDetails: React.FC<Props> = ({ tool }) => {
    return (
        <ToolCard
            tool={tool}
            loadingText="Getting Wallet Details..."
            result={{
                heading: (result: GetWalletDetailsActionResultType) => result.body?.address ?? "No address found",
                body: (result: GetWalletDetailsActionResultType) => result.body?.address ?? "No address found"
            }}
        />
    )
}

export default GetWalletDetails;