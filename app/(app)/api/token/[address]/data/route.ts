import { NextResponse } from "next/server";

import { getToken } from "@/db/services";

import { NextRequest } from "next/server";
import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { getPoolFromLpMint, raydiumAuthorityAddress } from "@/services/raydium";
import { Token } from "@/db/types";

interface Params {
    address: string;
}

export const GET = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
    const address = (await params).address;
    try {
        const tokenData = await getToken(address);
        if(tokenData) return NextResponse.json(tokenData);

        const mintData = await getMint(new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!), new PublicKey(address));

        if(mintData.mintAuthority?.toBase58() === raydiumAuthorityAddress) {
            const pool = await getPoolFromLpMint(address);
            if(!pool) return NextResponse.json(null);

            const lpTokenData: Token = {
                id: address,
                name: `${pool.mintA.symbol}/${pool.mintB.symbol}`,
                symbol: `${pool.mintA.symbol}/${pool.mintB.symbol}`,
                decimals: 6,
                tags: [],
                logoURI: "/dexes/raydium.png",
                mintAuthority: mintData.mintAuthority?.toBase58() || null,
                freezeAuthority: mintData.freezeAuthority?.toBase58() || null,
                permanentDelegate: null,
                extensions: {}
            }

            return NextResponse.json(lpTokenData);
        }

        return NextResponse.json(null, { status: 404 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(null, { status: 500 });
    }
}