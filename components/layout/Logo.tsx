import Link from "next/link";
import Image from "next/image";

const DEFAULT_LOGO_URL =
  "https://static.wixstatic.com/media/b008a0_a30f9f33808d4e72b681d89f13c5c321~mv2.png/v1/fill/w_852,h_366,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design.png";

export default function Logo({ light = false, src }: { light?: boolean; src?: string }) {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={src || DEFAULT_LOGO_URL}
        alt="Rentico Vacation Homes Rental L.L.C."
        width={852}
        height={366}
        priority
        className={`h-11 w-auto object-contain sm:h-12 ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
