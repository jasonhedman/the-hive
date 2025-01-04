export const SOLANA_GET_TOKEN_DATA_PROMPT = `Use this function to get data for a token and price chart for a given token.
The token data function requires a symbol, or a mint address.
If the user asks for your balance of a token with a symbol that is not SOL, and you do not have the token data, use this tool to get the token data and address.
If the user asks for your balance of a token with a mint address, you do not need to use this tool.
The token data will contain the address which is needed for other functions.`; 