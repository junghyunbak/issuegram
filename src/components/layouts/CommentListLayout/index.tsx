import React from "react";

interface CommentListLayoutProps {
  children: React.ReactNode;
}

export function CommentListLayout({ children }: CommentListLayoutProps) {
  return <div className="p-4">{children}</div>;
}
