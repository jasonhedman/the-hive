'use client'

import React from 'react'
import { Loader2, Star } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Skeleton } from '@/components/ui'
import { useSaveToken } from '@/hooks'
import { cn } from '@/lib/utils'

interface Props {
    address: string
}

const SaveToken: React.FC<Props> = ({ address }) => {
    const pathname = usePathname();
    const { saveToken, deleteToken, isLoading, isUpdating, isTokenSaved } = useSaveToken(address);

    if(isLoading) {
        return (
            <Skeleton className="size-6" />
        )
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isUpdating) {
            return;
        }

        if (isTokenSaved) {
            await deleteToken();
            if (pathname === '/token') {
                const searchInput = document.querySelector('input[placeholder="Search tokens..."]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
            }
        } else {
            await saveToken();
        }
    }

    return (
        <div 
            onClick={handleClick}
            className={cn(
                "h-6 w-6 dark:hover:bg-neutral-700 hover:bg-neutral-200 rounded-md transition-all duration-300 flex items-center justify-center", 
                isUpdating && "pointer-events-none cursor-not-allowed opacity-50"
            )}
        >
            {
                isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Star className={cn("size-4", isTokenSaved && "text-brand-600")} />
                )
            }
        </div>
    )
}

export default SaveToken;