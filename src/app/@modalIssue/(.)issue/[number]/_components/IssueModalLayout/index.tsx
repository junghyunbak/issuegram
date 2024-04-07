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
      className="issue-modal mx-[48px] flex max-h-[93dvh] overflow-hidden rounded bg-white max-md:flex-col"
    >
      {children}
    </div>
  );
}
