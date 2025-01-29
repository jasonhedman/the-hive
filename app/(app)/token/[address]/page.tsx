import React, { Suspense } from "react";

import { Card, Skeleton } from "@/components/ui";

import Swap from "@/app/_components/swap";

import TokenChart from "../../_components/token/chart";

import Header from "./_components/header";
import MarketStats from "./_components/market-stats";

import { getToken } from "@/db/services/tokens";
import TokenDashboardTabs from "./_components/tabs";

const TokenPage = async ({ params }: { params: Promise<{ address: string }> }) => {

    const { address } = await params;

    const token = await getToken(address);

    return (
        <div className="flex flex-col gap-2 h-full max-h-full overflow-hidden">
            <Header address={address} />
            <div className="md:flex-1 md:h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 w-full md:w-3/4 md:h-full">
                    <Card className="p-4">
                        <TokenChart mint={address} height={350} />
                    </Card>
                    <Card className="flex-1 h-0 overflow-hidden">
                        <Suspense fallback={<Skeleton className="h-full w-full m-2" />}>
                            <TokenDashboardTabs address={address} />
                        </Suspense>
                    </Card>   
                </div>
                <Card className="p-2 md:w-1/4 md:h-full flex flex-col gap-2">
                    <MarketStats address={address} />
                    {
                        token && (
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold">Swap</h3>
                                <Swap
                                    initialInputToken={null}
                                    initialOutputToken={token}
                                    inputLabel="Sell"
                                    outputLabel="Buy"
                                />
                            </div>
                        )
                    }
                </Card>
            </div>
        </div>
    )
}

export default TokenPage;