import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="eyebrow eyebrow-centered mb-4 justify-center">
        Out of focus
      </p>
      <h1 className="font-heading text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] text-ink">
        This page needs a{" "}
        <em className="italic text-accent">new prescription</em>.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-body-text">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
        Let&apos;s get you back to something clear.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white shadow-cta transition-all duration-250 hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Back to the homepage
      </Link>
    </section>
  );
}
