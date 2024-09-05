import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="min-h-screen pt-[30px] mobile:pt-0">{children}</div>;
}
