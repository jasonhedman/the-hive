"use client";

import React from 'react'

import RaydiumStandardPortfolio from './raydium-standard';

interface Props {
    address: string
}

const LiquidityPools: React.FC<Props> = ({ address }) => {

    return (
        <RaydiumStandardPortfolio address={address} />
    )
}

export default LiquidityPools