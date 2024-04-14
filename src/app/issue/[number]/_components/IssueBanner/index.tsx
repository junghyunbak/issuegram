import randomGradient from "random-gradient";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { getIssueLabels } from "@/utils";
const toml = require("toml").parse;

interface IssueBannerProps {
  issue: Issues[number];
}

export function IssueBanner({ issue }: IssueBannerProps) {
  const { title } = issue;

  const issueLabels = getIssueLabels(issue);

  issueLabels.sort((a, b) => (a < b ? -1 : 1));

  const bgGradient = {
    background: randomGradient(
      issueLabels.join("") || issue.title,
      "horizontal",
    ),
  };

  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["toml"])
    .use(remarkExtractFrontmatter, { toml })
    .use(remarkStringify)
    .processSync(issue.body || "");

  const {
    data: { thumbnail },
  } = file;

  return (
    <div
      className={`flex h-full w-[300px] overflow-hidden max-md:aspect-square max-md:w-full`}
    >
      {typeof thumbnail === "string" ? (
        <div className="relative flex size-full items-center justify-center">
          <img className="absolute size-full object-cover" src={thumbnail} />
          <div className="absolute size-full backdrop-blur" />
          <img className="absolute object-contain" src={thumbnail} />
        </div>
      ) : (
        <div
          className="flex size-full items-center justify-center p-4"
          style={bgGradient}
        >
          <p className="text-2xl font-bold text-white">{title}</p>
        </div>
      )}
    </div>
  );
}
