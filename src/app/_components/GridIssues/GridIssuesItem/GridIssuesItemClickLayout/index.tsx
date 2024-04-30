"use client";

import { useRouter } from "next/navigation";

export function GridIssuesItemClickLayout({
  children,
  href,
  linking,
}: {
  children: React.ReactNode;
  href: string;
  linking: boolean;
}) {
  const router = useRouter();

  const handleItemClick = () => {
    if (linking) {
      router.push(href, { scroll: false });

      return;
    }

    window.location.href = href;
  };

  return (
    <div onClick={handleItemClick} className="size-full cursor-pointer">
      {children}
    </div>
  );
}
