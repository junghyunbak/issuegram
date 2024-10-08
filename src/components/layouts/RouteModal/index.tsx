"use client";

import React, { MouseEventHandler, useEffect } from "react";

import { useRouter } from "next/navigation";

import X from "@/assets/svgs/x.svg";

interface RouteModalProps {
  children: React.ReactNode;
  hiddenCloseButton?: boolean;
  disableEsc?: boolean;
}

export function RouteModal({
  children,
  hiddenCloseButton = false,
  disableEsc = false,
}: RouteModalProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disableEsc) {
        return;
      }

      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableEsc, router]);

  const handleCloseModal: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    router.back();
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/65"
      onClick={handleCloseModal}
    >
      {children}

      {!hiddenCloseButton && (
        <div
          className="absolute right-[10px] top-[10px] cursor-pointer p-[8px] active:opacity-50"
          onClick={handleCloseModal}
        >
          <X className="text-white" />
        </div>
      )}
    </div>
  );
}
