import React from 'react'

import Link from 'next/link';

import { Button } from '@/components/ui';

import ToolCard from '../tool-card';

import { getExplorerTransactionUrl } from '@/lib/explorers';

import type { ToolInvocation } from 'ai';
import type { TransferActionResultType, TransferArgumentsType, TransferResultBodyType } from '@/ai';


interface Props {
    tool: ToolInvocation
}

const Transfer: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Transferring...`}
            result={{
                heading: (result: TransferActionResultType) => result.body 
                    ? `Transfer Complete` 
                    : `Transfer Failed`,
                body: (result: TransferActionResultType) => result.body 
                    ? (
                        <TransferSuccess
                            args={tool.args}
                            body={result.body}
                        />
                    ) : "No transaction link found"
            }}
        />
    )
}

interface TransferSuccessProps {
    args: TransferArgumentsType,
    body: TransferResultBodyType
}

const TransferSuccess: React.FC<TransferSuccessProps> = ({
    args,
    body
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p>
                Transferred {args.amount.toLocaleString()} {args.assetId} to {args.destination}
            </p>
            <Link 
                href={getExplorerTransactionUrl(body.transactionHash)}
                target="_blank"
            >
                <Button
                    variant="outline"
                >
                    Transaction
                </Button>
            </Link>
        </div>
    )
}

export default Transfer;