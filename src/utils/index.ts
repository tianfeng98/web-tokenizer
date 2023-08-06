import { join } from "path-browserify";

export const joinUrl = (base: string, ...paths: string[]) => {
  if (base.startsWith("http")) {
    const url = new URL(base);
    url.pathname = join(url.pathname, ...paths);
    return url.toString();
  }
  return join(base, ...paths);
};
