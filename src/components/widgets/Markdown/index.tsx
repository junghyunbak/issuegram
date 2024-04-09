import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
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

            /**
             * hljs lanugae에서 js 축약어를 지원하지 않기 때문에 작성한 코드
             */
            switch (match[1]) {
              case "js":
                match[1] = "javascript";
              case "ts":
                match[1] = "typescript";
            }

            return (
              <SyntaxHighlighter
                PreTag={({ children, ...props }) => {
                  return (
                    <div>
                      <div className="mt-[8px]" {...props}>
                        {children}
                      </div>
                      <p className="mt-[8px] font-segoe text-xs text-secondaryText">
                        {match[1]}{" "}
                        <ClipboardCopyButton text={String(text)}>
                          <span className="ml-[10px] cursor-pointer font-semibold">
                            코드 복사
                          </span>
                        </ClipboardCopyButton>
                      </p>
                    </div>
                  );
                }}
                language={match[1]}
                style={gradientDark}
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
