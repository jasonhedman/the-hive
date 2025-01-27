import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round(value: number, decimals: number) {
    return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
    return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push([]);
        acc[acc.length - 1].push(array[i]);
        return acc;
    }, [] as T[][]);
}