import { callConnect } from "./calls";

export const connectionAPI = {
  connectToDatabase: (host: string, user: string, password: string, database: string) => callConnect("/login", { data: { host ,user, password, database } }),
};