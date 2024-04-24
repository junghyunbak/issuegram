"use client";

import React, { useEffect } from "react";
import X from "@/assets/svgs/x.svg";
import { useRouter } from "next/navigation";
import "./index.css";

interface FollowModal {
  title: "팔로워" | "팔로잉";
  children: React.ReactNode;
}

export function FollowModal({ title, children }: FollowModal) {
  const router = useRouter();

  const handleCloseButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      className="follow-modal m-[20px] flex h-full max-h-[400px] min-h-[200px] w-[400px] flex-col overflow-hidden rounded-xl bg-white dark:bg-igBannerBackgroundDark"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-[43px] items-center justify-between border-b border-igElevatedSeparator px-[8px] dark:border-igElevatedSeparatorDark">
        <div className="p-[8px]">
          <div className="h-[18px] w-[18px]" />
        </div>
        <p className="font-semibold">{title}</p>
        <div
          className="cursor-pointer p-[8px]"
          onClick={handleCloseButtonClick}
        >
          <X />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll p-[8px]">{children}</div>
    </div>
  );
}
