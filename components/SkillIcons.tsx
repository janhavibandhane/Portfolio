import type { IconType } from "react-icons";
import { SiExpress, SiJavascript, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

// Brand logo + brand colour, keyed by skill name in lib/data.ts.
// Next.js and Express are black marks, so they take white on this dark page.
export const skillIcons: Record<string, { Icon: IconType; color: string }> = {
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06b6d4" },
  "React.js": { Icon: SiReact, color: "#61dafb" },
  "Next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  JavaScript: { Icon: SiJavascript, color: "#f7df1e" },
  "React Native": { Icon: TbBrandReactNative, color: "#61dafb" },
  "Node.js": { Icon: SiNodedotjs, color: "#5fa04e" },
  "Express.js": { Icon: SiExpress, color: "#ffffff" },
  MongoDB: { Icon: SiMongodb, color: "#47a248" },
};
