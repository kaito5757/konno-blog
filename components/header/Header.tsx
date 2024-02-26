import Link from "next/link";
import Image from "next/image";
import { siteMetaData } from "@/contexts/metadata";
import { headerNavLinks } from "@/contexts/headerNavLinks";

interface Props {}

export const Header = (prpos: Props) => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src="/logo.svg" alt="logo" />
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetaData.headerTitle}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
      </div>
    </header>
  );
};
