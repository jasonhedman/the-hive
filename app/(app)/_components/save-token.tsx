'use client'

import React from 'react'

import { Loader2, Star } from 'lucide-react'

import { Button, Skeleton } from '@/components/ui'

import { useSaveToken } from '@/hooks'

import { cn } from '@/lib/utils'

interface Props {
    address: string;
}

const SaveToken: React.FC<Props> = ({ address }) => {

    const { saveToken, deleteToken, isLoading, isUpdating, isTokenSaved } = useSaveToken(address);

    if(isLoading) {
        return (
            <Skeleton className="size-6" />
        )
    }

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isUpdating) {
                    return;
                }

                if (isTokenSaved) {
                    deleteToken();
                } else {
                    saveToken();
                }
            }}
            disabled={isUpdating}
            className="h-6 w-6 dark:hover:bg-neutral-700"
        >
            {
                isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Star className={cn("size-4", isTokenSaved && "text-brand-600")} />
                )
            }
        </Button>
    )
}

export default SaveToken;