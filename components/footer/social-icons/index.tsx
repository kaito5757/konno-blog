import { Icons, IconsType } from "./Icons";

interface Props {
  kind: IconsType;
  href?: string;
}

export const SocialIcon = ({ kind, href }: Props) => {
  const Svg = Icons[kind];
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <Svg className="h-6 w-6 pt-1 fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400" />
    </a>
  );
};
