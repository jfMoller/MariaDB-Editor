import { callGet } from "./API";

export const exampleAPI = {
  getExampleData: () => callGet("/example"),
};
