import { Images } from "lucide-react";
import { listMedia } from "../upload-actions";
import MediaGrid from "./MediaGrid";
import PageIcon from "../PageIcon";

export default async function AdminMediaPage() {
  const items = await listMedia();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PageIcon icon={Images} />
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Media library</h1>
          <p className="mt-1 text-sm text-navy-900/55">
            {items.length} image{items.length === 1 ? "" : "s"} uploaded across the site. Copy a URL to reuse it in
            any image field.
          </p>
        </div>
      </div>

      <MediaGrid initialItems={items} />
    </div>
  );
}
