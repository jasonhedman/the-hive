import { getContainer } from "@/db/containers/utils";

import { Container } from "@azure/cosmos";

import { SavedToken } from "../types";

export const SAVED_TOKENS_CONTAINER_ID = "saved-tokens";

let savedTokensContainer: Container;

export const getSavedTokensContainer = async () => {
    if (!savedTokensContainer) savedTokensContainer = await getContainer<SavedToken>(SAVED_TOKENS_CONTAINER_ID, "userId")
    return savedTokensContainer;
};