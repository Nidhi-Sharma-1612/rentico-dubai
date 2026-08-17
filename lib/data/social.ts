import { ComponentType } from "react";
import { MessageCircle } from "lucide-react";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/shared/SocialIcons";

// Social hrefs live in site_settings (admin-editable); the platform set
// itself — and which icon renders for each — is fixed in code.
export const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  WhatsApp: MessageCircle,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  TikTok: TikTokIcon,
};
