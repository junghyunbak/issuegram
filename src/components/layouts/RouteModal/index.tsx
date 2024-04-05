"use client";

import React, { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/navigation";
import X from "@/assets/svgs/x.svg";

// TODO: dimmed 클릭 시 모달 닫히도록 구현 (contents 요소가 위에 올라와있는 상태에서도 동작하도록)
export function RouteModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const $el = document.querySelector("scroll");

    if ($el instanceof HTMLElement) {
      if (window.scrollY !== 0) {
        $el.style.top = `-${window.scrollY}px`;
      }

      $el.style.position = "fixed";
    }

    return () => {
      if ($el instanceof HTMLElement) {
        $el.style.position = "static";
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleCloseModal: MouseEventHandler<HTMLDivElement> = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute size-full bg-black/65" />

      <div className="absolute">{children}</div>

      <div
        className="absolute right-[10px] top-[10px] cursor-pointer p-[8px] active:opacity-50"
        onClick={handleCloseModal}
      >
        <X />
      </div>
    </div>
  );
}
