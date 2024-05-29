"use client";

import Link from "next/link";

interface Prpps {
  text: string;
}

export function Tag({ text }: Prpps) {
  return (
    <Link
      href={`/tags/${text}`}
      className="mr-3 text-sm font-medium uppercase text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
    >
      {text.split(" ").join("-")}
    </Link>
  );
}
