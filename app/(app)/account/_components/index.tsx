'use client'

import React from 'react'
import '@/components/utils/suppress-console'
import { usePrivy } from '@privy-io/react-auth';
import { Skeleton } from '@/components/ui';
import NotLoggedIn from './not-logged-in';
import AccountHeading from './heading';
import ConnectedAccounts from './connected-accounts';

const Account: React.FC = () => {

    const { user, ready } = usePrivy();

    if(!ready) return <Skeleton className="h-full w-full" />;

    if(!user) return <NotLoggedIn />;

    return (
        <div className="flex flex-col max-w-2xl mx-auto gap-4">
            <AccountHeading user={user} />
            <ConnectedAccounts user={user} />
        </div>
    )
}

export default Account