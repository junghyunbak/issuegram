"use client";

import useStore from "@/store";
import { useEffect, useRef } from "react";

export function CopiedSnackbar() {
  const [copiedSnackbarState, setCopiedSnackbarIsOpen] = useStore((state) => [
    state.copied,
    state.setCopiedSnackbarIsOpen,
  ]);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!copiedSnackbarState.isOpen) {
      return;
    }

    if (timer.current !== null) {
      clearTimeout(timer.current);

      timer.current = null;
    }

    timer.current = setTimeout(() => {
      setCopiedSnackbarIsOpen(false);
    }, 5000);
  }, [copiedSnackbarState, setCopiedSnackbarIsOpen]);

  if (!copiedSnackbarState.isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] px-[16px] py-[12px]">
      <p className="text-sm text-white">링크를 클립보드에 복사했습니다.</p>
    </div>
  );
}
