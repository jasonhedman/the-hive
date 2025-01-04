import { NextRequest } from "next/server";

import { Connection } from "@solana/web3.js";
import { TwitterApi } from "twitter-api-v2";

import { streamText } from "ai";

import { openai } from "@ai-sdk/openai";

import { solanaTools, twitterTools } from "@/ai";

export const POST = async (req: NextRequest) => {

    const { messages } = await req.json();

    const result = streamText({
        model: openai("gpt-4o-mini"),
        tools: {
            ...solanaTools(new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
            ...twitterTools(new TwitterApi(process.env.TWITTER_BEARER_TOKEN!))
        },
        messages,
        system: "You are a swarm of helpful blockchain agents called The Hive. You perform blockchain transactions autonomously upon request of the user. You can use tools to perform transactions. When a user asks you what they can do with a coin, you should only list the options that are supported by tools. Do not talk about anything but blockchains.",
    });

    return result.toDataStreamResponse();
}