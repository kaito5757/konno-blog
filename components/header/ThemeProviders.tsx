import { siteMetaData } from "@/contexts/meta-data";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProviders({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetaData.theme}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
