"use client";

import useSWR from "swr";

import type { Tweet } from "@/services/twitter/types";

export const useAccountMentions = (username: string) => {
    const { data, isLoading, error, mutate } = useSWR<Tweet[]>(
        `/api/tweets/mentions/${username}`,
        async (url: string) => fetch(url).then(res => res.json())
    );

    return { data: data ?? [], isLoading, error, mutate };
}