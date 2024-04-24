import { GridIssuesItem } from "./GridIssuesItem";
import { getIssuesBase64Thumbnail } from "@/utils";

interface GridIssuesProps {
  issues: Issues;
  lineCount?: 3 | 4;
}

export async function GridIssues({ issues, lineCount = 3 }: GridIssuesProps) {
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
    <div className="flex flex-col">
      {issuesRows.map((issuesRow, i) => (
        <GridIssuesRow
          issuesRow={issuesRow}
          key={i}
          issueNumberToThumbnail={issueNumberToThumbnail}
        />
      ))}
    </div>
  );
}

interface GridIssuesRowProps {
  issuesRow: (Issues[number] | null)[];
  issueNumberToThumbnail?: Map<number, ThumbnailData>;
}

function GridIssuesRow({
  issuesRow,
  issueNumberToThumbnail,
}: GridIssuesRowProps) {
  return (
    <div className="mb-[4px] flex w-full max-md:mb-[3px]">
      {issuesRow.map((issue, i) => (
        <GridIssuesItem
          issue={issue}
          key={i}
          issueNumberToThumbnail={issueNumberToThumbnail}
        />
      ))}
    </div>
  );
}
