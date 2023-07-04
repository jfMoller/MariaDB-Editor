import { callGet, callPost } from "./API";

export const exampleAPI = {
  getTableData: (tableName: string) => callPost("/tables", { data: tableName }),
  getTableNames: () => callGet("/tables"),
};