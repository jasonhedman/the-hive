import React, { useEffect, useState, useRef, useMemo } from 'react'
import StarterButton from '../starter-buttons/starter-button';
import { useChat } from '@/app/(app)/chat/_contexts/chat';
import { Models } from '@/types/models';
import { Message as MessageType } from 'ai';

interface Suggestion {
    title: string;
    description: string;
    prompt: string;
    icon: "Plus";
}

const generateFollowUpSuggestions = async (context: string, model: Models) => {
    try {
        const response = await fetch('/api/follow-up-suggestions', {
            method: 'POST',
            body: JSON.stringify({
                context,
                modelName: model,
                timestamp: Date.now()
            }),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
        });
        
        return await response.json() as Suggestion[];
    } catch (error) {
        console.error("Error generating suggestions:", error);
        return [];
    }
}

const globalSuggestionsCache = new Map<string, Suggestion[]>();

const FollowUpSuggestions: React.FC<{ 
    messageId: string;
    previousMessage?: MessageType;
    currentMessage: MessageType;
}> = ({ messageId, previousMessage, currentMessage }) => {
    const { model, sendMessage, isResponseLoading, messages, chatId } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const requestTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastContextRef = useRef<string>('');
    
    useEffect(() => {
        const generateSuggestions = async () => {
            if (isResponseLoading || !currentMessage) return;
            if (currentMessage.role !== 'assistant') return;
            
            const cacheKey = `${chatId}-${messageId}`;
            const context = previousMessage 
                ? `User: ${previousMessage.content}\nBot: ${currentMessage.content}`
                : currentMessage.content;

            if (lastContextRef.current === `${chatId}-${context}`) return;
            lastContextRef.current = `${chatId}-${context}`;

            if (requestTimeoutRef.current) {
                clearTimeout(requestTimeoutRef.current);
            }

            setIsLoading(true);
            try {
                const newSuggestions = await generateFollowUpSuggestions(context, model);
                if (newSuggestions?.length > 0) {
                    globalSuggestionsCache.set(cacheKey, newSuggestions);
                }
            } catch (error) {
                console.error('Error generating suggestions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        generateSuggestions();

        return () => {
            if (requestTimeoutRef.current) {
                clearTimeout(requestTimeoutRef.current);
            }
        };
    }, [messageId, chatId, currentMessage.content, previousMessage?.content, model]);

    const currentSuggestions = globalSuggestionsCache.get(`${chatId}-${messageId}`) || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i} 
                        className="h-[72px] bg-gray-100 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (currentSuggestions.length === 0) return null;

    return (
        <div className="grid grid-cols-2 gap-2 mt-4">
            {currentSuggestions.map((suggestion) => (
                <StarterButton 
                    key={`${chatId}-${messageId}-${suggestion.title}`}
                    {...suggestion}
                    onClick={() => {
                        sendMessage(suggestion.prompt);
                        globalSuggestionsCache.delete(`${chatId}-${messageId}`);
                    }}
                />
            ))}
        </div>
    );
};

export default FollowUpSuggestions;