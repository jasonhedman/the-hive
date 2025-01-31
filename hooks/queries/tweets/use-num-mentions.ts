"use client";

import useSWR from "swr";

import type { TweetV2CountResult } from "twitter-api-v2";

export const useNumMentions = (username: string) => {
    const { data, isLoading, error, mutate } = useSWR<TweetV2CountResult>(
        `/api/tweets/mentions/${username}/amounts`,
        async (url: string) => fetch(url).then(res => res.json()),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { data: data ?? null, isLoading, error, mutate };
}