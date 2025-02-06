"use client"

import { useState } from "react";

import useSWR from "swr";

import type { SearchResultItem } from "@/services/birdeye/types";

export const useSearchTokens = () => {

    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useSWR<SearchResultItem[]>(`/api/token/search?search=${search}`, async () => {
        if (!search) return [];
        
        const response = await fetch("/api/token/search", {
            method: "POST",
            body: JSON.stringify({ search }),
        });

        return response.json();
    });

    return {
        data: data ?? [],
        isLoading,
        error,
        search,
        setSearch,
    };
}