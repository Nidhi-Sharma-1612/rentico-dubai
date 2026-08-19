"use client";

import { useState, useTransition } from "react";
import { Copy, Images, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { deleteMedia, listMedia, uploadImage, type MediaItem } from "../upload-actions";
import EmptyState from "../EmptyState";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaGrid({ initialItems }: { initialItems: MediaItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const refresh = async () => setItems(await listMedia());

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Image uploaded.");
    await refresh();
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("URL copied.");
  };

  const handleDelete = (name: string) => {
    if (!confirm("Delete this image? This can't be undone, and any section still using it will break.")) return;
    startTransition(async () => {
      const result = await deleteMedia(name);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setItems((prev) => prev.filter((i) => i.name !== name));
      toast.success("Image deleted.");
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-navy-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-orange-300 hover:text-orange-600">
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
      </label>

      {items.length === 0 ? (
        <EmptyState icon={Images} label="No images uploaded yet." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col overflow-hidden rounded-xl border border-navy-900/8 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-navy-900/5"
            >
              <div className="relative aspect-4/3 w-full bg-navy-900/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <p className="truncate text-xs font-medium text-navy-900/60" title={item.name}>
                  {item.name}
                </p>
                <p className="text-[11px] text-navy-900/35">{formatSize(item.size)}</p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.url)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-900/10 py-1.5 text-xs font-semibold text-navy-900/70 transition-colors hover:border-orange-300 hover:text-orange-600"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy URL
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(item.name)}
                    aria-label="Delete image"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-navy-900/35 transition-colors hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
