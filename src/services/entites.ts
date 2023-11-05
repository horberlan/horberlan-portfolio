import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getProjects = async (
  param: Record<string, string>
): Promise<any> => {
  try {
    const { data } = await api.get(
      `/projects?type=${Object.values(param).join(";") ?? ""}`
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

export const updateSnippet = async (snippet) => {
  try {
    const { data } = await api.put(`/snippets/${snippet.id}`, snippet);
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

export const postContact = async (form) => {
  try {
    await api.post("/form", form);
  } catch (error) {
    console.log(error);
  }
};
