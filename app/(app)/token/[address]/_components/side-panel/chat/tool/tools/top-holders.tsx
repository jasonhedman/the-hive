import React from 'react'

import ToolCard from '../base';

import type { ToolInvocation } from 'ai';
import type { TokenPageTopHoldersResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
}

const TopHolders: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Analyzing Top Holders...`}
            result={{
                heading: (result: TokenPageTopHoldersResultType) => result.body 
                    ? `Analyzed Top Holders` 
                    : `Failed to Analyze Top Holders`,
                body: (result: TokenPageTopHoldersResultType) => result.body 
                    ? (
                        <div className="grid grid-cols-2 gap-2">
                            <TopHoldersCard title="Top 10 Wallets" percent={result.body.top10HoldersPercent} />
                            <TopHoldersCard title="Top 20 Wallets" percent={result.body.top20HoldersPercent} />
                            <TopHoldersCard title="Exchanges" percent={result.body.exchangeHoldersPercent} />
                            <TopHoldersCard title="Locked Tokens" percent={result.body.vestedHoldersPercent} />
                        </div>
                    ) : "No balance found"
            }}
            className="w-full"
        />
    )
}

const TopHoldersCard = ({ title, percent }: { title: string, percent: number }) => {
    return (
        <div className="border rounded-md p-2 border-neutral-200 dark:border-neutral-700">
            <h4 className="text-xs font-medium">{title}</h4>
            <p className="text-sm font-semibold">{(percent * 100).toFixed(2)}%</p>
        </div>
    )
}

export default TopHolders;