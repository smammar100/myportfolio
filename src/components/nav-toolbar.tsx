"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@/components/icons";
import { Toolbar, type ToolbarItem } from "@/components/ui/toolbar";

const navItems: ToolbarItem[] = [
  { id: "home", href: "/", label: "Home", icon: HomeIcon },
  { id: "projects", href: "/projects", label: "Projects", icon: FolderIcon },
  { id: "about", href: "/about", label: "About", icon: UserIcon },
  { id: "articles", href: "/articles", label: "Articles", icon: FileTextIcon },
];

function resolveActiveId(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/articles")) return "articles";
  return "home";
}

export function NavToolbar() {
  const pathname = usePathname();
  const activeId = resolveActiveId(pathname ?? "/");

  return (
    <div className="fixed top-6 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <Toolbar
          items={navItems}
          activeId={activeId}
          ariaLabel="Primary navigation"
          orientation="horizontal"
        />
        <ThemeToolbarToggle />
      </div>
    </div>
  );
}

function ThemeToolbarToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  function handleToggleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    if (
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);
    doc.startViewTransition(() => setTheme(next));
  }

  return (
    <div className="toolbar" role="toolbar" aria-label="Theme">
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={handleToggleTheme}
        className="toolbar__button"
      >
        {mounted && isDark ? (
          <SunIcon className="toolbar__icon" aria-hidden="true" />
        ) : (
          <MoonIcon className="toolbar__icon" aria-hidden="true" />
        )}
        <span className="toolbar__button-tip">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      </button>
    </div>
  );
}
