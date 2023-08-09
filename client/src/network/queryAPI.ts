import { callPost } from "./calls";

export const queryAPI = {
  getTableDDL: (databaseName: string, tableName: string) =>
    callPost("/query", { data: { databaseName: databaseName, tableName: tableName } }),
};
