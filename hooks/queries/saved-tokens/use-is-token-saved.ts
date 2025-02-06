import useSWR from "swr";

import { usePrivy } from "@privy-io/react-auth";

export const useIsTokenSaved = (address: string) => {

    const { getAccessToken } = usePrivy();

    const { data, isLoading, error, mutate } = useSWR<boolean>(
        `/api/saved-tokens/${address}`,
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
            })
                .then(res => res.json())
                .then(data => data !== null)
                .catch(() => false);
        }
    );

    return {
        data,
        isLoading,
        error,
        mutate
    };
}