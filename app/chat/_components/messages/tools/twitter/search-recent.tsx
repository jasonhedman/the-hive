import React from 'react'

import ToolCard from '../tool-card';

import { ToolInvocation } from 'ai';
import { TwitterSearchRecentResultType } from '@/agentkit/actions/twitter/types';
import { TweetV2, UserV2 } from 'twitter-api-v2';

interface Props {
    tool: ToolInvocation
}

const SearchRecentTweets: React.FC<Props> = ({ tool }) => {
    

    return (
        <ToolCard 
            tool={tool}
            icon="Twitter"
            agentName="Twitter Agent"
            loadingText={`Getting Recent Tweets...`}
            resultHeading={(result: TwitterSearchRecentResultType) => result.body 
                ? `Fetched Recent Tweets`
                :  "Failed to fetch recent tweets"}
            resultBody={(result: TwitterSearchRecentResultType) => result.body 
                ? <Tweets tweets={result.body.tweets} />
                :  "No tweets found"}
            defaultOpen={true}
        />
    )
}

const Tweets = ({ tweets }: { tweets: { tweet: TweetV2; user: UserV2 }[] }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {tweets.slice(0, 5).map((tweet: { tweet: TweetV2; user: UserV2 }) => (
                <TweetCard
                    key={tweet.tweet.id} 
                    tweet={tweet.tweet} 
                    user={tweet.user}
                />
            ))}
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