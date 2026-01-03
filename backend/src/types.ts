export interface Config {
  dbURL: string;
  dbName: string;
}

export type DemoRecord = {
  sys_created_on: Date;
  short_description: string;
  assigned_to: string;
  state:
    | "New"
    | "Opend"
    | "CAPA Plan"
    | "Pannding Approval"
    | "Opedned"
    | "Supervisor Review"
    | "Closed - Done"
    | "Root Cause Analysis";
  opend_by: string;
  due_date: Date;
};