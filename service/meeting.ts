import { AsyncKeyStore } from "./TokenStorage";
import { ResponseStatus, makeJSONRequest } from "./fetcher";

/**
 * meeting api request
 */

export const queryMeetings = async () => {
  const tokenstorage = AsyncKeyStore.getInstance();
  const token = await tokenstorage.get("token");
  if (!token) {
    throw new Error("user not logged in");
  }
  const Response = await makeJSONRequest(
    "https://interview-api-beta.vercel.app/api/meetings",
    "GET",
    undefined,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (Response.status === ResponseStatus.SUCCESS) {
    const res = await Response.json();
    return res;
  } else {
    throw new Error("Login failed");
  }
};
