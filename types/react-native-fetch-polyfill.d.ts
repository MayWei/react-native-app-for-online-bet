declare module "react-native-fetch-polyfill" {
  import { RequestInit, Response } from "node-fetch";

  export interface RequestInitWithTimeout extends RequestInit {
    timeout?: number;
    headers?: any;
    method?: any;
    body?: any;
  }

  export default function fetch(
    url: string,
    init?: RequestInitWithTimeout
  ): Promise<Response>;
}
