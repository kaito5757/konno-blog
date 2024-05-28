import type { Blog } from "contentlayer/generated";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  blogs: Blog[];
}

const MAX_DISPLAY = 5;

export function Blogs({ blogs }: Props) {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {blogs.slice(0, MAX_DISPLAY).map((blog) => {
        const { slug, date, title, summary, tags } = blog;
        return (
          <li key={slug} className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl className="grid-item col-span-1">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {dayjs(date).format("YYYY/MM/DD")}
                    </time>
                  </dd>
                </dl>
                <div className="grid-item col-span-3 space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap mt-1">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label={`Read more: "${title}"`}
                    >
                      続きを読む &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${text}`}
      className="mr-3 text-sm font-medium uppercase text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
    >
      {text.split(" ").join("-")}
    </Link>
  );
}
