import { AddressType, KnownAddress } from "@/types/known-address";

export const knownAddresses: Record<string, KnownAddress> = {
    "A77HErqtfN1hLLpvZ9pCtu66FEtM8BveoaKbbMoZ4RiR": {
        name: "BitGet Exchange",
        logo: "/exchanges/bitget.png",
        type: AddressType.CentralizedExchange
    },
    "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1": {
        name: "Raydium",
        logo: "/dexes/raydium.png",
        type: AddressType.DecentralizedExchange
    },
    "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo": {
        name: "Meteora",
        logo: "/dexes/raydium.png",
        type: AddressType.DecentralizedExchange
    },
    "u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w": {
        name: "Gate.io",
        logo: "/exchanges/gate.png",
        type: AddressType.CentralizedExchange
    },
    "5PAhQiYdLBd6SVdjzBQDxUAEFyDdF5ExNPQfcscnPRj5": {
        name: "MEXC",
        logo: "/exchanges/mexc.png",
        type: AddressType.CentralizedExchange
    }
} as const;