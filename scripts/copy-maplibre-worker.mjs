// MapLibre's web worker can't be bundled reliably by Next (the map fails with
// "Worker failed to load"), so it's served as a static file instead and
// components/shared/VectorBasemap.tsx points MapLibre at it via
// setWorkerUrl(). Copying it from node_modules on every install keeps it
// version-matched to the installed maplibre-gl (runs on postinstall). The copies
// in public/ are also committed so a deploy that skips install scripts still
// serves them — if maplibre-gl is upgraded, commit the refreshed files too.
import { copyFileSync, mkdirSync } from "node:fs";

// The ES-module worker imports its shared code from a sibling file, so both
// must sit side by side.
const FILES = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

mkdirSync("public", { recursive: true });
for (const file of FILES) copyFileSync(`node_modules/maplibre-gl/dist/${file}`, `public/${file}`);
console.log(`Copied ${FILES.join(", ")} to public/`);
