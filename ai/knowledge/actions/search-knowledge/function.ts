import { findRelevantKnowledge } from "@/db/services/knowledge";

import type { SearchKnowledgeArgumentsType, SearchKnowledgeResultType } from "./types";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

export const searchKnowledgeFunction = async (args: SearchKnowledgeArgumentsType): Promise<SearchKnowledgeResultType> => {

    const knowledge = await Promise.all(args.queryPhrases.map(async (phrase) => {
        const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: phrase,
        });

        const knowledge = await findRelevantKnowledge(embedding);

        console.log(knowledge.map(k => k.distance));

        return knowledge
    }));


    return {
        message: "Knowledge search successful. Give an answer to the user's prompt and include direct links to any relevant pages.",
        body: {
            knowledge: knowledge.flat(),
        },
    };
};