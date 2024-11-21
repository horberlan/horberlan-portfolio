import { h } from "vue";

export const MissingIconComponent = () => {
  const style = {
    p: `
    display: flex;
    flex-flow: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    `,
    span: `
    color: #ccc;
    font-size: 12px;
    `,
  };
  return h("p", { style: style.p }, [
    h("p", "Icon not provided"),
    h("span", { style: style.span }, "This is likely a new item"),
  ]);
};

export const LoadingIconComponent = ({
  label = "Loading",
}: {
  label: string;
}) => {
  return h("span", { class: "loading" }, label);
};

export const SkeletonBox = () => {
  return h("div", { class: "skeleton-box" });
};
