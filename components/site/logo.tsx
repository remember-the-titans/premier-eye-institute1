import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export function Logo({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Premier Eye Institute — home"
      className={cn("inline-flex items-center", className)}
    >
      {/* The colored wordmark needs a light surface on dark sections. */}
      <span
        className={cn(
          "inline-flex items-center",
          dark && "rounded-md bg-white px-3 py-2"
        )}
      >
        {/* unoptimized images skip Next's loader, so basePath must be
            applied by hand for the Pages subpath */}
        <Image
          src={withBasePath("/logo.webp")}
          alt="Premier Eye Institute"
          width={300}
          height={80}
          priority={!dark}
          className="h-9 w-auto sm:h-10"
        />
      </span>
    </Link>
  );
}
