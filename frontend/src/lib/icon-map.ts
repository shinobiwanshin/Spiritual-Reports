import {
  Star,
  BarChart3,
  Search,
  Briefcase,
  Heart,
  Wallet,
  CalendarDays,
  Map,
  Target,
  Lightbulb,
  Zap,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Star,
  BarChart3,
  Search,
  Briefcase,
  Heart,
  Wallet,
  CalendarDays,
  Map,
  Target,
  Lightbulb,
  Zap,
  Shield,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Star;
}
