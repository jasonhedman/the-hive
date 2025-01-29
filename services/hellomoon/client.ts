import { RestClient } from "@hellomoon/api"

const client = new RestClient(process.env.HELLOMOON_API_KEY!);

export default client;