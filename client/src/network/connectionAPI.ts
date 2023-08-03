import { callConnect, callGet } from "./calls";

export interface ActionData {
  error: { message: string; details: string | null; } | null ,
  success: { message: string; details: null; } | null 
}

export const connectionAPI = {
  connectToDatabase: ( host: string, user: string, password: string, database: string
    ) => callConnect("/connect", { data: { host ,user, password, database } }),
  
  disconnectFromDatabase: () => callGet("/disconnect"),
};