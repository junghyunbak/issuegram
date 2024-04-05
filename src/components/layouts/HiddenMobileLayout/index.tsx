import React from "react";

interface HiddenMobileLayoutProps {
  children: React.ReactNode;
}

export function HiddenMobileLayout({ children }: HiddenMobileLayoutProps) {
  return <div className="flex max-md:hidden">{children}</div>;
}
