import { getTwitterClient } from "./client";

export const getPostCount = async (query: string, numDays: number = 7) => {
  return await getTwitterClient().v2.tweetCountRecent(query, {
    start_time: new Date(Date.now() - numDays * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
  })
    .catch((error) => {
      console.error(error);
        return null;
    });
}