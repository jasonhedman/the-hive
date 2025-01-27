import { queryBirdeye } from "./base";
import { TrendingTokensResponse } from "./types/trending";

export const getTrendingTokens = async (
    offset: number = 0,
    limit: number = 20
): Promise<TrendingTokensResponse> => {
    return queryBirdeye<TrendingTokensResponse>(
        'defi/token_trending',
        {
            sort_by: 'rank',
            sort_type: 'asc',
            offset,
            limit
        }
    );
}
