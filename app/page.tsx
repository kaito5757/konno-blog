import { allBlogs, Blog } from "contentlayer/generated";
import Link from "next/link";
import dayjs from "dayjs";

function descTimeSort(a: Date, b: Date) {
  return a < b ? 1 : -1;
}

export default function Home() {
  const blogs = allBlogs.sort((a, b) =>
    descTimeSort(new Date(a.date), new Date(b.date))
  );
  console.log("ブログ", blogs);
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Next.js + Contentlayer Example
      </h1>
      {blogs.map((blog, idx) => (
        <BlogCard key={idx} {...blog} />
      ))}
    </div>
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
