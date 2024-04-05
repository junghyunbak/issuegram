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

            return (
              <SyntaxHighlighter
                PreTag="div"
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
