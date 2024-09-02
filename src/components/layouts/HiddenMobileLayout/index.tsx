import React from "react";

interface HiddenMobileLayoutProps {
  children: React.ReactNode;
}

export function HiddenMobileLayout({ children }: HiddenMobileLayoutProps) {
  return <div className="mobile:hidden flex">{children}</div>;
}
