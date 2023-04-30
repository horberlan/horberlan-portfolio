import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004/api",
});
const api2 = axios.create({
  baseURL: "http://localhost:3000",
});
export const searchOutFit = async (value) => {
  try {
    const { data } = await api.post("/projects", value);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProjects = async (param: Record<string, string>): Promise<any> => {
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
export { getProjects };
export const getSnippet = async () => {
  try {
    const { data } = await api.get("/snippet");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSnippet = async (snippet) => {
  try {
    const { data } = await api.put(`/snippet/${snippet.id}`, snippet);
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
    await api2.put("/form", form);
  } catch (error) {
    console.log(error);
  }
};
