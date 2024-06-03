import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";

export function getSortedAllBlog() {
  return allBlogs
    .filter((b) => b.release)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getBlog(slug: string) {
  const blog = allBlogs.find((b) => b.slug === slug);
  const blogIndex = allBlogs.findIndex((b) => b.slug === slug);
  return blog && blogIndex >= 0 ? { blog, blogIndex } : notFound();
}
