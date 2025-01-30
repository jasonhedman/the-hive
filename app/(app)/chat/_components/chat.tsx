"use client"

import React from 'react'

import EmptyChat from './empty';
import Messages from './messages';
import ChatInput from './input';

import { useChat } from '../_contexts/chat';

const Chat: React.FC = () => {

    const { messages } = useChat();

    const cleanedMessages = messages.filter(message => message.role !== 'system');

    return (
        <>
            <div className="h-full w-full flex flex-col items-center relative">
                <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-4xl">
                    <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
                        {cleanedMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <EmptyChat />
                            </div>
                        ) : (
                            <>
                                <Messages 
                                    messages={cleanedMessages}
                                />
                                <ChatInput />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;