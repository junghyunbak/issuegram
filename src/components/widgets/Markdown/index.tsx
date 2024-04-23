import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

import "./index.css";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";

interface MarkdownProps {
  markdown: string;
}

// [ ]: markdown css 파일 CodeBlock 폴더로 이동
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
          a({ href, node, ...props }) {
            if (!href) {
              return null;
            }

            if (href.startsWith("#")) {
              return <Link {...props} href={href} replace />;
            }

            return <a href={href} {...props} target="_blank" />;
          },
          code(props) {
            const { children: text, className } = props;

            let match: ReturnType<RegExp["exec"]>;

            if (!className || !(match = /language-(\w+)/.exec(className))) {
              return <code>{text}</code>;
            }

            const [_, lang] = match;

            const [__, lines] = /language-\w+{([0-9-,]*)}/.exec(className) || [
              undefined,
              "",
            ];

            const lineNumbers = new Set<number>();

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
              <CodeBlock
                lineNumbers={lineNumbers}
                code={String(text)}
                lang={lang}
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
