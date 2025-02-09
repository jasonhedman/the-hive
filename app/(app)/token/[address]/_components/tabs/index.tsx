import React from 'react'

import { GiSwapBag } from 'react-icons/gi'
import { IoSwapHorizontal } from 'react-icons/io5'
import { MdBubbleChart } from 'react-icons/md'
import { FaXTwitter, FaAt, FaWater, FaUsers } from 'react-icons/fa6'
import { ChartCandlestick } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'

import TopHolders from './top-holders';
import TopTraders from './top-traders';
import BubbleMap from './bubble-map';
import AccountTweets from './account-tweets';
import AccountMentions from './account-mentions';
import TokenMarkets from './markets'
import TokenUsersOverTime from './users-over-time'
import MarketStats from './market-stats'

import { getTokenOverview } from '@/services/birdeye';

interface Props {
    address: string;
}

const TokenDashboardTabs: React.FC<Props> = async ({ address }) => {

    const tokenOverview = await getTokenOverview(address);

    return (
        <Tabs className="h-full flex flex-col items-start w-full max-w-full" defaultValue="market-stats">
            <TabsList className="p-0 h-fit justify-start bg-neutral-100 dark:bg-neutral-700 w-full max-w-full overflow-x-auto rounded-none no-scrollbar">
                <TabsTrigger 
                    value="market-stats"
                >
                    <ChartCandlestick className="w-4 h-4" />
                    Market Stats
                </TabsTrigger>
                <TabsTrigger 
                    value="holders"
                >
                    <GiSwapBag className="w-4 h-4" />
                    Holders
                </TabsTrigger>
                <TabsTrigger value="traders">
                    <IoSwapHorizontal className="w-4 h-4" />
                    Traders
                </TabsTrigger>
                <TabsTrigger value="bubble">
                    <MdBubbleChart className="w-4 h-4" />
                    Bubble Map
                </TabsTrigger>
                <TabsTrigger value="markets">
                    <FaWater className="w-4 h-4" />
                    Markets
                </TabsTrigger>
                <TabsTrigger value="users-over-time">
                    <FaUsers className="w-4 h-4" />
                    Active Wallets
                </TabsTrigger>
                {
                    tokenOverview.extensions?.twitter && (
                        <>
                            <TabsTrigger value="tweets">
                                <FaXTwitter className="w-4 h-4" />
                                Tweets
                            </TabsTrigger>
                            <TabsTrigger value="mentions">
                                <FaAt className="w-4 h-4" />
                                Mentions
                            </TabsTrigger>
                        </>
                    )
                }
            </TabsList>
            <div className="flex-1 h-0 overflow-y-auto w-full no-scrollbar">
                <TabsContent value="market-stats" className="h-full m-0 p-2">
                    <MarketStats address={address} />
                </TabsContent>
                <TabsContent value="holders" className="h-full m-0">
                    <TopHolders mint={address} />
                </TabsContent>
                <TabsContent value="traders" className="h-full m-0">
                    <TopTraders address={address} />
                </TabsContent>
                <TabsContent value="bubble" className="h-full m-0 p-2">
                    <BubbleMap address={address} />
                </TabsContent>
                <TabsContent value="markets" className="h-full m-0">
                    <TokenMarkets address={address} />
                </TabsContent>
                <TabsContent value="users-over-time" className="h-full m-0 p-2">
                    <TokenUsersOverTime mint={address} />
                </TabsContent>
                {
                    tokenOverview.extensions?.twitter && (
                        <>
                            <TabsContent value="tweets" className="h-full m-0 p-2">
                                <AccountTweets username={tokenOverview.extensions.twitter.split('/').pop()!} />
                            </TabsContent>
                            <TabsContent value="mentions" className="h-full m-0 p-2">
                                <AccountMentions username={tokenOverview.extensions.twitter.split('/').pop()!} />
                            </TabsContent>
                        </>
                    )
                }
            </div>
        </Tabs>
    )
}

export default TokenDashboardTabs