export enum PROJECT_TYPE {
  // EMPTY = "EMPTY",
  VUE = "VUE",
  REACT = "REACT",
  NODE = "NODE",
  VANILLA = "VANILLA",
  ALL = "ALL",
}
export type ProjectType = {
  _id: string;
  name: string;
  project_description: string;
  type: PROJECT_TYPE;
  background: string;
  href: string;
};
