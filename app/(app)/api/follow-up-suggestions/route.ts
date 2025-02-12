import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';
import { deepseek } from '@ai-sdk/deepseek';
import { Models } from "@/types/models";
import { generateText } from "ai";

interface Suggestion {
    title: string;
    description: string;
    prompt: string;
}

const DEFAULT_SUGGESTIONS = [
    {
        title: "Price Analysis",
        description: "Check latest price data",
        prompt: "Show me the current price and recent price changes"
    },
    {
        title: "Trading Volume",
        description: "View trading activity",
        prompt: "What's the current trading volume and activity?"
    },
    {
        title: "Holder Distribution",
        description: "See token distribution",
        prompt: "Show me the holder distribution"
    },
    {
        title: "Market Activity",
        description: "View market overview",
        prompt: "What's the overall market activity?"
    }
];

export async function POST(req: NextRequest) {
    try {
        const { context, modelName } = await req.json();

        let model;
        switch (modelName) {
            case Models.OpenAI:
                model = openai("gpt-4o-mini");
                break;
            case Models.Anthropic:
                model = anthropic("claude-3-5-sonnet-latest");
                break;
            case Models.XAI:
                model = xai("grok-beta");
                break;
            case Models.Gemini:
                model = google("gemini-2.0-flash-exp");
                break;
            case Models.Deepseek:
                model = deepseek("deepseek-chat");
                break;
            default:
                throw new Error("Invalid model");
        }

        const { text } = await generateText({
            model,
            prompt: `Based on this context: "${context}"

Generate exactly 4 relevant follow-up suggestions.

Return in this exact JSON format:
[
  {
    "title": "Clear Action Title",
    "description": "Very brief description",
    "prompt": "Clear question or command"
  }
]

Context types:
1. Specific token context: Generate ONLY suggestions based on the token's metrics, price, volume, distribution, etc.
2. Market context: Generate ONLY suggestions based on market trends, top gainers, top losers, etc.
3. Documentation context: Generate ONLY suggestions based on the documentation, tutorials, SDKs, etc.
4. Staking context: Generate ONLY suggestions based on the staking, rewards, etc.

Rules:
- Generate exactly 4 suggestions
- Keep titles short, concise and complete
- Keep descriptions short, concise and complete, no periods at the end, no more than 50 characters
- Make prompts clear and specific
- No markdown or code blocks`,
            temperature: 0.2,
            maxTokens: 200,
        });

        try {
            const cleanText = text.replace(/```json\n?|\n?```/g, '').replace(/\n/g, ' ').trim();
            const suggestions = JSON.parse(cleanText) as Suggestion[];
            
            if (!Array.isArray(suggestions) || suggestions.length !== 4 || 
                !suggestions.every(s => s.title && s.description && s.prompt)) {
                console.error("Invalid suggestions format:", cleanText);
                throw new Error("Invalid suggestions format");
            }

            const validSuggestions = suggestions.map(s => ({ 
                ...s, 
                icon: "Plus" as const,
                title: s.title,
                description: s.description
            }));
            
            return NextResponse.json(validSuggestions, {
                headers: {
                    'Cache-Control': 'private, max-age=60',
                }
            });
        } catch (parseError) {
            console.error("Failed to parse suggestions:", parseError, "Text:", text);
            return NextResponse.json(DEFAULT_SUGGESTIONS.map(s => ({ ...s, icon: "Plus" as const })));
        }
    } catch (error) {
        console.error("Error in follow-up suggestions:", error);
        return NextResponse.json(DEFAULT_SUGGESTIONS.map(s => ({ ...s, icon: "Plus" as const })));
    }
} 