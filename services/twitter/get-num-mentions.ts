import { getPostCount } from "./get-post-count";

export const getNumMentions = async (username: string) => {
    return await getPostCount(`@${username}`, 7);
}