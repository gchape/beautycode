import { Droplet, Smile, Sparkles, Wind } from "lucide-react";
import type { CategoryIcon } from "../data/labels.ts";
export const categoryIcons = {
	wind: Wind,
	sparkles: Sparkles,
	droplet: Droplet,
	smile: Smile,
} satisfies Record<CategoryIcon, typeof Wind>;
