"use client";

import { useEffect, useRef, useState } from "react";

import useStore from "@/store";

import { useShallow } from "zustand/react/shallow";

import { AnimatePresence, motion } from "framer-motion";

export function CopiedSnackbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [copiedSnackbar] = useStore(useShallow((s) => [s.copiedSnackbar]));

  const prev = useRef<Symbol>(copiedSnackbar);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /**
     * 스낵바의 전역 상태가 다를 경우
     *
     * => 새롭게 발화되었음을 의미
     */
    if (prev.current !== copiedSnackbar) {
      prev.current = copiedSnackbar;

      setIsOpen(false);

      setTimeout(() => {
        setIsOpen(true);
      }, 300);

      return;
    }

    /**
     * 여기까지 도달한다면 다음과 같은 경우이다.
     *
     * 1. 기존의 스낵바가 닫힌다. (false)
     * 2. 0.3초뒤에 스낵바가 새롭게 열린다. (true)
     */

    if (!isOpen) {
      return;
    }

    if (timer.current) {
      clearTimeout(timer.current);

      timer.current = null;
    }

    timer.current = setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  }, [copiedSnackbar, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ transform: "translateY(100%)" }}
          animate={{ transform: "translateY(0)" }}
          exit={{ transform: "translateY(100%)" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-igBannerBackgroundDark px-[16px] py-[12px]"
        >
          <p className="text-sm text-white">클립보드에 복사했습니다.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
