// write a function that takes in a url and returns the open graph data

export const getOpenGraph = async (url: string): Promise<{
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}> => {
  return await fetch(url)
    .then((res) => res.text())
    .then((body) => {
      // beautiful soup
      const parser = new DOMParser();
      const doc = parser.parseFromString(body, "text/html");
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
      console.log(err);
      return {
        ogTitle: "Untitled",
        ogDescription: "No description",
        ogImage: "",
      };
    });
};
