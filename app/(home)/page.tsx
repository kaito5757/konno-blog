import { allBlogs, Blog } from "contentlayer/generated";
import Link from "next/link";
import dayjs from "dayjs";
import { siteMetaData } from "@/contexts/meta-data";
import { Blogs } from "./blogs";

export default function Home() {
  const blogs = allBlogs.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            最新
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetaData.description}
          </p>
        </div>
        <Blogs blogs={blogs} />
      </div>
    </>
  );
}

function BlogCard(blog: Blog) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={blog.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {blog.title}
        </Link>
      </h2>
      <time dateTime={blog.date} className="mb-2 block text-xs text-gray-600">
        {dayjs(blog.date).format("YYYY/M/D")}
      </time>
      <div
        className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: blog.body.html }}
      />
    </div>
  );
}
