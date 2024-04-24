"use client";

import Hamburger from "@/assets/svgs/hamburger.svg";
import Sun from "@/assets/svgs/sun.svg";
import Moon from "@/assets/svgs/moon.svg";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import { useEffect, useRef, useState } from "react";
import useStore from "@/store";

// [ ]: 다크모드 관련 컴포넌트 분리
export function SeeMore() {
  const [modalState, setModalState] = useState<"closed" | "main" | "mode">(
    "closed",
  );

  const [isDark, setIsDark] = useStore((state) => [
    state.isDark,
    state.setIsDark,
  ]);

  const menuContainer = useRef<HTMLDivElement | null>(null);
  const mainMenu = useRef<HTMLDivElement | null>(null);
  const modeMenu = useRef<HTMLDivElement | null>(null);
  const modalToggleButton = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      modalState === "closed" ||
      mainMenu.current === null ||
      modeMenu.current === null ||
      menuContainer.current === null
    ) {
      return;
    }

    menuContainer.current.style.height = `${modalState === "main" ? mainMenu.current.offsetHeight : modeMenu.current.offsetHeight}px`;
  }, [modalState]);

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      setIsDark(true);

      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (
        !menuContainer.current ||
        !modalToggleButton.current ||
        !(e.target instanceof HTMLElement)
      ) {
        return;
      }

      if (
        !menuContainer.current.contains(e.target) &&
        !modalToggleButton.current.contains(e.target)
      ) {
        setModalState("closed");
      }
    };

    const handleCloseModalWithEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setModalState("closed");
      }
    };

    window.addEventListener("click", handleCloseModal);
    window.addEventListener("keydown", handleCloseModalWithEsc);

    return () => {
      window.removeEventListener("click", handleCloseModal);
      window.removeEventListener("keydown", handleCloseModalWithEsc);
    };
  }, []);

  const handleModalToggleButtonClick = () => {
    setModalState(modalState === "closed" ? "main" : "closed");
  };

  const handleDarkModeToggleButtonClick = () => {
    if (!isDark) {
      setIsDark(true);

      window.localStorage.setItem("theme", "dark");

      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);

      window.localStorage.removeItem("theme");

      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative mb-[12px]">
      <div
        ref={modalToggleButton}
        className="group flex cursor-pointer rounded-lg p-[12px] hover:bg-igHoverOverlay active:opacity-50 dark:hover:bg-igHoverOverlayDark"
        onClick={handleModalToggleButtonClick}
      >
        <div className="scale-100 transition-[transform] duration-300 group-hover:scale-105">
          <Hamburger />
        </div>

        <div className="pl-[16px] max-xl:hidden">
          <p>더 보기</p>
        </div>
      </div>

      {modalState !== "closed" && (
        <div
          ref={menuContainer}
          className="absolute bottom-[52px] left-0 z-10 h-10 w-[266px] overflow-x-hidden overflow-y-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-xl:bottom-0 max-xl:left-[48px] dark:bg-igBannerBackgroundDark"
        >
          <div
            ref={mainMenu}
            className={`absolute top-0 w-full p-[8px] transition-transform ${modalState === "main" ? "" : "-translate-x-full"}`}
          >
            <div
              onClick={() => {
                setModalState("mode");
              }}
            >
              <div className="flex cursor-pointer items-center gap-x-[12px] rounded-lg p-[16px] hover:bg-igHoverOverlay active:opacity-50 dark:hover:bg-igHoverOverlayDark ">
                {isDark ? <Moon /> : <Sun />}
                <p>모드 전환</p>
              </div>
            </div>
          </div>
          <div
            ref={modeMenu}
            className={`absolute top-0 w-full transition-transform ${modalState === "mode" ? "translate-x-0" : " translate-x-full"}`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-igStroke p-[16px] dark:border-igStrokeDark">
                <div className="flex items-center gap-x-[12px]">
                  <div
                    className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
                    onClick={() => {
                      setModalState("main");
                    }}
                  >
                    <ArrowUp className="w-[12px] -rotate-90 text-igTertiaryIcon" />
                  </div>
                  <p className="font-semibold">모드 전환</p>
                </div>

                {isDark ? <Moon /> : <Sun />}
              </div>

              <div className="p-[8px]">
                <div
                  className="flex cursor-pointer items-center justify-between gap-x-[12px] rounded-lg p-[16px] hover:bg-igHoverOverlay active:opacity-50 dark:hover:bg-igHoverOverlayDark"
                  onClick={handleDarkModeToggleButtonClick}
                >
                  <p className="text-sm">다크 모드</p>
                  <div className="relative h-[16px] w-[26px] rounded-2xl bg-igToggleBackgroundOnPrism dark:bg-igToggleBackgroundOnPrismDark">
                    <div
                      className={`absolute inset-[2px] h-[12px] w-[12px] rounded-full bg-igStrokePrism transition-all duration-200 dark:bg-igStrokePrismDark ${isDark ? "left-[12px]" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
