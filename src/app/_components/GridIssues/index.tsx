import { GridIssuesItem } from "./GridIssuesItem";
import { getIssuesBase64Thumbnail } from "@/utils";

interface GridIssuesProps {
  issues: Issues;
  lineCount?: 3 | 4;
  linking?: boolean;
}

export async function GridIssues({
  issues,
  lineCount = 3,
  linking = true,
}: GridIssuesProps) {
  const issueNumberToThumbnail = await getIssuesBase64Thumbnail(issues);

  const issuesRows: (Issues[number] | null)[][] = [];

  for (let i = 0; i < issues.length; i += lineCount) {
    const slices = issues.slice(i, i + lineCount);

    issuesRows.push([
      ...slices,
      ...Array(lineCount - slices.length).fill(null),
    ]);
  }

  return (
    <div className="flex w-full flex-col">
      {issuesRows.map((issuesRow, i) => (
        <div className="mb-[4px] flex w-full max-md:mb-[3px]" key={i}>
          {issuesRow.map((issue, j) => (
            <GridIssuesItem
              key={j}
              issue={issue}
              linking={linking}
              lineCount={lineCount}
              issueNumberToThumbnail={issueNumberToThumbnail}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
