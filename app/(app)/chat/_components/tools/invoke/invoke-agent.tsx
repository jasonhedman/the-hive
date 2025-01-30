import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { InvokeAgentResultType } from '@/ai/invoke';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const InvokeAgent: React.FC<Props> = ({ tool, prevToolAgent }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Invoking Agent...`}
            result={{
                heading: (result: InvokeAgentResultType) => result.body 
                    ? `Invoked ${tool.args.agent}` 
                    : `Failed to invoke agent`,
                body: (result: InvokeAgentResultType) => result.body 
                    ? result.body.message
                    : "Failed to invoke agent"
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default InvokeAgent;