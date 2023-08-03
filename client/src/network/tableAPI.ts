import { callDelete, callGet, callPost, callPut } from "./calls";

export const tableAPI = {
  getTableNames: () => callGet("/tables"),

  getTableData: (tableName: string) => callPost("/tables", { data: tableName }),

  getRowData: (tableName: string, rowID: string) => callPost("/rows", { data: { tableName, rowID } }),

  editRowData: (tableName: string, editedData: object) => callPut("/rows/edit", { data: { tableName, editedData } }),
  
  deleteRowData: (tableName: string, rowID: string) => callDelete("/rows/delete", { data: { tableName, rowID } }),
};