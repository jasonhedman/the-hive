"use client"

import useSWR from "swr";

import type { TokenUsersOverTimeResponse } from "@/services/hellomoon/types";

export const useTokenUsersOverTime = (mint: string) => {
    const { data, isLoading, error } = useSWR<TokenUsersOverTimeResponse | null>(
        `/api/token/${mint}/users-over-time`, 
        (url: string) => fetch(url).then(res => res.json()).catch(err => {
            console.error(err);
            return null;
        }),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { 
        data: data || null, 
        isLoading,
        error 
    };
}