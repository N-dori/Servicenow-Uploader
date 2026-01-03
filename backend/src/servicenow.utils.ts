import axios from "axios";
import { devConfig } from "./config/dev";

const SN_BASE = `https://${devConfig.instance}.service-now.com/api/now/table`;

export const snClient = axios.create({
  baseURL: SN_BASE,
  auth: { username: devConfig.user, password: devConfig.password },
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

export async function snUpdate(table:string , sysId:string, payload:any) {
  try {
    // ServiceNow uses PATCH for partial updates
    const response = await snClient.put(`/${table}/${sysId}`, payload);
    return response.data;
  } catch (error:string|any) {
    console.error("ServiceNow update error:", error.response?.data || error.message);
    throw error;
  }
}
