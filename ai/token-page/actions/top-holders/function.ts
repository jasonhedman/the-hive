import { getTopTokenHolders } from "@/services/hellomoon";
import { getStreamsByMint } from "@/services/streamflow";

import { knownAddresses } from "@/lib/known-addresses";

import type { TokenPageTopHoldersResultBodyType, TokenPageTopHoldersArgumentsType } from "./types";
import type { SolanaActionResult } from "../../../solana/actions/solana-action";
import type { TokenChatData } from "@/types";
import { AddressType, KnownAddress } from "@/types/known-address";

export async function getTokenPageTopHolders(token: TokenChatData, _: TokenPageTopHoldersArgumentsType): Promise<SolanaActionResult<TokenPageTopHoldersResultBodyType>> {
    try {
        const numHolders = 50;
        
        const [topHolders, streamflowVaults] = await Promise.all([
            getTopTokenHolders(token.address, numHolders),
            getStreamsByMint(token.address)
        ]);

        const knownAddressesWithStreamflow = {
            ...knownAddresses,
            ...streamflowVaults.reduce((acc, account) => {
                acc[account.account.escrowTokens] = {
                    name: "Streamflow Vault",
                    logo: "/vesting/streamflow.png",
                    type: AddressType.VestingVault
                }
                return acc;
            }, {} as Record<string, KnownAddress>)
        }

        const holdersWithAnnotations = topHolders.map((holder) => {
            const knownAddress = knownAddressesWithStreamflow[holder.owner_account];
            return {
                ...holder,
                owner: knownAddress?.name || holder.owner_account,
                type: knownAddress?.type || AddressType.EOA
            };
        });

        const { eoa, vesting, exchange } = holdersWithAnnotations.reduce((acc, holder) => {
            if (holder.type === AddressType.EOA) {
                acc.eoa.push({
                    name: holder.owner,
                    type: AddressType.EOA,
                    percentOfSupply: holder.percentOfSupply
                });
            } else if (holder.type === AddressType.VestingVault) {
                acc.vesting.push({
                    name: holder.owner,
                    type: AddressType.VestingVault,
                    percentOfSupply: holder.percentOfSupply
                });
            } else if (holder.type === AddressType.CentralizedExchange || holder.type === AddressType.DecentralizedExchange) {
                acc.exchange.push({
                    name: holder.owner,
                    type: AddressType.CentralizedExchange,
                    percentOfSupply: holder.percentOfSupply
                });
            }
            return acc;
        }, {
            eoa: [],
            vesting: [],
            exchange: []
        } as Record<string, { name: string, type: AddressType, percentOfSupply: number }[]>);

        const top10HoldersPercent = eoa.slice(0, 10).reduce((acc, curr) => acc + curr.percentOfSupply, 0);
        const top20HoldersPercent = eoa.slice(0, 20).reduce((acc, curr) => acc + curr.percentOfSupply, 0);
        
        const exchangeHoldersPercent = exchange.reduce((acc, curr) => acc + curr.percentOfSupply, 0);
        const vestedHoldersPercent = vesting.reduce((acc, curr) => acc + curr.percentOfSupply, 0);

        return {
            message: `This analysis shows the token distribution among the largest holders. The top 10 addresses hold ${(top10HoldersPercent * 100).toFixed(2)}% of the total supply, while expanding to the top 20 addresses accounts for ${(top20HoldersPercent * 100).toFixed(2)}%. Among these top holders, ${(exchangeHoldersPercent * 100).toFixed(2)}% is held by cryptocurrency exchanges (both centralized and decentralized). Additionally, ${(vestedHoldersPercent * 100).toFixed(2)}% is locked in vesting vaults, suggesting structured token release schedules for early investors, team members, or other stakeholders.`,
            body: {
                top10HoldersPercent,
                top20HoldersPercent,
                exchangeHoldersPercent,
                vestedHoldersPercent
            }
        };
    } catch (error) {
        console.error(error);
        return {
            message: `Error getting top holders: ${error}`,
        };
    }
} 