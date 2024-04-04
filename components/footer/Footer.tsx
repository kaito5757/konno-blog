import { siteMetaData } from "@/contexts/meta-data";
import dayjs from "dayjs";
import Link from "next/link";
import { SocialIcon } from "../social-icons";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* ソーシャルアイコン */}
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href="https://github.com/kaito5757" />
          <SocialIcon kind="zenn" href="https://zenn.dev/kaito123" />
          <SocialIcon kind="qiita" href="https://qiita.com/kaito121855" />
        </div>
        {/* サイト情報 */}
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetaData.author}</div>
          <div>{" • "}</div>
          <div>{`© ${dayjs().year()}`}</div>
          <div>{" • "}</div>
          <Link href="/">{siteMetaData.title}</Link>
        </div>
      </div>
    </footer>
  );
}
