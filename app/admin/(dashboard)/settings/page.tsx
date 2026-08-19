import { Settings as SettingsIcon } from "lucide-react";
import { getSiteSettings } from "@/lib/data/siteSettings";
import SettingsForm from "./SettingsForm";
import PageIcon from "../PageIcon";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PageIcon icon={SettingsIcon} />
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
          <p className="text-sm text-navy-900/55">
            Company contact details, logo and social links — used across the navbar, footer, contact page and
            WhatsApp links site-wide.
          </p>
        </div>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
