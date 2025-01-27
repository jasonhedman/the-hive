import { TwitterApi } from "twitter-api-v2";

export function getTwitterClient() {
    if (!process.env.TWITTER_BEARER_TOKEN) {
        throw new Error('Twitter bearer token is not set');
    }
    return new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
}