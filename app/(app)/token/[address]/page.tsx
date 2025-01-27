import React from "react";

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

import Swap from "@/app/_components/swap";

import TokenChart from "../../_components/token/chart";

import Header from "./_components/header";
import MarketStats from "./_components/market-stats";
import { TopHolders, TopTraders, BubbleMap } from "./_components/holder-data";
import { AccountTweets, AccountMentions } from "./_components/tweets";

import { getToken } from "@/db/services/tokens";

import { getTokenOverview } from "@/services/birdeye";

const TokenPage = async ({ params }: { params: Promise<{ address: string }> }) => {

    const { address } = await params;

    const token = await getToken(address);
    const tokenOverview = await getTokenOverview(address);

    return (
        <div className="flex flex-col gap-2 h-full max-h-full overflow-hidden">
            <Header address={address} />
            <div className="md:flex-1 md:h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 w-full md:w-3/4 md:h-full">
                    <Card className="p-4">
                        <TokenChart mint={address} height={350} />
                    </Card>
                    <Card className="flex-1 h-0 overflow-hidden">
                        <Tabs className="h-full flex flex-col items-start" defaultValue="holders">
                            <TabsList className="p-0 h-fit bg-transparent">
                                <TabsTrigger 
                                    value="holders"
                                >
                                    Holders
                                </TabsTrigger>
                                <TabsTrigger value="traders">Traders</TabsTrigger>
                                <TabsTrigger value="bubble">Bubble Map</TabsTrigger>
                                {
                                    tokenOverview.extensions.twitter && (
                                        <>
                                            <TabsTrigger value="tweets">Tweets</TabsTrigger>
                                            <TabsTrigger value="mentions">Mentions</TabsTrigger>
                                        </>
                                    )
                                }
                            </TabsList>
                            <div className="flex-1 h-0 overflow-y-auto p-2 w-full no-scrollbar">
                                <TabsContent value="holders" className="h-full">
                                    <TopHolders mint={address} />
                                </TabsContent>
                                <TabsContent value="traders" className="h-full m-0">
                                    <TopTraders address={address} />
                                </TabsContent>
                                <TabsContent value="bubble" className="h-full m-0">
                                    <BubbleMap address={address} />
                                </TabsContent>
                                {
                                    tokenOverview.extensions.twitter && (
                                        <>
                                            <TabsContent value="tweets" className="h-full m-0">
                                                <AccountTweets username={tokenOverview.extensions.twitter.split('/').pop()!} />
                                            </TabsContent>
                                            <TabsContent value="mentions" className="h-full m-0">
                                                <AccountMentions username={tokenOverview.extensions.twitter.split('/').pop()!} />
                                            </TabsContent>
                                        </>
                                    )
                                }
                            </div>
                        </Tabs>
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
            
            {/* {
                tokenOverview.extensions.twitter && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Card className="p-4 h-full max-h-[300px]">
                            <AccountTweets username={tokenOverview.extensions.twitter.split('/').pop()!} />
                        </Card>
                        <Card className="p-4 h-full max-h-[300px]">
                            <AccountMentions username={tokenOverview.extensions.twitter.split('/').pop()!} />
                        </Card>
                    </div>
                )
            } */}
        </div>
    )
}

export default TokenPage;