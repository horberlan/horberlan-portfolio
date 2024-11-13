function uniqBy<T, K extends keyof T | ((item: T) => string | number | symbol)>(
  array: T[],
  key: K
): T[] {
  const seen: Record<string | number | symbol, boolean> = {};

  return array.filter((item: T) => {
    let keyValue: string | number | symbol =
      typeof key === "function" ? key(item) : item[key as keyof T];

    if (!seen[keyValue]) {
      seen[keyValue] = true;
      return true;
    }

    return false;
  });
}
export { uniqBy };
