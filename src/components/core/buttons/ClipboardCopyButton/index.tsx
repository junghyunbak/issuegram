"use client";

import useStore from "@/store";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ClipboardCopyButtonProps {
  text: string;
  children: React.ReactNode;
}

export function ClipboardCopyButton({
  text,
  children,
}: ClipboardCopyButtonProps) {
  const fireCopiedSnackbar = useStore((state) => state.fireCopiedSnackbar);

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        fireCopiedSnackbar();
      }}
    >
      {children}
    </CopyToClipboard>
  );
}
