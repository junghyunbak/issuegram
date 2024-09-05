"use client";

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useShallow } from "zustand/react/shallow";

import useStore from "@/store";

interface ClipboardCopyButtonProps {
  text: string;
  children: React.ReactNode;
}

export function ClipboardCopyButton({
  text,
  children,
}: ClipboardCopyButtonProps) {
  const [fireCopiedSnackbar] = useStore(
    useShallow((s) => [s.fireCopiedSnackbar]),
  );

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
