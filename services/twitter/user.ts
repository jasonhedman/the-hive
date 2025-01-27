import { getTwitterClient } from "./client";

export const getUserByUsername = async (username: string) => {
    const twitterApi = getTwitterClient();
    const user = await twitterApi.v2.userByUsername(username, {
        "user.fields": ["profile_image_url", "name", "username"]
    });
    return user.data;
}

export const getUserById = async (id: string) => {
    const twitterApi = getTwitterClient();
    const user = await twitterApi.v2.user(id, {
        "user.fields": ["profile_image_url", "name", "username"]
    });
    return user.data;
}