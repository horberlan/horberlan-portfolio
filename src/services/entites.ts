import { PROJECT_TYPE } from "@/utils/enums/project";
import axios from "axios";

export interface Project {
  _id: string;
  name: string;
  project_description: string;
  background: string;
  href: string;
  type: PROJECT_TYPE;
}
export interface Snippet {
  _id: string;
  name: string;
  updated_date: string;
  snippet: string;
  details: string;
  stars: number;
  avatar_url: string;
}

export interface FormMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getProjects = async (param: Array<String>): Promise<Project[]> => {
  try {
    const { data } = await api.get(
      `/projects?type=${
        param.length ? Object.values(param).join(";") : PROJECT_TYPE.ALL
      }`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSnippet = async () => {
  try {
    const { data } = await api.get("/snippets");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSnippetStars = async (
  snippet: Snippet
): Promise<Snippet | undefined> => {
  try {
    const { data } = await api.patch(`/snippets/${snippet._id}/stars`, {
      stars: snippet.stars,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContact = async () => {
  try {
    const { data } = await api.get("/form");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postContact = async (form: FormMessage) => {
  try {
    await api.post("/form", form);
  } catch (error) {
    console.log(error);
  }
};
