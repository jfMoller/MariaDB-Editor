import { callConnect, callGet } from "./calls";

export const connectionAPI = {
  connectToDatabase: (host: string, user: string, password: string, database: string) => callConnect("/connect", { data: { host ,user, password, database } }),
  disconnectFromDatabase: () => callGet("/disconnect"),
};