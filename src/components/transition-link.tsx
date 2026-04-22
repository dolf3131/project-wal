"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { useSiteTransition } from "@/components/site-transition-provider";

type TransitionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
  };

export function TransitionLink({
  href,
  children,
  onClick,
  prefetch = true,
  target,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { beginNavigation } = useSiteTransition();

  const hrefValue =
    typeof href === "string"
      ? href
      : typeof href.pathname === "string"
        ? href.pathname
        : "";

  useEffect(() => {
    if (!prefetch || !hrefValue.startsWith("/") || hrefValue === pathname) {
      return;
    }

    router.prefetch(hrefValue);
  }, [hrefValue, pathname, prefetch, router]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank" ||
      !hrefValue.startsWith("/") ||
      hrefValue === pathname
    ) {
      return;
    }

    beginNavigation(hrefValue);
  };

  return (
    <Link href={href} prefetch={prefetch} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
