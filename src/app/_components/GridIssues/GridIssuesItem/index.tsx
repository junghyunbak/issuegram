import { GridIssuesItemCounter } from "./GridIssuesItemCounter";
import { GridIssuesItemThumbnail } from "./GridIssuesItemThumbnail";
import { GridIssuesItemPin } from "./GridIssuesItemPin";
import React from "react";
import { GridIssuesItemClickLayout } from "./GridIssuesItemClickLayout";

interface GridIssuesItemProps {
  issue: Issues[number] | null;
  lineCount: 3 | 4;
  linking: boolean;
}

export function GridIssuesItem({
  lineCount,
  issue,
  linking,
}: GridIssuesItemProps) {
  return (
    <GridIssuesItemLayout lineCount={lineCount}>
      {issue && (
        <GridIssuesItemClickLayout
          href={`/issue/${issue.number}`}
          linking={linking}
        >
          <GridIssuesItemThumbnail issue={issue} />
          <GridIssuesItemPin issue={issue} />
          <GridIssuesItemCounter issue={issue} />
        </GridIssuesItemClickLayout>
      )}
    </GridIssuesItemLayout>
  );
}

function GridIssuesItemLayout({
  children,
  lineCount,
}: {
  children: React.ReactNode;
  lineCount: 3 | 4;
}) {
  return (
    <div className="mobile:mr-[3px] mr-[4px] flex-1 last:mr-auto">
      <div
        className={[
          "relative",
          lineCount === 3 ? "pt-[100%] text-xl" : "pt-[153%] text-lg",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
