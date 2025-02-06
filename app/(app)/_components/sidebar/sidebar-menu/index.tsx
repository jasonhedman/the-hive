'use client'

import React from 'react'

import { SidebarMenu as SidebarMenuUI } from '@/components/ui';

import ChatsGroup from './chats-group';
import AccountButton from './account-button';
import PortfolioButton from './portfolio-button';
import SavedTokensGroup from './saved-tokens-group';

const SidebarMenu: React.FC = () => {
    return (
        <SidebarMenuUI>
            <ChatsGroup />
            <SavedTokensGroup />
            <AccountButton />
            <PortfolioButton />
        </SidebarMenuUI>
    )
}

export default SidebarMenu;