import React from 'react'

import Link from 'next/link';

import { Button } from '@/components/ui';

import ToolCard from '../tool-card';

import { getExplorerAddressUrl, getExplorerTransactionUrl } from '@/lib/explorers';

import type { ToolInvocation } from 'ai';
import type { DeployNftArgumentsType, DeployNftResultBodyType, DeployNftActionResultType } from '@/ai';


interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const DeployNFT: React.FC<Props> = ({ tool, prevToolAgent }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Deploying NFT...`}
            result={{
                heading: (result: DeployNftActionResultType) => result.body ? `NFT Deployed` : `NFT Deployment Failed`,
                body: (result: DeployNftActionResultType) => result.body 
                    ? (
                    <NFTDeploymentSuccess
                        args={tool.args}
                        body={result.body}
                        />
                    ) : "No transaction link found"
            }}
            prevToolAgent={prevToolAgent}
        />
    )
}

interface NFTDeploymentSuccessProps {
    args: DeployNftArgumentsType,
    body: DeployNftResultBodyType
}

const NFTDeploymentSuccess: React.FC<NFTDeploymentSuccessProps> = ({
    args,
    body
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p>
                {args.name} ({args.symbol}) deployed successfully!
            </p>
            <div className="flex gap-1">
                <Link 
                    href={getExplorerAddressUrl(body.contractAddress)}
                    target="_blank"
                >
                    <Button
                        variant="outline"
                    >
                        Contract
                    </Button>
                </Link>
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
        </div>
    )
}

export default DeployNFT;
