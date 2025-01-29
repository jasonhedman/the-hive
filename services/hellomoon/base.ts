import { BaseResponse } from "./types";

export const hellomoonPost = async <T>(
  endpoint: string,
  body: any
): Promise<T> => {
  const url = new URL(`https://rest-api.hellomoon.io/v0/${endpoint}`);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${process.env.HELLOMOON_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Hellomoon API error: ${response.status}`);
  }

  const data: BaseResponse<T> = await response.json();

  return data.data;
}