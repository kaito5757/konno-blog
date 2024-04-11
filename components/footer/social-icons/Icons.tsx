import Image from "next/image";

// 参考サイトからアイコン取得
// 参考サイト： https://simpleicons.org/
export const Icons = {
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

export type IconsType = keyof typeof Icons;
