import React from "react";

import { GridIssuesItemClickLayout } from "./GridIssuesItemClickLayout";
import { GridIssuesItemThumbnail } from "./GridIssuesItemThumbnail";
import { GridIssuesItemCounter } from "./GridIssuesItemCounter";
import { GridIssuesItemPin } from "./GridIssuesItemPin";

interface GridIssuesItemProps {
  issue: Issues[number] | null;
  lineCount: 3 | 4;
  linking: boolean;
  labels: string;
}

export function GridIssuesItem({
  lineCount,
  issue,
  linking,
  labels,
}: GridIssuesItemProps) {
  return (
    <GridIssuesItemLayout lineCount={lineCount}>
      {issue && (
        <GridIssuesItemClickLayout
          href={`/issue/${issue.number}/${labels}`}
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
    <div className="mr-[4px] flex-1 last:mr-auto mobile:mr-[3px]">
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
