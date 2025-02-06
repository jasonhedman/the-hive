'use client'

import React, { useEffect } from 'react'

import { useLogin, usePrivy } from '@privy-io/react-auth';

import { useRouter } from 'next/navigation';

import { Button, Skeleton } from '@/components/ui';

const LoginButton: React.FC = () => {

    const router = useRouter();

    const { authenticated, ready } = usePrivy();

    const { login } = useLogin({
        onComplete: (_, __, wasAlreadyAuthenticated) => {
            if (!wasAlreadyAuthenticated) {
                router.replace('/chat');
            }
        }
    });

    useEffect(() => {
        if (authenticated) {
            router.replace('/chat');
        }
    }, [authenticated, router]);

    if (!ready || authenticated) return (
        <Skeleton className="w-24 h-10" />
    );

    return (
        <Button
            variant={'brand'}
            onClick={() => login()}
            disabled={authenticated}
            className="w-24 h-10"
        >
            Login
        </Button>
    )
}

export default LoginButton;