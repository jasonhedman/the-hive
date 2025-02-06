import "server-only";

import { add, del, find, get } from "./base";

import { getSavedTokensContainer } from "../containers/saved-tokens";

import { SavedToken } from "../types/saved-token";

// CREATE

/**
 * **DATABASE SERVICE**
 * 
 * Adds a new saved token to the database.
 * 
 * @param {SavedToken} token - The saved token data to be added.
 * @returns {Promise<SavedToken | null>} The newly created saved token or null if creation failed.
 */
export const addSavedToken = async (token: SavedToken): Promise<SavedToken | null> => {
    return add<SavedToken, SavedToken>(await getSavedTokensContainer(), token);
};

// READ

/**
 * **DATABASE SERVICE**
 * 
 * Retrieves a saved token by its ID.
 * 
 * @param {SavedToken["id"]} id - The ID of the saved token to retrieve.
 * @param {SavedToken["userId"]} userId - The ID of the user.
 * @returns {Promise<SavedToken | null>} The retrieved saved token or null if not found.
 */
export const getSavedToken = async (id: SavedToken["id"], userId: SavedToken["userId"]): Promise<SavedToken | null> => {
    return get(await getSavedTokensContainer(), id, userId);
};

/**
 * **DATABASE SERVICE**
 * 
 * Finds all saved tokens for a specific user.
 * 
 * @param {string} userId - The ID of the user.
 * @returns {Promise<SavedToken[]>} An array of saved tokens.
 */
export const findSavedTokensByUserId = async (userId: string): Promise<SavedToken[]> => {
    return find(
        await getSavedTokensContainer(),
        `SELECT * FROM c WHERE c.userId = @userId ORDER BY c._ts DESC`,
        [{ name: "@userId", value: userId }]
    );
};

// DELETE

/**
 * **DATABASE SERVICE**
 * 
 * Deletes a saved token from the database.
 * 
 * @param {SavedToken["id"]} id - The ID of the saved token to delete.
 * @param {SavedToken["userId"]} userId - The ID of the user.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteSavedToken = async (id: SavedToken["id"], userId: SavedToken["userId"]): Promise<boolean> => {
    return del(await getSavedTokensContainer(), id, userId);
};