import { getTwitterClient } from "./client";
import { tweetParams } from "./params";

import type { Tweet } from "./types";
import { getUserByUsername } from "./user";

export const getPostsByUserId = async (userId: string): Promise<Tweet[]> => {
    const twitterApi = getTwitterClient();
    const posts = await twitterApi.v2.userTimeline(userId, tweetParams);
    return posts.data.data.map((post) => ({
        tweet: post,
        user: posts.includes.users.find((user) => user.id === post.author_id)!,
        media: posts.includes.media.filter((media) => post.attachments?.media_keys?.includes(media.media_key))
    }));
}

export const getMentionsByUserId = async (userId: string): Promise<Tweet[]> => {
    const twitterApi = getTwitterClient();
    const mentions = await twitterApi.v2.userMentionTimeline(userId, tweetParams);
    return mentions.data.data.map((mention) => ({
        tweet: mention,
        user: mentions.includes.users.find((user) => user.id === mention.author_id)!,
        media: mentions.includes.media.filter((media) => mention.attachments?.media_keys?.includes(media.media_key))
    }));
}

export const getMentionsByUsername = async (username: string): Promise<Tweet[]> => {
    const user = await getUserByUsername(username);
    return getMentionsByUserId(user.id);
}

export const getPostsByUsername = async (username: string): Promise<Tweet[]> => {
    const user = await getUserByUsername(username);
    return getPostsByUserId(user.id);
}