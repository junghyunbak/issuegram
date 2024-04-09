import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./index.css";
import { ClipboardCopyButton } from "@/components/core/buttons/ClipboardCopyButton";

interface MarkdownProps {
  markdown: string;
}

export function Markdown({ markdown }: MarkdownProps) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, [remarkFrontmatter, ["toml"]]]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeKatex, { output: "mathml" }],
        ]}
        components={{
          code(test) {
            const { children: text, className } = test;

            let match: ReturnType<RegExp["exec"]>;

            if (!className || !(match = /language-(\w+)/.exec(className))) {
              return <code>{text}</code>;
            }

            const [_, lang] = match;

            const [__, lines] = /language-\w+{([0-9-,]*)}/.exec(className) || [
              undefined,
              "",
            ];

            const lineNumbers = new Set();

            lines.split(",").forEach((v) => {
              if (v.includes("-")) {
                const [s, e] = v.split("-").map((v) => parseInt(v, 10));

                if (isNaN(s) || isNaN(e)) {
                  return;
                }

                if (s > e) {
                  return;
                }

                for (let i = s; i <= e; i++) {
                  lineNumbers.add(i);
                }

                return;
              }

              if (isNaN(parseInt(v, 10))) {
                return;
              }

              lineNumbers.add(parseInt(v, 10));
            });

            return (
              <SyntaxHighlighter
                showLineNumbers
                wrapLines
                lineProps={(lineNumber) => {
                  // TODO: 스타일 타입 설정

                  const style: any = {
                    display: "block",
                    paddingLeft: "12.6px",
                    paddingRight: "12.6px",
                  };

                  if (lineNumbers.has(lineNumber)) {
                    style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                  }

                  return { style };
                }}
                PreTag={({ children, ...props }) => {
                  return (
                    <div>
                      <div
                        className="mt-[8px] [&>code]:block [&>code]:w-full [&>code]:min-w-fit"
                        {...props}
                      >
                        {children}
                      </div>
                      <p className="mt-[8px] font-segoe text-xs text-secondaryText">
                        {lang}{" "}
                        <ClipboardCopyButton text={String(text)}>
                          <span className="ml-[10px] cursor-pointer font-semibold">
                            코드 복사
                          </span>
                        </ClipboardCopyButton>
                      </p>
                    </div>
                  );
                }}
                language={lang}
                style={vs}
                customStyle={{ paddingLeft: 0, paddingRight: 0 }}
              >
                {String(text).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
