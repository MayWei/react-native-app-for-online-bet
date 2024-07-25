import { AsyncKeyStore } from "./TokenStorage";
import { ResponseStatus, makeJSONRequest } from "./fetcher";

export const queryMeetings = async () => {
  const tokenstorage = AsyncKeyStore.getInstance();
  const token = await tokenstorage.get("token");
  console.log("token c ", token);
  if (!token) {
    throw new Error("user not logged in");
  }
  console.log("token", token, typeof token);
  const Response = await makeJSONRequest(
    "https://interview-api-beta.vercel.app/api/meetings",
    "GET",
    undefined,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("Response", Response);
  if (Response.status === ResponseStatus.SUCCESS) {
    const res = await Response.json();
    console.log("Response json", res);
    return res;
  } else {
    throw new Error("Login failed");
  }
};
