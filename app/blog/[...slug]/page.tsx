import { getBlog } from "@/utils/blog";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MdxBody } from "./MdxBody";

interface Props {
  params: {
    slug: string[]
  }
}

export default function Page({ params }: Props) {
  const slug = decodeURI(params.slug.join('/'));
  const { blog, blogIndex } = getBlog(slug);

  return (
    <div className="prose dark:prose-invert">
      <MdxBody code={blog.body.code} />
    </div>
  )
}