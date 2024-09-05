import { GridIssuesItem } from "./GridIssuesItem";

interface GridIssuesProps {
  issues: Issues;

  /**
   * default: 3
   *
   * 한 행(row)에 들어갈 피드 개수
   */
  lineCount?: 3 | 4;

  /**
   * default: true
   *
   * next router를 사용하여 페이지 이동할 지 여부
   */
  linking?: boolean;

  labels?: string;
}

export function GridIssues({
  issues,
  lineCount = 3,
  linking = true,
  labels = "",
}: GridIssuesProps) {
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
        <div className="mb-[4px] flex w-full mobile:mb-[3px]" key={i}>
          {issuesRow.map((issue, j) => (
            <GridIssuesItem
              key={j}
              issue={issue}
              linking={linking}
              lineCount={lineCount}
              labels={labels}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
