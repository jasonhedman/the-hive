"use client"

import useSWR from "swr";

import type { TopTraderByToken } from "@/services/birdeye/types";

export const useTopTraders = (address: string) => {
    const { data, isLoading, error } = useSWR<TopTraderByToken[]>(
        `/api/token/${address}/top-traders`, 
        (url: string) => fetch(url).then(res => res.json()),
    );

    return { 
        data: data || [], 
        isLoading,
        error 
    };
}