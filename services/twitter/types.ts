import { MediaObjectV2, TweetV2, UserV2 } from "twitter-api-v2"

export type Tweet = {
    tweet: TweetV2
    user: UserV2
    media: MediaObjectV2[]
}