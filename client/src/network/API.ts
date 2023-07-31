import { callPost } from "./calls";

export const API = {
  login: (host: string, user: string, password: string, database: string) => callPost("/login", { data: { host ,user, password, database } }),
};