import { makeJSONRequest } from "./fetcher";

enum ResponseStatus {
  SUCCESS = 200,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export const login = async () => {
  const Response = await makeJSONRequest(
    "https://interview-api-beta.vercel.app/api/login",
    "POST"
  );
  if (Response.status === ResponseStatus.SUCCESS) {
    const res = await Response.json();
    return res;
  } else {
    throw new Error("Login failed");
  }
};
