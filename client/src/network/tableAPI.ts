import { callGet, callPost } from "./API";

export const tableAPI = {
  getTableData: (tableName: string) => callPost("/tables", { data: tableName }),
  getTableNames: () => callGet("/tables"),
};