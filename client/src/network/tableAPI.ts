import { callDelete, callGet, callPost, callPut } from "./calls";

export const tableAPI = {
  getDatabaseAndTableTitles: () => callGet("/titles"),

  getTableData: (tableName: string) => callPost("/tables", { data: tableName }),

  getRowData: (tableName: string, rowID: string) => callPost("/rows", { data: { tableName, rowID } }),

  editRowData: (tableName: string, editedData: object) => callPut("/rows", { data: { tableName, editedData } }),
  
  deleteRowData: (tableName: string, rowID: string) => callDelete("/rows", { data: { tableName, rowID } }),
};