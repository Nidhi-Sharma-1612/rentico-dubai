import {
  ArrowRight,
  BadgeDollarSign,
  Bath,
  BedDouble,
  Calendar,
  CalendarOff,
  Car,
  Clock,
  Coffee,
  Eye,
  FileBarChart,
  FileText,
  Gift,
  Handshake,
  Headset,
  KeyRound,
  Layers,
  LineChart,
  Lock,
  MapPinned,
  MessageCircle,
  Monitor,
  PiggyBank,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Wallet,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/shared/SocialIcons";

type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

/**
 * Content stored in the DB references icons by name (a plain string can't
 * hold a component reference), so every icon-bearing array in the admin CMS
 * resolves through this map. Keep it in sync with whatever icon names the
 * admin's icon picker offers.
 */
export const ICONS: Record<string, IconComponent> = {
  ArrowRight,
  BadgeDollarSign,
  Bath,
  BedDouble,
  Calendar,
  CalendarOff,
  Car,
  Clock,
  Coffee,
  Eye,
  FileBarChart,
  FileText,
  Gift,
  Handshake,
  Headset,
  KeyRound,
  Layers,
  LineChart,
  Lock,
  MapPinned,
  MessageCircle,
  Monitor,
  PiggyBank,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Wallet,
  Wifi,
  Wrench,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  TikTok: TikTokIcon,
};

export type IconName = keyof typeof ICONS;

export function resolveIcon(name: string): IconComponent {
  return ICONS[name] ?? ShieldCheck;
}
