import React, { useState } from "react";

import Image from "next/image";

import { Button, Card, Progress, Separator } from "@/components/ui";

import type { DexScreenerPair } from "@/services/dexscreener/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

interface Props {
    pair: DexScreenerPair;
    children: React.ReactNode;
}

const timeframeButtons = ["m5", "h1", "h6", "h24"] as const;

export const PoolStats: React.FC<Props> = ({ pair, children }) => {

    const [timeframe, setTimeframe] = useState<typeof timeframeButtons[number]>("h24");

    return (
        <Card className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Image 
                            src={"/dexes/raydium.png"} 
                            alt="Raydium" 
                            width={32} 
                            height={32} 
                            className="rounded-full"
                        />
                        <h3>{pair.baseToken.symbol} / {pair.quoteToken.symbol}</h3>
                    </div>
                    <Link href={pair.url} target="_blank">
                        <Button variant="ghost" size="sm">
                            Dexscreener
                            <ArrowUpRightIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <h2 className="text-lg font-semibold">Stats</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 w-full">
                        {
                            timeframeButtons.map((button) => (
                                <Button 
                                    key={button}
                                    variant={timeframe === button ? "brand" : "outline"}
                                    size="sm" 
                                    onClick={() => setTimeframe(button)}
                                    className="flex-1"
                                >
                                    {button}
                                </Button>
                            ))
                        }
                    </div>
                    {
                        (pair.volume || pair.txns || pair.liquidity) && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full justify-between">
                                {
                                    pair.volume && (
                                        <div className="flex flex-col justify-between gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-md font-semibold text-neutral-600 dark:text-neutral-400">
                                                    Volume
                                                </h3>
                                                <p 
                                                    className={cn(
                                                        "text-sm font-medium",
                                                    )}
                                                >${pair.volume[timeframe].toLocaleString()}</p>
                                            </div>
                                            <Separator />
                                        </div>
                                    )
                                }
                                {
                                    pair.txns && (
                                        <div className="flex flex-col justify-between gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-md font-semibold text-neutral-600 dark:text-neutral-400">Transactions</h3>
                                                <Progress 
                                                    value={pair.txns[timeframe].buys / (pair.txns[timeframe].buys + pair.txns[timeframe].sells) * 100}
                                                    className="w-full h-2"
                                                />
                                                <div className="flex justify-between gap-2">
                                                    <p className="text-xs font-medium">{pair.txns[timeframe as keyof typeof pair.txns].buys.toLocaleString()} Buys</p>
                                                    <p className="text-xs font-medium">{pair.txns[timeframe as keyof typeof pair.txns].sells.toLocaleString()} Sells</p>
                                                </div>
                                            </div>
                                            <Separator />
                                        </div>
                                    )
                                }
                                {
                                    pair.liquidity && (
                                        <div className="flex flex-col justify-between gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-md font-semibold text-neutral-600 dark:text-neutral-400">Liquidity</h3>
                                                <p className="text-sm font-medium">${pair.liquidity?.usd.toLocaleString()}</p>
                                            </div>
                                            <Separator />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {children}
        </Card>
    )
}