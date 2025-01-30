import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { RegisterBasenameActionResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const RegisterBasename: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard
            tool={tool}
            loadingText="Registering Basename..."
            result={{
                heading: (result: RegisterBasenameActionResultType) => result.body 
                    ? "Basename Registered" 
                    : "Failed to register basename",
                body: (result: RegisterBasenameActionResultType) => result.body 
                    ? result.body.basename
                    : "No basename found"
            }}
        />
    )
}

export default RegisterBasename;