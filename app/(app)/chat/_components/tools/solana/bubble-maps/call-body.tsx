'use client'

import React, { useEffect } from 'react'

import { BubbleMapsArgumentsType } from '@/ai'
import { useChat } from '@/app/(app)/chat/_contexts/chat'
import { Skeleton } from '@/components/ui'

interface Props {
    toolCallId: string,
    args: BubbleMapsArgumentsType
}

const BubbleMapsCallBody: React.FC<Props> = ({ toolCallId, args }) => {

    const { addToolResult } = useChat()

    useEffect(() => {
        const checkBubbleMaps = async () => {
            await fetch(`https://api-legacy.bubblemaps.io/map-availability?chain=sol&token=${args.contractAddress}`)
                .then(res => res.json())
                .then(data => {
                    if(data.status === "OK") {
                        if(data.availability == true) {
                            addToolResult(toolCallId, {
                                message: "Bubble Maps are available and shown to the user",
                                body: {
                                    success: true,
                                    message: "Bubble Maps are available and shown to the user",
                                },
                            })
                        } else {
                            addToolResult(toolCallId, {
                                message: "Bubble Maps are not available for this token",
                            })
                        }
                    } else {
                        addToolResult(toolCallId, {
                            message: data.message,
                            body: {
                                success: false,
                            },
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                    addToolResult(toolCallId, {
                        message: "Error fetching Bubble Maps",
                        body: {
                            success: false,
                            message: "Error fetching Bubble Maps",
                        },
                    })
                })
        }

        checkBubbleMaps()
    }, [args])


    return (
        <Skeleton className="h-10 w-full" />
    )
}

export default BubbleMapsCallBody