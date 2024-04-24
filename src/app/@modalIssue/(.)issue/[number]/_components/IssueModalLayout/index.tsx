"use client";

import React, { MouseEventHandler } from "react";
import "./index.css";

interface IssueModalLayoutProps {
  children: React.ReactNode;
}

export function IssueModalLayout({ children }: IssueModalLayoutProps) {
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleModalClick}
      className="issue-modal-animation z-20 flex max-h-[93dvh] overflow-hidden rounded bg-white max-md:flex-col dark:bg-black"
    >
      {children}
    </div>
  );
}
