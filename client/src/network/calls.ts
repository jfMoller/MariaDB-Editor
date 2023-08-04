import axios from "axios";
import axiosInstance from "axios";

let baseURL = "http://localhost:8082";

export async function callGet(url: string) {
  let result = await axiosInstance.get(baseURL + url);
  return result.data;
}

export async function callPost(url: string, data: any) {
  let result = await axiosInstance.post(baseURL + url, data);
  return result.data;
}

export async function callPut(url: string, data: any) {
  return makeRequestWithActionData("PUT", baseURL + url, data);
}

export async function callDelete(url: string, data: any) {
  return makeRequestWithActionData("DELETE", baseURL + url, data);
}

export async function callConnect(url: string, data: any) {
  return makeRequestWithActionData("POST", baseURL + url, data);
}

async function makeRequestWithActionData(
  method: string, url: string, data: any
) {
  try {
    const result = await axios.request({
      method: method,
      url: url,
      data: data,
    });
    return parseActionData(async () => result);
  } catch (error: any) {
    return parseActionData(async () => Promise.reject(error));
  }
}

async function parseActionData(method: (...args: any[]) => Promise<any>) {
  try {
    const result = await method();
    return {
      success: { message: result.data.message, details: null },
      error: null,
      slug: result.data.slug
    };
  } catch (error: any) {
    return {
      success: null,
      error: {
        message: error.message,
        details: error.response?.data?.message || "Unknown error occurred",
      },
    };
  }
}
