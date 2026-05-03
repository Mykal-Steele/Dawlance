import Link from "next/link";

export function Header(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary transition-colors hover:text-primary/80"
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-heading">Dawlance Travel</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/about"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-neutral-100 hover:text-primary md:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

