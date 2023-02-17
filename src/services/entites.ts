import Axios from "axios";
const app = Axios;

export const searchOutFit = async (value) => {
  const { data } = await app.post("http://localhost:3000/api/projects", {
    ...value,
  });
  return data;
};
export const getProjects = async (param) => {
  // Object.keys(param).forEach(() => { filters.value[filterType] = values });
  const data = await app.get("http://localhost:3000/api/projects", {
    params: {
      ...param,
    },
  });
  return data;
};
export const getSnippet = async () => {
  const { data } = await app.get("http://localhost:3000/snippets");
  return data;
};
export const updateSnippet = async (snippet) => {
  const { data } = await app.put(
    `http://localhost:3004/snippets/${snippet.id}`,
    snippet
  );
  return data;
};
export const getContact = async () => {
  const { data } = await app.get(`http://localhost:3004/form`);
  return data;
};
export const postContact = async (form) => {
  await app.put("http://localhost:3004/form", form);
};
