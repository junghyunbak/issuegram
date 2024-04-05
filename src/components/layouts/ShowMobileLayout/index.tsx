import React from "react";

interface ShowMobileLayoutProps {
  children: React.ReactNode;
}

export function ShowMobileLayout({ children }: ShowMobileLayoutProps) {
  return <div className="hidden max-md:flex">{children}</div>;
}
