import { Tweetv2FieldsParams } from "twitter-api-v2";

export const tweetParams: Partial<Tweetv2FieldsParams> = {
    "expansions": ["author_id", "attachments.media_keys"],
    "media.fields": ["url", "type", "width", "height", "duration_ms", "public_metrics", "variants"],
    "user.fields": ["profile_image_url", "url", "public_metrics"]
}