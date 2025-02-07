'use client'

import React, { useState, useCallback } from 'react'
import { ChevronDown, Coins, Star, Loader2 } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { usePathname, useRouter } from 'next/navigation';

import { 
    Badge,
    SidebarMenuItem, 
    SidebarMenuButton,
    Skeleton,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/ui';

import { useSavedTokens } from '@/hooks';

const SavedTokensGroup: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { ready, user, getAccessToken } = usePrivy();
    const { savedTokens, isLoading, mutate: mutateSavedTokens } = useSavedTokens();
    const [isOpen, setIsOpen] = useState(false);
    const [updatingTokenId, setUpdatingTokenId] = useState<string | null>(null);

    const handleDeleteToken = useCallback(async (tokenId: string) => {
        if (updatingTokenId) return;
        setUpdatingTokenId(tokenId);
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) throw new Error("Not authenticated");

            await fetch(`/api/saved-tokens/${tokenId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            mutateSavedTokens();
            
            router.push('/token?focus=search');
        } finally {
            setUpdatingTokenId(null);
        }
    }, [updatingTokenId, getAccessToken, mutateSavedTokens, router]);

    const handleTokenClick = useCallback((tokenId: string) => {
        router.push(`/token/${tokenId}`);
    }, [router]);

    if (!ready || !user) return null;
    if (isLoading) return <Skeleton className="h-8 w-full" />;

    return (
        <Collapsible className="group/collapsible w-full" open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <SidebarMenuItem className="w-full">
                    <SidebarMenuButton className="w-full">
                        <Coins className="h-4 w-4" />
                        <span>Tokens</span>
                        <div className="ml-auto flex items-center gap-2">
                            {savedTokens.length > 0 && (
                                <Badge variant="outline">
                                    {savedTokens.length}
                                </Badge>
                            )}
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </CollapsibleTrigger>
            {savedTokens.length > 0 && (
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {savedTokens.map((token) => (
                            <SidebarMenuSubItem key={token.id}>
                                <SidebarMenuSubButton
                                    onClick={() => handleTokenClick(token.id)}
                                    isActive={pathname === `/token/${token.id}`}
                                    className="w-full justify-start gap-2 group"
                                >
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteToken(token.id);
                                        }}
                                        className="h-4 w-4 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                                    >
                                        {updatingTokenId === token.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Star className="h-4 w-4 text-brand-600" fill="currentColor" />
                                        )}
                                    </div>
                                    <span className="truncate">{token.symbol}</span>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}

export default SavedTokensGroup;