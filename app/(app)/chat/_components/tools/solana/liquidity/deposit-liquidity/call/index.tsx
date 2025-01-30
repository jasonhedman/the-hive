'use client'

import React, { useEffect } from 'react'

import { Card, Skeleton } from '@/components/ui'

import StandardPool from './standard-pool'

import { useRaydiumPool } from '@/hooks'

import { useChat } from '@/app/(app)/chat/_contexts/chat'

import type { SolanaDepositLiquidityArgumentsType } from '@/ai'
import type { ApiV3PoolInfoStandardItem } from '@raydium-io/raydium-sdk-v2'

interface Props {
    toolCallId: string,
    args: SolanaDepositLiquidityArgumentsType
}

const DepositLiquidityCall: React.FC<Props> = ({ toolCallId, args }) => {

    const { addToolResult } = useChat();

    const { data: pool, isLoading: isPoolLoading } = useRaydiumPool(args.poolId);

    useEffect(() => {
        if(pool && pool.type !== "Standard") {
            addToolResult(toolCallId, {
                message: `The Hive does not support ${pool?.type} pools yet.`,
            });
        }
    }, [pool]);

    return (
        <Card className="w-full p-2">
            {
                (isPoolLoading && !pool) ? (
                    <Skeleton className="h-48 w-96" />
                ) : (
                    pool ? (
                        pool.type === "Standard" ? (
                            <StandardPool 
                                pool={pool as ApiV3PoolInfoStandardItem} 
                                toolCallId={toolCallId} 
                            />
                        ) : (
                            <div>
                                <p>The Hive does not support {pool.type} pools yet.</p>
                            </div>
                        )
                    ) : (
                        <div>
                            <p>Pool not found</p>
                        </div>
                    )
                )
            }
        </Card>
    )
}

export default DepositLiquidityCall