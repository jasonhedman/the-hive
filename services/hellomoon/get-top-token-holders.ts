import { TopHoldersWMeta, TopHoldersWMetaRequest} from "@hellomoon/api";

import client from "./client";

export const getTopTokenHolders = async (mint: string, limit: number = 50): Promise<TopHoldersWMeta[]> => {
    const response = await client.send(new TopHoldersWMetaRequest({
        mint,
        limit
    }));
    return response as unknown as TopHoldersWMeta[];
}