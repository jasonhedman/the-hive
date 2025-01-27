import { queryBirdeye } from "./base";
import { TokenOverview } from "./types/token-overview";

export const getTokenOverview = async (address: string): Promise<TokenOverview> => {
    return await queryBirdeye<TokenOverview>(
        'defi/token_overview',
        { address }
    );
} 