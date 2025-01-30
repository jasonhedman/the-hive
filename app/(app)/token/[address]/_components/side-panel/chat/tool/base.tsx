import React from 'react'

import { ChevronDown } from 'lucide-react'

import { 
    AnimatedShinyText, 
    Collapsible, 
    CollapsibleTrigger, 
    CollapsibleContent, 
} from '@/components/ui'

import { cn } from '@/lib/utils'

import type { ToolInvocation } from 'ai'
import type { BaseActionResult } from '@/ai'

interface Props<ActionResultBodyType, ActionArgsType> {
    tool: ToolInvocation,
    loadingText: string,
    result: {
        heading: (result: BaseActionResult<ActionResultBodyType>) => string,
        body: (result: BaseActionResult<ActionResultBodyType>) => React.ReactNode,
    },
    call?: {
        heading: string,
        body: (toolCallId: string, args: ActionArgsType) => React.ReactNode,
    },
    defaultOpen?: boolean,
    className?: string,
}

const BaseTool = <ActionResultBodyType, ActionArgsType>({ tool, loadingText, result, call, defaultOpen = true, className }: Props<ActionResultBodyType, ActionArgsType>) => {
    
    return (
        <div className={cn(
            "w-fit",
            className
        )}>
            {
                tool.state === "partial-call" ? (
                    <AnimatedShinyText
                        className="text-sm"
                    >
                        {loadingText}
                    </AnimatedShinyText>
                ) : (
                    tool.state === "call" ? (
                        call?.body 
                            ? (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{call.heading}</p>
                                    {call.body(tool.toolCallId, tool.args)}
                                </div>
                            ) 
                            : (
                                <AnimatedShinyText
                                    className="text-sm"
                                >
                                    {loadingText}
                                </AnimatedShinyText>
                            )
                    ) : (
                        <Collapsible defaultOpen={defaultOpen}>
                            <CollapsibleTrigger 
                                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:underline"
                            >
                                <p className="text-sm">{result.heading(tool.result)}</p>
                                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="text-sm pt-2">
                                {result.body(tool.result)}
                            </CollapsibleContent>
                        </Collapsible>
                    )
                )
            }
        </div>
    )
}

export default BaseTool