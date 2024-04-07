"use client";

import { useRouter } from "next/navigation";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import { MouseEventHandler } from "react";

interface IssueModalRouteButtonProps {
  direction?: "left" | "right";
  href?: string;
}

export function IssueModalRouteButton({
  direction = "left",
  href,
}: IssueModalRouteButtonProps) {
  const router = useRouter();

  if (!href) {
    return <div className="w-[32px]" />;
  }

  const handleButtonClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    router.replace(href, { scroll: false });
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-full bg-white p-[8px] transition-opacity duration-200 hover:opacity-[0.7]"
      onClick={handleButtonClick}
    >
      <ArrowUp
        className={`transform ${direction === "left" ? "-rotate-90" : "rotate-90"}`}
      />
    </div>
  );
}
