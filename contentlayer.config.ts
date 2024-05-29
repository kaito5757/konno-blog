import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { siteMetaData } from "./contexts/meta-data";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    release: { type: "boolean" },
    summary: { type: "string" },
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
  }
}));

export default makeSource({ contentDirPath: "data", documentTypes: [Blog] });
