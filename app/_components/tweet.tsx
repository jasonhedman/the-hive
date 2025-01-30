import React from 'react'

import type { Tweet as TweetType } from '@/services/twitter/types';

interface Props {
    tweet: TweetType;
}

const Tweet: React.FC<Props> = ({ tweet }) => {
    const { user, tweet: tweetData, media } = tweet;

    const renderMedia = () => {
        if (!media || media.length === 0) return null;

        return (
            <div className="mt-2 rounded-lg overflow-hidden">
                <div className={`grid gap-1 ${media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {media.map((item) => {
                        switch (item.type) {
                            case 'photo':
                                return (
                                    <img 
                                        key={item.media_key}
                                        src={item.url}
                                        alt="Tweet media"
                                        className="w-full h-full object-cover rounded-lg"
                                        style={{ maxHeight: '300px', maxWidth: '300px' }}
                                    />
                                );
                            case 'video':
                            case 'animated_gif':
                                const videoVariant = item.variants?.findLast(v => v.content_type === 'video/mp4');
                                return videoVariant ? (
                                    <video 
                                        key={item.media_key}
                                        src={videoVariant.url}
                                        controls={item.type === 'video'}
                                        autoPlay={item.type === 'animated_gif'}
                                        loop={item.type === 'animated_gif'}
                                        muted
                                        className="w-full h-full object-cover rounded-lg"
                                        style={{ maxHeight: '300px', maxWidth: '300px' }}
                                    />
                                ) : null;
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full overflow-hidden">
                <img 
                    src={user.profile_image_url} 
                    alt={`${user.name}'s profile`}
                    className="w-6 h-6 rounded-full" 
                />
                <p className="text-md font-bold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <p className="text-sm">{tweetData.text}</p>
            {renderMedia()}
        </div>
    )
}

export default Tweet