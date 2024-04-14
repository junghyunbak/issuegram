import type { Metadata } from "next";
import { Footer } from "./_components/Footer";
import React from "react";
import { Nav } from "./_components/Nav";
import "./globals.css";
import "@/assets/fonts/stylesheet.css";
import { CopiedSnackbar } from "@/components/widgets/CopiedSnackbar";

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
  return (
    <html className="size-full">
      <body className="flex size-full">
          {children}
          {modalIssue}
          {modalFollowers}
          {modalFollowing}
        <CopiedSnackbar />
      </body>
    </html>
  );
}
