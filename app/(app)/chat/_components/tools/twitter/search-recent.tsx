'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui';

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { TweetV2, UserV2 } from 'twitter-api-v2';
import type { TwitterSearchRecentResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const SearchRecentTweets: React.FC<Props> = ({ tool }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Recent Tweets...`}
            result={{
                heading: (result: TwitterSearchRecentResultType) => result.body 
                    ? `Fetched Recent Tweets`
                    :  "Failed to fetch recent tweets",
                body: (result: TwitterSearchRecentResultType) => result.body 
                    ? <Tweets tweets={result.body.tweets} />
                    :  "No tweets found"
            }}
            defaultOpen={true}
        />
    )
}

const Tweets = ({ tweets }: { tweets: { tweet: TweetV2; user: UserV2 }[] }) => {

    const [tweetsToShow, setTweetsToShow] = useState(3);

    const handleShowMore = () => {
        setTweetsToShow(tweetsToShow + 3);
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {tweets.slice(0, tweetsToShow).map((tweet: { tweet: TweetV2; user: UserV2 }) => (
                <TweetCard
                    key={tweet.tweet.id} 
                    tweet={tweet.tweet} 
                    user={tweet.user}
                />
            ))}
            {tweetsToShow < tweets.length && (
                <Button onClick={handleShowMore} className="text-sm text-muted-foreground">Show More</Button>
            )}
        </div>
    )
}

const TweetCard = ({ tweet, user }: { tweet: TweetV2; user: UserV2 }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full overflow-hidden">
                <img src={user.profile_image_url} className="w-6 h-6 rounded-full" />
                <p className="text-md font-bold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <p className="text-md">{tweet.text}</p>
        </div>
    )
}

export default SearchRecentTweets;