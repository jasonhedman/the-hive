import useSWR from "swr";

import { usePrivy } from "@privy-io/react-auth";

import type { SavedToken } from "@/db/types";

export const useSavedTokens = () => {
    const { getAccessToken } = usePrivy();

    const { data, isLoading, error, mutate } = useSWR<SavedToken[]>(
        "/api/saved-tokens",
        async (route: string) => {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Not authenticated");
            }
            
            return fetch(route, {
                cache: "no-cache",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => res.json());
        },
    );

    return {
        savedTokens: data ?? [],
        isLoading,
        error,
        mutate
    }
};