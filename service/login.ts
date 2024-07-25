import { ResponseStatus, makeJSONRequest } from "./fetcher";
/**
 * login api request
 */
export const login = async () => {
  const Response = await makeJSONRequest(
    "https://interview-api-beta.vercel.app/api/login",
    "POST",
    { username: "brein", password: "helloworld" }
  );
  if (Response.status === ResponseStatus.SUCCESS) {
    const res = await Response.json();
    return res;
  } else {
    throw new Error("Login failed");
  }
};
