"use client";

import React from 'react'

import { ArrowLeftRight } from 'lucide-react';

import {
    Card,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';

import TransactionHash from '@/app/_components/transaction-hash';

import TokenTransfer from './token-transfer'
;
import { useTransactions } from '@/hooks';

interface Props {
    address: string;
}

const Transactions: React.FC<Props> = ({ address }) => {

    const { data: transactions, isLoading } = useTransactions(address);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <ArrowLeftRight
                    className="w-4 h-4"
                />
                <h2 className="text-lg font-bold">Transactions</h2>
            </div>
            <Card className="p-2">
                {
                    isLoading ? (
                        <Skeleton
                            className="h-96 w-full"
                        />
                    ) : (
                        transactions.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tx Hash</TableHead>
                                        <TableHead className="text-center">Type</TableHead>
                                        <TableHead className="text-center">Source</TableHead>
                                        <TableHead className="">Balance Changes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="max-h-96 overflow-y-hidden">
                                    {
                                        transactions.map((transaction) => (
                                            <TableRow key={transaction.signature}>
                                                <TableCell>
                                                    <TransactionHash
                                                        hash={transaction.signature}
                                                        hideTransactionText
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.source.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.tokenTransfers?.map((tokenTransfer, index) => (
                                                        <TokenTransfer
                                                            key={index}
                                                            tokenTransfer={tokenTransfer}
                                                            address={address}
                                                        />
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="">
                                No transactions found
                            </p>
                        )
                    )
                }
            </Card>
        </div>
    )
}

export default Transactions