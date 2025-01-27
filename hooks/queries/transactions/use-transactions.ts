"use client";

import useSWR from "swr";

import type { EnrichedTransaction } from "helius-sdk";

export const useTransactions = (address: string) => {
    const { data, isLoading, error, mutate } = useSWR<EnrichedTransaction[]>(
        `/api/transactions/${address}`,
        async (url: string) => fetch(url).then(res => res.json())
    );

    return { data: data ?? [], isLoading, error, mutate };
}