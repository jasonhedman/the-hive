'use client'

import React from 'react'

import { TopHolders } from './tools';

import { SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME } from '@/ai/action-names';

import type { ToolInvocation } from 'ai'

interface Props {
    tool: ToolInvocation,
}

const Tool: React.FC<Props> = ({ tool }) => {

    switch (tool.toolName) {
        case SOLANA_TOKEN_PAGE_TOP_HOLDERS_NAME:
            return <TopHolders tool={tool} />;
        default:
            return <pre>{JSON.stringify(tool, null, 2)}</pre>;
    }
}

export default Tool