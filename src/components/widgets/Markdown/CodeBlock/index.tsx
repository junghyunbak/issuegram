"use client";

import { useContext, type CSSProperties } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { ClipboardCopyButton } from "@/components/core/buttons/ClipboardCopyButton";

import { themeContext } from "@/app/_components/ThemeProvider";

import "./index.css";

interface CodeBlockProps {
  lang: string;
  lineNumbers: Set<number>;
  code: string;
}

export function CodeBlock({ lineNumbers, lang, code }: CodeBlockProps) {
  const { theme } = useContext(themeContext);

  const isDark = theme === "dark";

  return (
    <SyntaxHighlighter
      showLineNumbers
      wrapLines
      lineProps={(lineNumber) => {
        const style: CSSProperties = {
          display: "block",
          paddingLeft: "12.6px",
          paddingRight: "12.6px",
        };

        if (lineNumbers.has(lineNumber)) {
          style.background = `linear-gradient(to right, ${isDark ? "rgb(255 255 255 / 10%)" : "rgb(0 0 0 / 10%)"} 80%, transparent)`;
        }

        return { style };
      }}
      PreTag={({ children, ...props }) => {
        return (
          <div className="code-block">
            <div {...props}>{children}</div>

            <p>
              {lang}{" "}
              <ClipboardCopyButton text={code}>
                <span className="ml-[10px] cursor-pointer font-semibold">
                  코드 복사
                </span>
              </ClipboardCopyButton>
            </p>
          </div>
        );
      }}
      language={lang}
      style={isDark ? vscDarkPlus : vs}
      customStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {code.replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
