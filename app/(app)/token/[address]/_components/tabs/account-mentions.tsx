"use client";

import React from 'react'

import { Skeleton } from '@/components/ui';

import Tweet from '@/app/_components/tweet';

import { useAccountMentions } from '@/hooks';
import MentionsGraph from '../utils/mentions-graph';

interface Props {
    username: string;
}

const AccountMentions: React.FC<Props> = ({ username }) => {

    const { data: tweets, isLoading } = useAccountMentions(username);

    return (
        <div className="h-full w-full max-h-full flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2 flex flex-col gap-2 h-full max-h-full overflow-y-hidden">
                {isLoading ? <Skeleton className="h-full w-full" /> : (
                    <div className="flex flex-col gap-2 flex-1 h-0 overflow-y-auto no-scrollbar">
                        {tweets.map((tweet) => (
                            <Tweet 
                                key={tweet.tweet.id} 
                                tweet={tweet} 
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2 h-full max-h-full overflow-y-hidden">
                <h3 className="text-sm font-medium text-center">Mentions Over Time</h3>
                <MentionsGraph username={username} />
            </div>
        </div>
    )
}

export default AccountMentions;