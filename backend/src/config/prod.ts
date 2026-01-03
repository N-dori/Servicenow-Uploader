interface SNConfig {
  instance: string;
  port: string;
  user: string;
  password: string;
  // demoDataTable?: string
}

const instance =  process.env.SN_INSTANCE ||"";
const user =  process.env.SN_USER || "";
const password =  process.env.SN_PASSWORD || "";

// const user =  "";
// const password =  "";
// const demoDataTable =  "";
const port =  process.env.PORT;

if (!instance) throw new Error("Environment variable SN_INSTANCE is not set");
if (!user) throw new Error("Environment variable SN_USER is not set");
if (!password) throw new Error("Environment variable SN_PASSWORD is not set");
if (!port) throw new Error("Environment variable PORT is not set");
export const devConfig: SNConfig = {
  port,
  instance,
  user,
  password,
  // user,
  // password,
  // demoDataTable
};
export default devConfig