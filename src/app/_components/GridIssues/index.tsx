import Heart from "@/assets/svgs/heart.svg";
import Comment from "@/assets/svgs/comment.svg";
import Link from "next/link";
import Pin from "@/assets/svgs/pin.svg";
import randomGradient from "random-gradient";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { getIssueLabels } from "@/utils";
const toml = require("toml").parse;

interface GridIssuesProps {
  issues: Issues;
  lineCount?: 3 | 4;
}

export function GridIssues({ issues, lineCount = 3 }: GridIssuesProps) {
  const tmp: (Issues[number] | null)[][] = [];

  for (let i = 0; i < issues.length; i += lineCount) {
    const slices = issues.slice(i, i + lineCount);

    tmp.push([...slices, ...Array(lineCount - slices.length).fill(null)]);
  }

  return (
    <div className="flex flex-col">
      {tmp.map((arr, i) => {
        return (
          <div className="mb-[4px] flex w-full max-md:mb-[3px]" key={i}>
            {arr.map((issue, j) => {
              if (!issue) {
                return <div className="flex-1" key={i} />;
              }

              const file = unified()
                .use(remarkParse)
                .use(remarkFrontmatter, ["toml"])
                .use(remarkExtractFrontmatter, { toml })
                .use(remarkStringify)
                .processSync(issue.body || "");

              const {
                data: { thumbnail },
              } = file;

              const issueLabels = getIssueLabels(issue);

              issueLabels.sort((a, b) => (a < b ? -1 : 1));

              const bgGradient = {
                background: randomGradient(
                  issueLabels.join("") || issue.title,
                  "horizontal",
                ),
              };

              return (
                <Link
                  href={`/issue/${issue.number}`}
                  className="relative mr-[4px] block flex-1 cursor-pointer last:mr-auto max-md:mr-[3px]"
                  scroll={false}
                  key={j}
                >
                  {issue.assignee && (
                    <Pin className="absolute right-0 top-0 m-2" />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/[0.3] opacity-0 hover:opacity-100">
                    <div className="flex gap-x-7 gap-y-2 max-md:flex-col">
                      <p className="text-base font-bold text-white">
                        <Heart fill="white" height="19px" className="inline" />{" "}
                        {issue.reactions ? issue.reactions.total_count : 0}
                      </p>
                      <p className="text-base font-bold text-white">
                        <Comment
                          fill="white"
                          height="19px"
                          className="inline"
                        />{" "}
                        {issue.comments}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-full overflow-hidden bg-[#efefef] ${lineCount === 3 ? "aspect-square" : "aspect-[65/100]"}`}
                  >
                    {typeof thumbnail === "string" ? (
                      <img className="size-full object-cover" src={thumbnail} />
                    ) : (
                      <div
                        className="flex size-full items-center justify-center"
                        style={bgGradient}
                      >
                        <p className={`break-all p-4 ${lineCount === 3 ? "text-xl" : "text-lg"} font-semibold text-white max-md:text-base`}>
                          {issue.title}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
