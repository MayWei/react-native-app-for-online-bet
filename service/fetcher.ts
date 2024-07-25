import fetch, { RequestInitWithTimeout } from "react-native-fetch-polyfill";
export const DEFAULT_TIMEOUT = 60 * 1000;

export enum ResponseStatus {
  SUCCESS = 200,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}
/**
 * a fetcher
 * @param uri
 * @param method
 * @param body
 * @param options
 * @returns Promise<Response>
 */
export const makeJSONRequest = async <T>(
  uri: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: T,
  options?: Omit<RequestInitWithTimeout, "method" | "body">
): Promise<Response> => {
  const requestOptions: RequestInitWithTimeout = {
    timeout: DEFAULT_TIMEOUT,
    ...options,
  };

  const initHeaders: RequestInitWithTimeout["headers"] = {
    "Content-Type": "application/json",
    ...requestOptions?.headers,
  };

  const requestInit: RequestInitWithTimeout = {
    method,
    ...requestOptions,
    headers: initHeaders,
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }
  console.log("fetch", requestInit);
  const response = await fetch(`${uri}`, requestInit);
  console.log("fetch response", response);
  return response;
};
