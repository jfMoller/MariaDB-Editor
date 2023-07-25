import axios from "axios";

let baseURL = "http://localhost:8082";

export async function callGet(url: string) {
  let result = await axios.request({
    method: "GET",
    url: baseURL + url,
  });
  return result.data;
}

export async function callPost(url: string, data: any) {
  let result = await axios.request({
    method: "POST",
    url: baseURL + url,
    data: data,
  });
  return result.data;
}

export async function callPut(url: string, data: any) {
  let result = await axios.request({
    method: "PUT",
    url: baseURL + url,
    data: data,
  });
  return result.data;
}

export async function callDelete(url: string, data: any) {
  try {
    let result = await axios.request({
      method: "DELETE",
      url: baseURL + url,
      data: data,
    });
    return { success: { message: result.data.message, details: null }, error: null };
  } catch (error: any) {
    return {
      success: null,
      error: { message: error.message, details: error.response.data.message },
    };
  }
}
