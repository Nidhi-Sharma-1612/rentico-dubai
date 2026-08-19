import { draftMode } from "next/headers";
import { Eye } from "lucide-react";

export default async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-navy-950 px-4 py-2.5 text-sm text-white">
      <Eye className="h-4 w-4 text-orange-400" />
      <span>Previewing draft content — this isn&apos;t visible to site visitors yet.</span>
      <form action="/api/draft/disable" method="POST">
        <button type="submit" className="font-semibold text-orange-400 underline hover:text-orange-300">
          Exit preview
        </button>
      </form>
    </div>
  );
}
