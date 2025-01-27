"use client"

import React, { useEffect, useState } from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui";

import WalletAddress from "@/app/_components/wallet-address";

import { Connection, PublicKey } from "@solana/web3.js";

import { getStreamsByMint } from "@/services/streamflow";

import { knownAddresses } from "@/lib/known-addresses";

import type { TokenHolder } from "@/services/birdeye/types";
import { useTopHolders } from "@/hooks/queries/token/use-top-holders";

interface Props {
    mint: string;
}

const TopHolders: React.FC<Props> = ({ mint }) => {

    const { data: topHolders, isLoading } = useTopHolders(mint);

    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [knownAddressesWithStreamflow, setKnownAddressesWithStreamflow] = useState<Record<string, { name: string, logo: string }>>(knownAddresses);

    useEffect(() => {
        const fetchData = async () => {
            const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
            const mintInfo = await connection.getTokenSupply(new PublicKey(mint));
            setTotalSupply(Number(BigInt(mintInfo.value.amount) / BigInt(Math.pow(10, mintInfo.value.decimals))));

            const streamflowAccounts = await getStreamsByMint(mint);
            
            setKnownAddressesWithStreamflow({
                ...knownAddresses,
                ...streamflowAccounts.reduce((acc, account) => {
                    acc[account.account.escrowTokens] = {
                        name: "Streamflow Vault",
                        logo: "/vesting/streamflow.png"
                    }
                    return acc;
                }, {} as Record<string, { name: string, logo: string }>)
            });
        };

        fetchData();
    }, [mint]);

    if(isLoading) {
        return <Skeleton className="h-full w-full" />
    }

    return (
        <div className="flex flex-col gap-2">
            {topHolders.map((topHolder, index) => (
                <TopHolder
                    key={topHolder.owner} 
                    topHolder={topHolder}
                    percentageOwned={topHolder.ui_amount / totalSupply * 100}
                    index={index}
                    knownAddresses={knownAddressesWithStreamflow}
                />
            ))}
        </div>
    )
}

interface TopHolderProps {
    topHolder: TokenHolder;
    percentageOwned: number;
    index: number;
    knownAddresses: Record<string, { name: string, logo: string }>;
}

const TopHolder = ({ topHolder, percentageOwned, index, knownAddresses }: TopHolderProps) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-muted-foreground">
                {index + 1})
            </p>
            <div className="flex justify-between w-full">
                {
                    knownAddresses[topHolder.owner] ? (
                        <div className="flex flex-row items-center gap-2">
                            <Image
                                src={knownAddresses[topHolder.owner].logo}
                                alt={knownAddresses[topHolder.owner].name}
                                width={16}
                                height={16}
                            />
                            <p className="text-sm font-bold">
                                {knownAddresses[topHolder.owner].name}
                            </p>
                        </div>
                    ) : (
                        <WalletAddress 
                            address={topHolder.owner} 
                            className="text-sm font-bold"
                        />
                )}
                <p className="text-xs">{topHolder.ui_amount.toLocaleString()} ({percentageOwned.toFixed(2)}%)</p>
            </div>
        </div>
    )
}

export default TopHolders;