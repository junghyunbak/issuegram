import React from "react";
import { Footer } from "@/app/_components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex-1 overflow-y-scroll" id="scroll">
      <div className="mx-auto w-full max-w-[935px] px-[20px] pt-[30px] max-md:p-0">
        <div className="min-h-screen">{children}</div>

        <Footer />
      </div>
    </div>
  );
}
