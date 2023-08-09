import { callQuery } from "./calls";

export const queryAPI = {
  executeQuery: (query: string) =>
    callQuery("/query", { data: { query: query } }),
};
