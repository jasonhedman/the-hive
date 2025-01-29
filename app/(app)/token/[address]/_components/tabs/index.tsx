import React from 'react'

import { GiSwapBag } from 'react-icons/gi'
import { IoSwapHorizontal } from 'react-icons/io5'
import { MdBubbleChart } from 'react-icons/md'
import { FaXTwitter, FaAt } from 'react-icons/fa6'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'

import { getTokenOverview } from '@/services/birdeye';

import TopHolders from './top-holders';
import TopTraders from './top-traders';
import BubbleMap from './bubble-map';
import AccountTweets from './account-tweets';
import AccountMentions from './account-mentions';

interface Props {
    address: string;
}

const TokenDashboardTabs: React.FC<Props> = async ({ address }) => {

    const tokenOverview = await getTokenOverview(address);

    return (
        <Tabs className="h-full flex flex-col items-start" defaultValue="holders">
            <TabsList className="p-0 h-fit bg-transparent">
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
                {
                    tokenOverview.extensions.twitter && (
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
                <TabsContent value="holders" className="h-full m-0">
                    <TopHolders mint={address} />
                </TabsContent>
                <TabsContent value="traders" className="h-full m-0">
                    <TopTraders address={address} />
                </TabsContent>
                <TabsContent value="bubble" className="h-full m-0 p-2">
                    <BubbleMap address={address} />
                </TabsContent>
                {
                    tokenOverview.extensions.twitter && (
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