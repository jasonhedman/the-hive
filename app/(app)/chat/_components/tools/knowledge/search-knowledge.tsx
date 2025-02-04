import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { SearchKnowledgeResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const SearchKnowledge: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Searching Knowledge...`}
            result={{
                heading: (result: SearchKnowledgeResultType) => result.body?.knowledge 
                    ? `Searched knowledge base` 
                    : `Failed to fetch knowledge`,
                body: (result: SearchKnowledgeResultType) => result.body 
                    ? `Included the top ${result.body.knowledge.length} pages in context.`
                    :  "No knowledge found"
            }}
            defaultOpen={false}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default SearchKnowledge;