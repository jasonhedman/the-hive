"use client"

import useSWR from "swr";

import { ApiV3PoolInfoItem } from "@raydium-io/raydium-sdk-v2";

export const useRaydiumPool = (poolId: string) => {
    const { data, isLoading, error } = useSWR<ApiV3PoolInfoItem>(
        `/api/raydium/pool/${poolId}`,
        async () => {
            return await fetch(`/api/raydium/pool/${poolId}`).then(res => res.json())
        },
        { refreshInterval: 5000 }
    );

    return { data, isLoading, error };
}