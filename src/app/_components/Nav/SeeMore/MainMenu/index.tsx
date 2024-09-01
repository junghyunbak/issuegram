"use client";

import { Dispatch, FC, SVGProps, SetStateAction, forwardRef } from "react";
import { ModalState } from "..";
import useStore from "@/store";
import Sun from "@/assets/svgs/sun.svg";
import Moon from "@/assets/svgs/moon.svg";
import Saved from "@/assets/svgs/saved.svg";
import { useRouter } from "next/navigation";

interface MainMenuProps {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
}

export const MainMenu = forwardRef<HTMLDivElement | null, MainMenuProps>(
  function _MainMenu({ modalState, setModalState }, ref) {
    const router = useRouter();

    const [isDark] = useStore((state) => [state.isDark]);

    const handleChangeDarkModeMenu = () => {
      setModalState("mode");
    };

    const handleGoSavedButtonClick = () => {
      router.push("/saved");
    };

    return (
      <div
        ref={ref}
        className={`absolute top-0 w-full p-[8px] transition-transform ${modalState === "main" ? "" : "-translate-x-full"}`}
      >
        <MainMenuItem
          Svg={Saved}
          title="저장됨"
          handleItemClick={handleGoSavedButtonClick}
        />
        <MainMenuItem
          Svg={isDark ? Moon : Sun}
          title="모드 전환"
          handleItemClick={handleChangeDarkModeMenu}
        />
      </div>
    );
  },
);

interface MainMenuItemProps {
  Svg: FC<SVGProps<SVGSVGElement>>;
  title: string;
  handleItemClick?: () => void;
}

function MainMenuItem({
  Svg,
  title,
  handleItemClick = () => {},
}: MainMenuItemProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-x-[12px] rounded-lg p-[16px] hover:bg-igHoverOverlay active:opacity-50 dark:hover:bg-igHoverOverlayDark"
      onClick={handleItemClick}
    >
      <Svg className="w-[18px]" />
      <p>{title}</p>
    </div>
  );
}
