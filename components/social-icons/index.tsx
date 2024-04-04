import Image from "next/image";

// 参考サイトからアイコン取得
// 参考サイト： https://simpleicons.org/
const components = {
  github: (
    <Image
      src="/icons/github.svg"
      height={20}
      width={20}
      alt="github"
      className="my-[3px]"
    />
  ),
  zenn: (
    <Image
      src="/icons/zenn.svg"
      height={20}
      width={20}
      alt="zenn"
      className="my-[3px]"
    />
  ),
  qiita: <Image src="/icons/qiita.svg" height={26} width={26} alt="qiita" />,
};

interface Props {
  kind: keyof typeof components;
  href?: string;
}

export const SocialIcon = ({ kind, href }: Props) => {
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <div className="fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400">
        {components[kind]}
      </div>
    </a>
  );
};
