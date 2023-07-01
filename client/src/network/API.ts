import axios from "axios";

let baseURL = "http://localhost:8082";

export async function callGet(url: string) {
  console.log(baseURL + url)
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
    withCredentials: true,
    data: data,
  });
  return result.data;
}

export async function callPut(url: string, data: any) {
  let result = await axios.request({
    method: 'PUT',
    url: url,
    data: data,
  });
  return result.data;
}

export async function callDelete(url: string, data: any) {
  let result = await axios.request({
    method: 'DELETE',
    url: url,
    data: data,
  });
  return result.data;
}