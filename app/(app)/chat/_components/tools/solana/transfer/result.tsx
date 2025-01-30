import React from 'react';
    
import type { SolanaTransferResultBodyType } from '@/ai';

interface Props {
    transferResult: SolanaTransferResultBodyType;
    amount: number;
    to: string;
}

const TransferResult: React.FC<Props> = ({ transferResult, amount, to }) => {

    return (
        <p className="text-xs text-muted-foreground">
            Transferred {amount} {transferResult.token} to {to}
        </p>
    );
};

export default TransferResult; 