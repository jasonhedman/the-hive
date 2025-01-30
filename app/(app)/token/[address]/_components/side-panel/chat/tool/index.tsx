'use client'

import React from 'react'

import type { ToolInvocation } from 'ai'

interface Props {
    tool: ToolInvocation,
}

const Tool: React.FC<Props> = ({ tool }) => {
    return (
        <pre>{JSON.stringify(tool, null, 2)}</pre>
    )
}

export default Tool