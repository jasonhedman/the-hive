import { getTwitterClient } from "./client";

export const searchTweets = async (query: string) => {
  const twitterApi = getTwitterClient();

  const tweets = await twitterApi.v2.search({
    query: query,
    max_results: 10,
    expansions: ["author_id"],
    "tweet.fields": ["created_at", "text", "author_id"],
    "user.fields": ["profile_image_url", "name", "username"]
  })
  .catch((error) => {
    console.error(error.data);
    return [];
  });

  return Array.from(tweets);
}