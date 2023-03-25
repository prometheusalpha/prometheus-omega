import { parse } from "node-html-parser";

export const getOpenGraph = async (url: string): Promise<{
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}> => {
  return await fetch(url)
    .then((res) => res.text())
    .then((body) => {
      const doc = parse(body);
      const ogTitle = doc.querySelector("title")?.textContent || "Untitled";
      const ogDescription =
        doc
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ||
        doc
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content") ||
        "No description";
      const ogImage =
        doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content") || "";
      return {
        ogTitle,
        ogDescription,
        ogImage,
      };
    })
    .catch((err) => {
      return {
        ogTitle: "Untitled",
        ogDescription: "No description",
        ogImage: "",
      };
    });
};
