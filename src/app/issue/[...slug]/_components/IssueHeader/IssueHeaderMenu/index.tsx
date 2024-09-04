"use client";

import { useState } from "react";
import { IssueHeaderMenuModal } from "./IssueHeaderMenuModal";
import Kebab from "@/assets/svgs/kebab.svg";

interface IssueHeaderMenuProps {
  issue: Issues[number];
}

export function IssueHeaderMenu({ issue }: IssueHeaderMenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuOpenButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="group cursor-pointer p-[8px]"
          onClick={handleMenuOpenButtonClick}
        >
          <Kebab className="group-hover:text-igSecondaryText group-active:opacity-50 dark:group-hover:text-igSecondaryTextDark" />
        </div>
      </div>

      {isModalOpen && (
        <IssueHeaderMenuModal issue={issue} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
