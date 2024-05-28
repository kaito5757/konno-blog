import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    draft: { type: "boolean" },
    summary: { type: "string" },
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => `/blogs/${blog._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: "data", documentTypes: [Blog] });
