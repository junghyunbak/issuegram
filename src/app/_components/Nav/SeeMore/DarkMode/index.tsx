import { type Dispatch, type SetStateAction, forwardRef } from "react";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import { type ModalState } from "..";
import Sun from "@/assets/svgs/sun.svg";
import Moon from "@/assets/svgs/moon.svg";
import useStore from "@/store";
const cookies = require("browser-cookies");

interface DarkModeProps {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
}

const DarkMode = forwardRef<HTMLDivElement | null, DarkModeProps>(
  function _DarkMode({ modalState, setModalState }, ref) {
    const [isDark, setIsDark] = useStore((state) => [
      state.isDark,
      state.setIsDark,
    ]);

    const handleDarkModeToggleButtonClick = () => {
      if (!isDark) {
        setIsDark(true);

        cookies.set("theme", "dark");

        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);

        cookies.erase("theme");

        document.documentElement.classList.remove("dark");
      }
    };

    return (
      <div
        ref={ref}
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
    );
  },
);

export { DarkMode };
