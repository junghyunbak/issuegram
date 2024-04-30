import React from "react";
import type { Metadata } from "next";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import { CopiedSnackbar } from "@/components/widgets/CopiedSnackbar";
import { cookies } from "next/headers";
import "@/assets/fonts/stylesheet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issuegram",
  description: "Issuegram (Github Issues + Instagram) 개인 블로그 ",
};

export default function RootLayout({
  children,
  modalIssue,
  modalFollowers,
  modalFollowing,
}: Readonly<{
  children: React.ReactNode;
  modalIssue: React.ReactNode;
  modalFollowers: React.ReactNode;
  modalFollowing: React.ReactNode;
}>) {
  const cookieStore = cookies();

  return (
    <html
      className={`size-full ${cookieStore.get("theme")?.value === "dark" ? "dark" : ""}`}
    >
      <body className="body-dark size-full">
        <div className="flex size-full">
          <Nav />
          <div className="flex-1 overflow-y-scroll">
            <div className="mx-auto w-full max-w-[935px] px-[20px] pt-[30px] max-md:p-0">
              <div className="min-h-screen">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
        <CopiedSnackbar />
        {modalIssue}
        {modalFollowers}
        {modalFollowing}
      </body>
    </html>
  );
}
