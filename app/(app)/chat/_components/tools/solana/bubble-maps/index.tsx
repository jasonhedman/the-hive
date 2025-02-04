import React from 'react';


import ToolCard from '../../tool-card';

import BubbleMapsCallBody from './call-body';
import BubbleMapsResult from './result';

import type { BubbleMapsResultType, BubbleMapsArgumentsType } from '@/ai';
import type { ToolInvocation } from 'ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const BubbleMaps: React.FC<Props> = ({ tool, prevToolAgent }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText="Staking..."
            result={{
                heading: (result: BubbleMapsResultType) => result.body 
                    ? "Bubble Maps Complete"
                    : "Failed to Get Bubble Maps",
                body: (result: BubbleMapsResultType) => result.body && result.body.success
                    ? <BubbleMapsResult contractAddress={tool.args.contractAddress} />
                    : result.message
            }}
            call={{
                heading: "Get Bubble Maps",
                body: (toolCallId: string, args: BubbleMapsArgumentsType) => (
                    <BubbleMapsCallBody toolCallId={toolCallId} args={args} />
                )
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
        />
    );
};

export default BubbleMaps; 