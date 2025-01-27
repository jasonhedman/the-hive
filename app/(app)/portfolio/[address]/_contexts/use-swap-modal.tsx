"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

import Swap from '@/app/_components/swap';

import type { Token } from '@/db/types'

interface SwapModalContextType {
    isOpen: boolean;
    openSell: (tokenAddress: string) => Promise<void>;
    openBuy: (tokenAddress: string) => Promise<void>;
    inputToken: Token | null;
    outputToken: Token | null;
    setInputToken: (token: Token) => void;
    setOutputToken: (token: Token) => void;
}

const SwapModalContextType = createContext<SwapModalContextType>({
    isOpen: false,
    openSell: async () => {},
    openBuy: async () => {},
    inputToken: null,
    outputToken: null,
    setInputToken: () => {},
    setOutputToken: () => {}
});

export const SwapModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [inputToken, setInputToken] = useState<Token | null>(null);
    const [outputToken, setOutputToken] = useState<Token | null>(null);

    const openSell = async (tokenAddress: string) => {
        const token = await fetch(`/api/token/${tokenAddress}/data`).then(res => res.json());
        if(!token) return;
        setInputToken(token);
        setOutputToken(null);
        setIsOpen(true);
    }

    const openBuy = async (tokenAddress: string) => {
        const token = await fetch(`/api/token/${tokenAddress}/data`).then(res => res.json());
        if(!token) return;
        setInputToken(null);
        setOutputToken(token);
        setIsOpen(true);
    }

    return (
        <SwapModalContextType.Provider value={{ 
            isOpen, 
            openSell, 
            openBuy, 
            inputToken, 
            outputToken, 
            setInputToken, 
            setOutputToken 
        }}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-fit">
                    <DialogHeader>
                        <DialogTitle>
                            Swap
                        </DialogTitle>
                    </DialogHeader>
                    <Swap 
                        initialInputToken={inputToken}
                        initialOutputToken={outputToken}
                        inputLabel="From"
                        outputLabel="To"
                        onSuccess={() => setIsOpen(false)}
                        onCancel={() => setIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>
            {children}
        </SwapModalContextType.Provider>
    );
};

export const useSwapModal = () => useContext(SwapModalContextType);