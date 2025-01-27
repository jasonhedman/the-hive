import React from 'react'

import Image from 'next/image'

import Decimal from 'decimal.js';

import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui'

import { useRaydiumStandardPortfolio } from '@/hooks';

interface Props {
    address: string
}

const RaydiumStandardPortfolio: React.FC<Props> = ({ address }) => {

    const { data: portfolio } = useRaydiumStandardPortfolio(address);

    if(!portfolio || portfolio.items.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center gap-2"
                >
                    <Image 
                        src={'/dexes/raydium.png'}
                        alt={"Raydium Logo"}
                        height={24}
                        width={24}
                        className="h-4 w-4"
                    />
                    <h2 className="text-lg font-bold">
                        Raydium Liquidity Pools
                    </h2>
                </div>
                <p>
                    ${portfolio.totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </p>
            </div>
            <Card className="p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Asset</TableHead>
                            <TableHead className="text-center">Balance</TableHead>
                            <TableHead className="text-center">7d APY</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-96 overflow-y-auto">
                        {
                            portfolio.items.filter((token) => Number(token.amount) > 0 && token.pool.mintA.logoURI && token.pool.mintB.logoURI && token.pool.mintA.symbol && token.pool.mintB.symbol && token.valueUsd).map((token) => (
                                <TableRow key={token.pool.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <div className="flex items-center">
                                            <img
                                                src={token.pool.mintA.logoURI}
                                                alt={token.pool.mintA.name}
                                                className="w-4 h-4 rounded-full"
                                            />
                                            <img
                                                src={token.pool.mintB.logoURI}
                                                alt={token.pool.mintB.name}
                                                className="w-4 h-4 rounded-full ml-[-8px]"
                                            />
                                        </div>
                                        <p>
                                            {token.pool.mintA.symbol}/{token.pool.mintB.symbol} ({token.pool.type})
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {new Decimal(token.amount).div(10 ** token.decimals).toNumber().toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell>
                                        {token.pool.week.apr}%
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${token.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default RaydiumStandardPortfolio