import React from "react";

import type { Metadata } from "next";

import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import { QueryProvider } from "./_components/QueryProvider";
import { ThemeProvider } from "./_components/ThemeProvider";

import { CopiedSnackbar } from "@/components/widgets/CopiedSnackbar";

import "@/assets/fonts/stylesheet.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Issuegram",
  description: "Issuegram (Github Issues + Instagram) 개인 블로그",
  other: {
    "google-site-verification": "cT0MruhYhAIxE2PwRZWlZmOseoYdbQeBXWNULoe0kEI",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  modalIssue: React.ReactNode;
  modalFollowers: React.ReactNode;
  modalFollowing: React.ReactNode;
}>;

export default function RootLayout({
  children,
  modalIssue,
  modalFollowers,
  modalFollowing,
}: RootLayoutProps) {
  return (
    <html className="size-full">
      <body className="body-dark size-full">
        <ThemeProvider>
          <QueryProvider>
            <div className="flex size-full">
              <Nav />

              <div className="flex-1 overflow-y-scroll">
                <div className="mx-auto w-full max-w-[935px] px-[20px] mobile:px-0">
                  <div className="min-h-screen">{children}</div>

                  <Footer />
                </div>
              </div>
            </div>

            <CopiedSnackbar />

            {modalIssue}
            {modalFollowers}
            {modalFollowing}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
