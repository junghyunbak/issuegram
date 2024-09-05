"use client";

import { useEffect, useRef, useState } from "react";

import { DarkMode } from "./DarkMode";
import { MainMenu } from "./MainMenu";

import Hamburger from "@/assets/svgs/hamburger.svg";

export type ModalState = "closed" | "main" | "mode";

export function SeeMore() {
  const [modalState, setModalState] = useState<ModalState>("closed");

  const menuContainer = useRef<HTMLDivElement | null>(null);
  const mainMenu = useRef<HTMLDivElement | null>(null);
  const modeMenu = useRef<HTMLDivElement | null>(null);
  const modalToggleButton = useRef<HTMLDivElement | null>(null);

  /**
   * 메뉴 종류에 따라 모달 높이 수정
   */
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

  /**
   * 모달 외부 클릭 및 esc키 누를 경우 모달 닫기
   */
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

        <div className="pl-[16px] tablet:hidden">
          <p>더 보기</p>
        </div>
      </div>

      {modalState !== "closed" && (
        <div
          ref={menuContainer}
          className="absolute bottom-[52px] left-0 z-10 h-10 w-[266px] overflow-x-hidden overflow-y-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] tablet:bottom-0 tablet:left-[48px] dark:bg-igBannerBackgroundDark"
        >
          <MainMenu
            ref={mainMenu}
            modalState={modalState}
            setModalState={setModalState}
          />

          <DarkMode
            ref={modeMenu}
            modalState={modalState}
            setModalState={setModalState}
          />
        </div>
      )}
    </div>
  );
}
