import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";

interface HeaderIntroProps {
  name: string;
  content: string;
}

export function HeaderIntro({ name, content }: HeaderIntroProps) {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-semibold">{name}</p>
      <div className="intro-markdown">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath, [remarkFrontmatter, ["toml"]]]}
          rehypePlugins={[
            rehypeRaw,
            rehypeSlug,
            [rehypeKatex, { output: "mathml" }],
          ]}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}
