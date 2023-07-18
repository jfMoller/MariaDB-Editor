import { callGet, callPost } from "./API";

export const tableAPI = {
  getTableNames: () => callGet("/tables"),
  getTableData: (tableName: string) => callPost("/tables", { data: tableName }),
  getRowData: (tableName: string, rowID: string) => callPost("/row", { data: { tableName, rowID } }),
};