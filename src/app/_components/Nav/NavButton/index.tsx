"use client";

import { useRouter } from "next/navigation";

// [ ]: 현재 경로에 따라 title 강조(bold)처리하기

interface NavButtonProps {
  children: React.ReactNode;
  path: string;
  title?: string;
}

export function NavButton({ children, path, title }: NavButtonProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (path.startsWith("/")) {
      router.push(path);
    } else {
      window.open(path, "_blank");
    }
  };

  return (
    <div
      className="group my-[4px] flex cursor-pointer rounded-lg p-[12px] hover:bg-black/[0.05] active:opacity-50"
      onClick={handleButtonClick}
    >
      <div className="scale-100 transition-[transform] duration-300 group-hover:scale-105">
        {children}
      </div>

      {title && <div className="pl-[16px] max-xl:hidden">{title}</div>}
    </div>
  );
}
