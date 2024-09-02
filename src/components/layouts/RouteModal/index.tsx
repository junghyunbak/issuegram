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

  /**
   * 1. 커스텀 scroll div를 만듬
   * 2. 모달이 스크롤을 덮게 됨
   * 3. 모달 뒤쪽이 스크롤 되는 이슈 사라짐
   *
   * => 코드 비활성화
   */
  /*
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
  */

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
