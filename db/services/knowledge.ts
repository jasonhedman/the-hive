import "server-only";

import { add, del, find, get, update } from "./base";

import { getKnowledgeContainer } from "../containers";

import { Knowledge, KnowledgeInput } from "../types";

import { PatchOperationType } from "@azure/cosmos";

// CREATE

/**
 * **DATABASE SERVICE**
 * 
 * Adds a new knowledge entry to the database.
 * 
 * @param {KnowledgeInput} knowledge - The knowledge data to be added.
 * @returns {Promise<Knowledge | null>} The newly created knowledge entry or null if creation failed.
 */
export const addKnowledge = async (knowledge: KnowledgeInput): Promise<Knowledge | null> => {
    return add<KnowledgeInput, Knowledge>(await getKnowledgeContainer(), knowledge);
};

// READ

/**
 * **DATABASE SERVICE**
 * 
 * Retrieves a knowledge entry by its ID and base URL.
 * 
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to retrieve.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @returns {Promise<Knowledge | null>} The retrieved knowledge entry or null if not found.
 */
export const getKnowledge = async (id: Knowledge["id"], baseUrl: Knowledge["baseUrl"]): Promise<Knowledge | null> => {
    return get(await getKnowledgeContainer(), id, baseUrl);
};

/**
 * **DATABASE SERVICE**
 * 
 * Finds all knowledge entries for a base URL.
 * 
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL to search for.
 * @returns {Promise<Knowledge[]>} An array of knowledge entries matching the criteria.
 */
export const findKnowledgeByBaseUrl = async (baseUrl: Knowledge["baseUrl"]): Promise<Knowledge[]> => {
    return find(
        await getKnowledgeContainer(),
        `SELECT * FROM c WHERE c.baseUrl = @baseUrl`,
        [{ name: "@baseUrl", value: baseUrl }]
    );
};

/**
 * **DATABASE SERVICE**
 * 
 * Finds relevant knowledge entries based on a vector query.
 * 
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL to search within.
 * @param {number[]} query - The vector query to find relevant knowledge entries.
 * @returns {Promise<(Knowledge & { distance: number })[]>} An array of knowledge entries with their distances to the query vector.
 */
export const findRelevantKnowledge = async (query: number[]): Promise<(Knowledge & { distance: number })[]> => {
    return find(
        await getKnowledgeContainer(),
        `SELECT TOP 10 c.id, c.summary, c.markdown, c.name, c.baseUrl, c.title, c.description, c.favicon, c.url, VectorDistance(c.summaryEmbedding, @query) AS distance
        FROM c 
        WHERE VectorDistance(c.summaryEmbedding, @query) > 0.65
        ORDER BY VectorDistance(c.summaryEmbedding, @query)`,
        [{ name: "@query", value: query }]
    );
};

/**
 * **DATABASE SERVICE**
 * 
 * Finds all knowledge entries for a URL.
 * 
 * @param {string} url - The URL to search for.
 * @returns {Promise<Knowledge[]>} An array of knowledge entries matching the criteria.
 */
export const findKnowledgeByUrl = async (url: string): Promise<Knowledge[]> => {
    return find(
        await getKnowledgeContainer(),
        `SELECT * FROM c WHERE c.url = @url`,
        [{ name: "@url", value: url }]
    );
};

// UPDATE

/**
 * **DATABASE SERVICE**
 * 
 * Updates a knowledge entry's markdown and embedding.
 * 
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to update.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @param {string} markdown - The new markdown content.
 * @param {number[]} markdownEmbedding - The new markdown embedding.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateKnowledgeContent = async (
    id: Knowledge["id"], 
    baseUrl: Knowledge["baseUrl"], 
    markdown: string,
    markdownEmbedding: number[]
): Promise<boolean> => {
    return update(
        await getKnowledgeContainer(),
        id,
        baseUrl,
        [
            { op: PatchOperationType.set, path: "/markdown", value: markdown },
            { op: PatchOperationType.set, path: "/markdownEmbedding", value: markdownEmbedding }
        ]
    );
};

// DELETE

/**
 * **DATABASE SERVICE**
 * 
 * Deletes a knowledge entry from the database.
 * 
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to delete.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteKnowledge = async (id: Knowledge["id"], baseUrl: Knowledge["baseUrl"]): Promise<boolean> => {
    return del(await getKnowledgeContainer(), id, baseUrl);
};
