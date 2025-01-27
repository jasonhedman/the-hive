export interface TokenHolder {
    amount: string;
    decimals: number;
    mint: string;
    owner: string;
    token_account: string;
    ui_amount: number;
}

export interface TokenHoldersResponse {
    items: TokenHolder[];
} 