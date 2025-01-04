"use client";

import React, { useState } from 'react'

import { Button, Icon } from '@/components/ui';

interface Props {
    address: string;
}

const Address: React.FC<Props> = ({ address }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
                {`${address.slice(0, 4)}...${address.slice(-4)}`}
            </p>
            <Button 
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-4 w-4"
            >
                <Icon 
                    name={copied ? "Check" : "Copy"} 
                    className="w-3 h-3" 
                />
            </Button>
        </div>
    )
}

export default Address;