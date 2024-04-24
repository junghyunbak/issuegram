import Link from "next/link";
import { GridIssuesItemCounter } from "./GridIssuesItemCounter";
import { GridIssuesItemThumbnail } from "./GridIssuesItemThumbnail";
import { GridIssuesItemPin } from "./GridIssuesItemPin";

interface GridIssuesItemProps {
  issue: Issues[number] | null;
  issueNumberToThumbnail?: Map<number, ThumbnailData>;
  lineCount: 3 | 4;
}

export function GridIssuesItem({
  issue,
  issueNumberToThumbnail,
  lineCount,
}: GridIssuesItemProps) {
  if (!issue) {
    return <div className="flex-1" />;
  }

  return (
    <Link
      href={`/issue/${issue.number}`}
      className="relative mr-[4px] block flex-1 cursor-pointer last:mr-auto max-md:mr-[3px]"
      scroll={false}
    >
      <GridIssuesItemThumbnail
        issue={issue}
        issueNumberToThumbnail={issueNumberToThumbnail}
        lineCount={lineCount}
      />

      <GridIssuesItemPin issue={issue} />

      <GridIssuesItemCounter issue={issue} />
    </Link>
  );
}
