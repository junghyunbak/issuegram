"use client";

import { useRouter } from "next/navigation";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import { MouseEventHandler, useEffect } from "react";

interface IssueModalRouteButtonProps {
  direction?: "left" | "right";
  href?: string;
}

export function IssueModalRouteButton({
  direction = "left",
  href,
}: IssueModalRouteButtonProps) {
  const router = useRouter();

  useEffect(() => {
    const handleLeftArrowKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && href) {
        router.replace(href, { scroll: false });
      }
    };

    const handleRightArrowKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && href) {
        router.replace(href, { scroll: false });
      }
    };

    if (direction === "left") {
      window.addEventListener("keydown", handleLeftArrowKeydown);
    } else {
      window.addEventListener("keydown", handleRightArrowKeydown);
    }

    return () => {
      if (direction === "left") {
        window.removeEventListener("keydown", handleLeftArrowKeydown);
      } else {
        window.removeEventListener("keydown", handleRightArrowKeydown);
      }
    };
  }, [direction, href, router]);

  const handleButtonClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    if (href) {
      router.replace(href, { scroll: false });
    }
  };

  if (!href) {
    return <div className="w-[32px]" />;
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-full bg-white p-[8px] transition-opacity duration-200 hover:opacity-[0.7]"
      onClick={handleButtonClick}
    >
      <ArrowUp
        className={`transform fill-black ${direction === "left" ? "-rotate-90" : "rotate-90"}`}
      />
    </div>
  );
}
