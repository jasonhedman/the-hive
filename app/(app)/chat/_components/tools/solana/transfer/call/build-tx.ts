import { 
    PublicKey, 
    SystemProgram, 
    Connection,
    VersionedTransaction,
    TransactionMessage,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";

import { 
    getAssociatedTokenAddress, 
    createAssociatedTokenAccountInstruction, 
    createTransferInstruction, 
    getMint 
} from "@solana/spl-token";

export const buildTransferTx = async (from: string, to: string, amount: number, mint: string) => {
    // Create connection
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);

    // Convert parameters to appropriate types
    const fromPubkey = new PublicKey(from);
    const toPubkey = new PublicKey(to);

    const instructions = [];

    if (mint === "So11111111111111111111111111111111111111112") {
        // Transfer native SOL
        instructions.push(
            SystemProgram.transfer({
                fromPubkey,
                toPubkey,
                lamports: amount * LAMPORTS_PER_SOL
            })
        );
    } else {
        // Transfer SPL token
        const mintPubkey = new PublicKey(mint);
        const fromAta = await getAssociatedTokenAddress(mintPubkey, fromPubkey);
        const toAta = await getAssociatedTokenAddress(mintPubkey, toPubkey);

        // Check if recipient's token account exists
        const toAtaInfo = await connection.getAccountInfo(toAta);
        if (!toAtaInfo) {
            instructions.push(
                createAssociatedTokenAccountInstruction(
                    fromPubkey, // payer
                    toAta, // ata
                    toPubkey, // owner
                    mintPubkey // mint
                )
            );
        }
        
        // Get mint info to determine decimals
        const mintInfo = await getMint(connection, mintPubkey);
        const adjustedAmount = amount * Math.pow(10, mintInfo.decimals);

        instructions.push(
            createTransferInstruction(
                fromAta,
                toAta,
                fromPubkey,
                adjustedAmount
            )
        );
    }

    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    
    // Create a message with the latest blockhash
    const message = new TransactionMessage({
        payerKey: fromPubkey,
        recentBlockhash: blockhash,
        instructions
    }).compileToV0Message();

    // Simulate transaction
    const simulation = await connection.simulateTransaction(new VersionedTransaction(message));
    
    // Check if simulation was successful
    if (simulation.value.err) {
        throw new Error(`Transaction simulation failed: ${JSON.stringify(simulation.value)}`);
    }

    // Return a VersionedTransaction
    return new VersionedTransaction(message);
}