import Mail from "@lucide/astro/icons/mail";
import Globe from "@lucide/astro/icons/globe";
import Github from "./Github.astro";
import Linkedin from "./Linkedin.astro";

const map: Record<string, any> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
};

export function socialIcon(label: string) {
  return map[label.toLowerCase()] ?? Globe;
}
