import Link from "next/link";
import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const items = [
  {
    label: "Work",
    href: "/#work",
    icon: (
      <Icon>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </Icon>
    ),
  },
  {
    label: "About",
    href: "/#about",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
      </Icon>
    ),
  },
  {
    label: "Services",
    href: "/#services",
    icon: (
      <Icon>
        <path d="M12 3l2.2 5.2 5.6.5-4.2 3.7 1.3 5.5L12 20.5 7.1 18.4l1.3-5.5-4.2-3.7 5.6-.5z" />
      </Icon>
    ),
  },
  {
    label: "Journal",
    href: "/journal",
    icon: (
      <Icon>
        <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" />
        <path d="M9 8h6M9 12h6" />
      </Icon>
    ),
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </Icon>
    ),
  },
];

// Bottom navigation for mobile — mirrors the desktop menu, which is hidden on
// small screens. Hidden on md+.
export default function MobileTabBar() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="mx-auto flex max-w-sm items-center justify-around rounded-full border border-line bg-surface/90 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-1 py-1 text-muted transition-colors hover:text-ink"
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
