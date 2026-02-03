import { request } from "./request";

export type ToolsData = {
  teacherName: string;
  organizationName: string;
  teacherActive: boolean;
  tools: Array<{
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string | null;
    teacher_tools: Array<{
      disabled: boolean | null;
      teacher_id: string | null;
    }> | null;
  }>;
}

const defaultToolsData: ToolsData = {
  teacherName: '',
  organizationName: '',
  teacherActive: true,
  tools: [],
};

export async function fetchToolsData() {
  const response = await request('api/tools');
  const data: ToolsData = response.ok ? await response.json() : defaultToolsData;
  return { response, data };
}
