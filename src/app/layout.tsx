import type { Metadata } from "next";
import { Footer } from "./_components/Footer";
import React from "react";
import { Nav } from "./_components/Nav";
import "./globals.css";
import "@/assets/fonts/stylesheet.css";

export const metadata: Metadata = {
  title: "Issuegram",
  description: "Issuegram (Github Issues + Instagram) 개인 블로그 ",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html className="size-full">
      <body className="flex size-full">
        <Nav />

        <div className="flex-1 overflow-y-scroll" id="scroll">
          <div className="mx-auto w-full max-w-[935px] px-[20px] pt-[30px] max-md:p-0">
            <div className="min-h-screen">{children}</div>

            <Footer />
          </div>

          {modal}
        </div>
      </body>
    </html>
  );
}
