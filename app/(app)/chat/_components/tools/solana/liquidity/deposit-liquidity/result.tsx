'use client'

import React from 'react'

import TransactionHash from '@/app/_components/transaction-hash'

import type { SolanaDepositLiquidityResultBodyType } from '@/ai'

interface Props {
    body: SolanaDepositLiquidityResultBodyType
}

const DepositLiquidityResult: React.FC<Props> = ({ body }) => {
    
    return (
        <TransactionHash hash={body.transaction} />
    )
}

export default DepositLiquidityResult;