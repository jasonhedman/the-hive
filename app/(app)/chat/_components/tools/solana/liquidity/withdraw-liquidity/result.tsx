'use client'

import React from 'react'

import TransactionHash from '@/app/_components/transaction-hash'

import type { SolanaWithdrawLiquidityResultBodyType } from '@/ai'

interface Props {
    body: SolanaWithdrawLiquidityResultBodyType
}

const WithdrawLiquidityResult: React.FC<Props> = ({ body }) => {
    
    return (
        <TransactionHash hash={body.transaction} />
    )
}

export default WithdrawLiquidityResult;