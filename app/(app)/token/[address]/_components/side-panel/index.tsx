import React from 'react'

import { ArrowLeftRight, MessageSquare } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

import Swap from '@/app/_components/swap';

import Chat from './chat';

import { ChatProvider } from '../../_contexts';

import { getTokenOverview } from '@/services/birdeye';
import { getToken } from '@/db/services';

import type { TokenChatData } from '@/types';
import type { Token } from '@/db/types';

interface Props {
    address: string;
}

const SidePanel: React.FC<Props> = async ({ address }) => {

    const tokenMetadata = await getTokenOverview(address);
    const token = await getToken(address);

    // If getToken fails, use tokenMetadata to create a token object
    const tokenData = token || (tokenMetadata ? {
        id: tokenMetadata.address,
        name: tokenMetadata.name,
        symbol: tokenMetadata.symbol,
        decimals: tokenMetadata.decimals,
        logoURI: tokenMetadata.logoURI,
        extensions: tokenMetadata.extensions,
        tags: [],
        freezeAuthority: null,
        mintAuthority: null,
        permanentDelegate: null
    } as Token : null);

    const tokenChatData: TokenChatData = {
        address: tokenMetadata.address,
        name: tokenMetadata.name,
        symbol: tokenMetadata.symbol,
        decimals: tokenMetadata.decimals,
        extensions: tokenMetadata.extensions,
        logoURI: tokenMetadata.logoURI,
        supply: tokenMetadata.supply,
        circulatingSupply: tokenMetadata.circulatingSupply
    }

    return (
        <Tabs className="h-full flex flex-col items-start w-full max-w-full" defaultValue="chat">
            <TabsList className="p-0 h-[44px] justify-start bg-neutral-100 dark:bg-neutral-700 w-full max-w-full overflow-x-auto rounded-none no-scrollbar">
                <TabsTrigger 
                    value="chat"
                    className="h-full"
                >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                </TabsTrigger>
                <TabsTrigger 
                    value="trade"
                    className="h-full"
                >
                    <ArrowLeftRight className="w-4 h-4" />
                    Trade
                </TabsTrigger>
            </TabsList>
            <div className="flex-1 h-0 overflow-y-auto w-full no-scrollbar">
                <TabsContent value="chat" className="h-full m-0 p-2">
                    <ChatProvider token={tokenChatData}>
                        <Chat token={tokenChatData} />
                    </ChatProvider>
                </TabsContent>
                <TabsContent value="trade" className="h-full m-0 p-2">
                    <Swap 
                        initialInputToken={null}
                        initialOutputToken={tokenData}
                        inputLabel="Sell"
                        outputLabel="Buy"
                        className="w-full"
                    />
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default SidePanel;