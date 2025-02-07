'use client'

import React, { useState, useCallback } from 'react'
import { ChevronDown, Coins } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

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
import SaveToken from '@/app/(app)/_components/save-token';

const SavedTokensGroup: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { ready, user } = usePrivy();
    const { savedTokens, isLoading } = useSavedTokens();
    const [isOpen, setIsOpen] = useState(false);

    const handleTokenClick = useCallback((tokenId: string) => {
        router.push(`/token/${tokenId}`);
    }, [router]);

    const handleTokensClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            router.push('/token');
        }
    }, [router]);

    if (!ready || !user) return null;
    if (isLoading) return <Skeleton className="h-8 w-full" />;

    return (
        <Collapsible className="group/collapsible w-full" open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <SidebarMenuItem className="w-full">
                    <SidebarMenuButton 
                        className="w-full"
                        onClick={handleTokensClick}
                    >
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
                                    <SaveToken address={token.id} />
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