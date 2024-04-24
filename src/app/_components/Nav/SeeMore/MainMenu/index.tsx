import { Dispatch, SetStateAction, forwardRef } from "react";
import { ModalState } from "..";
import useStore from "@/store";
import Sun from "@/assets/svgs/sun.svg";
import Moon from "@/assets/svgs/moon.svg";

interface MainMenuProps {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
}

const MainMenu = forwardRef<HTMLDivElement | null, MainMenuProps>(
  function _MainMenu({ modalState, setModalState }, ref) {
    const [isDark] = useStore((state) => [state.isDark]);

    const handleChangeDarkModeMenu = () => {
      setModalState("mode");
    };

    return (
      <div
        ref={ref}
        className={`absolute top-0 w-full p-[8px] transition-transform ${modalState === "main" ? "" : "-translate-x-full"}`}
      >
        <div onClick={handleChangeDarkModeMenu}>
          <div className="flex cursor-pointer items-center gap-x-[12px] rounded-lg p-[16px] hover:bg-igHoverOverlay active:opacity-50 dark:hover:bg-igHoverOverlayDark">
            {isDark ? <Moon /> : <Sun />}
            <p>모드 전환</p>
          </div>
        </div>
      </div>
    );
  },
);

export { MainMenu };
