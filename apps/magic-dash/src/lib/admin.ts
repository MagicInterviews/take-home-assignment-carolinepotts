import { request } from "./request";

export type AdminData = {
  organizationName: string;
  teachers: Array<{
    id: string;
    name: string;
    active: boolean;
    organization_id: string;
  }>;
}

const defaultAdminData: AdminData = {
  organizationName: '',
  teachers: [],
};

export async function fetchAdminData() {
  const response = await request('api/admin');
  const data: AdminData = response.ok ? await response.json() : defaultAdminData;
  return { response, data };
}
