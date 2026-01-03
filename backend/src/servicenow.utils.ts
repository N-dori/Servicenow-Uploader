import axios from "axios";
import { devConfig } from "./config/dev";

const _getInstanceUrl = (name: string) => {
  const SN_BASE = `https://${name}.service-now.com/api/now/table`;
  return SN_BASE
} 

export const snClient = axios.create({
  baseURL: _getInstanceUrl(''),
  auth: { username: '', password: '' },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function snInsert(table: string, payload: any) {
  try {
    const response = await snClient.post(`/${table}`, payload);
    return response.data; // ServiceNow returns the created record
  } catch (error: any) {
    console.error("ServiceNow insert error:", error.response?.data || error.message);
    throw error;
  }
}
