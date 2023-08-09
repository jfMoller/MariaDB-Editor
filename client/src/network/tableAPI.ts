import { callDelete, callGet, callPost, callPut } from "./calls";

export interface TitleData {
  databaseTitle: string;
  tableTitles: string[];
  firstTable: string;
}

export const tableAPI = {
  getDatabaseAndTableTitles: () => callGet("/titles"),

  getTableData: (tableName: string) => callPost("/tables", { data: { tableName: tableName } }),

  getTableAsDDL: (databaseName: string, tableName: string) =>
  callPost("/tables/ddl", { data: { databaseName: databaseName, tableName: tableName } }),

  getRowData: (tableName: string, rowID: string) => callPost("/rows", { data: { tableName, rowID } }),

  editRowData: (tableName: string, editedData: object) => callPut("/rows", { data: { tableName, editedData } }),
  
  deleteRowData: (tableName: string, rowID: string) => callDelete("/rows", { data: { tableName, rowID } }),
};