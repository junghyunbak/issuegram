"use client";

import { useRouter } from "next/navigation";

import ArrowUpLarge from "@/assets/svgs/arrow-up-large.svg";

export function IssuePageMobileNav() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div className="flex h-11 w-full items-center justify-between border-b border-igElevatedSeparator px-[16px] dark:border-igElevatedSeparatorDark">
      <div onClick={handleBackButtonClick} className="cursor-pointer">
        <ArrowUpLarge className="-rotate-90 transform" />
      </div>

      <p className="font-semibold">게시물</p>

      <div className="w-[24px]" />
    </div>
  );
}
