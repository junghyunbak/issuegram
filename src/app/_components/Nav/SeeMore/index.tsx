"use client";

import Hamburger from "@/assets/svgs/hamburger.svg";
import Sun from "@/assets/svgs/sun.svg";
import Moon from "@/assets/svgs/moon.svg";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import { useEffect, useRef, useState } from "react";

export function SeeMore() {
  const [modalState, setModalState] = useState<"closed" | "main" | "mode">(
    "closed",
  );

  const [isDark, setIsDark] = useState(false);

  const menuContainer = useRef<HTMLDivElement | null>(null);
  const mainMenu = useRef<HTMLDivElement | null>(null);
  const modeMenu = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="relative mb-[12px]">
      <div
        className="group flex cursor-pointer rounded-lg p-[12px] hover:bg-black/[0.05] active:opacity-50"
        onClick={() => {
          setModalState(modalState === "closed" ? "main" : "closed");
        }}
      >
        <div className="scale-100 transition-[transform] duration-300 group-hover:scale-105">
          <Hamburger />
        </div>

        <div className="pl-[16px] max-xl:hidden">더 보기</div>
      </div>

      {modalState !== "closed" && (
        <div
          ref={menuContainer}
          className="absolute bottom-[52px] left-0 z-[60] h-10 w-[266px] overflow-x-hidden overflow-y-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-xl:bottom-0 max-xl:left-[48px]"
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
              <div className="flex cursor-pointer items-center gap-x-[12px] rounded-lg p-[16px] hover:bg-black/[0.05] active:opacity-50 ">
                {isDark ? <Moon /> : <Sun />}
                모드 전환
              </div>
            </div>
          </div>
          <div
            ref={modeMenu}
            className={`absolute top-0 w-full transition-transform ${modalState === "mode" ? "translate-x-0" : " translate-x-full"}`}
          >
            <div>
              <div className="flex items-center justify-between border-b p-[16px]">
                <div className="flex items-center gap-x-[12px]">
                  <div
                    className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
                    onClick={() => {
                      setModalState("main");
                    }}
                  >
                    <ArrowUp className="w-[12px] -rotate-90" />
                  </div>
                  <p className="font-semibold">모드 전환</p>
                </div>

                {isDark ? <Moon /> : <Sun />}
              </div>

              <div className="p-[8px]">
                <div
                  className="flex cursor-pointer items-center justify-between gap-x-[12px] rounded-lg p-[16px] hover:bg-black/[0.05] active:opacity-50"
                  onClick={() => {
                    setIsDark(!isDark);
                  }}
                >
                  <p className="text-sm">다크 모드</p>
                  <div className="relative h-[16px] w-[26px] rounded-2xl bg-[#dbdfe4]">
                    <div
                      className={`absolute inset-[2px] h-[12px] w-[12px] rounded-full bg-white transition-all ${isDark ? "left-[12px]" : ""}`}
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
