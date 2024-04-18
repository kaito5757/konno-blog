import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => `/blogs/${blog._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: "data", documentTypes: [Blog] });
