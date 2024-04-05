"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface RouteButtonProps {
  children: React.ReactNode;
  path: string;
}

export function RouteButton({ children, path }: RouteButtonProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.replace(path, { scroll: false });
  };

  return <button onClick={handleButtonClick}>{children}</button>;
}
