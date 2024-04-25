import Link from "next/link";
import { GridIssuesItemCounter } from "./GridIssuesItemCounter";
import { GridIssuesItemThumbnail } from "./GridIssuesItemThumbnail";
import { GridIssuesItemPin } from "./GridIssuesItemPin";

interface GridIssuesItemProps {
  issue: Issues[number] | null;
  issueNumberToThumbnail: Map<number, ThumbnailData>;
  lineCount: 3 | 4;
}

export function GridIssuesItem({ lineCount, ...props }: GridIssuesItemProps) {
  return (
    <div className="mr-[4px] flex-1 last:mr-auto max-md:mr-[3px]">
      <div
        className={[
          "relative",
          lineCount === 3 ? "pt-[100%] text-xl" : "pt-[153%] text-lg",
        ].join(" ")}
      >
        <GridIssueItemContent {...props} />
      </div>
    </div>
  );
}

interface GridIssueItemContentProps
  extends Omit<GridIssuesItemProps, "lineCount"> {}

export function GridIssueItemContent({
  issue,
  issueNumberToThumbnail,
}: GridIssueItemContentProps) {
  if (!issue) {
    return null;
  }

  const thumbnail = issueNumberToThumbnail?.get(issue.number);

  return (
    <Link
      href={`/issue/${issue.number}`}
      className="block size-full"
      scroll={false}
    >
      <GridIssuesItemThumbnail issue={issue} thumbnail={thumbnail} />
      <GridIssuesItemPin issue={issue} />
      <GridIssuesItemCounter issue={issue} />
    </Link>
  );
}
