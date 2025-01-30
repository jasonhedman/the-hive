"use client";

import React from 'react'

import { Skeleton } from '@/components/ui';

import Tweet from '@/app/_components/tweet';

import { useAccountMentions } from '@/hooks';

interface Props {
    username: string;
}

const AccountMentions: React.FC<Props> = ({ username }) => {

    const { data: tweets, isLoading } = useAccountMentions(username);

    return (
        <div className="flex flex-col gap-2 h-full max-h-full overflow-y-hidden">
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
    )
}

export default AccountMentions;