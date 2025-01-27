import { LpToken } from "./lp-token";

export type LpPortfolio = {
    items: (LpToken & { valueUsd: number })[];
    totalUsd: number;
}