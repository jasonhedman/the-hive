export type KnownAddress = {
    name: string;
    logo: string;
    type: AddressType;
}

export enum AddressType {
    VestingVault = "Vesting Vault",
    DecentralizedExchange = "Decentralized Exchange",
    CentralizedExchange = "Centralized Exchange",
    EOA = "Externally Owned Account"
}