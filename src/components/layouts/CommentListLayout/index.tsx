import React from "react";

interface CommentListLayoutProps {
  children: React.ReactNode;
}

export function CommentListLayout({ children }: CommentListLayoutProps) {
  return (
    <div className="flex p-4 text-sm">
      <div className="mr-[46px]" />
      {children}
    </div>
  );
}
