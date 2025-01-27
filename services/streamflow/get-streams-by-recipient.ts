import { SolanaStreamClient } from "@streamflow/stream/solana";

export const getStreamsByRecipient = async (recipient: string) => {
    const client = new SolanaStreamClient(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
    const stream = await client.searchStreams({
        recipient,
    })
    return stream;
}