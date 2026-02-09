import { request } from "./request";

export type ToolItem = {
  id: string;
  name: string;
  description: string | null;
  grade_levels: string[] | null;
  created_at: string;
  updated_at: string | null;
  teacher_tools: Array<{
    disabled: boolean | null;
    teacher_id: string | null;
  }> | null;
};

export type ToolsData = {
  teacherName: string;
  organizationName: string;
  teacherActive: boolean;
  tools: ToolItem[];
};

const defaultToolsData: ToolsData = {
  teacherName: "",
  organizationName: "",
  teacherActive: true,
  tools: [],
};

export async function fetchToolsData() {
  const response = await request("api/tools");
  const data: ToolsData = response.ok ? await response.json() : defaultToolsData;
  return { response, data };
}
