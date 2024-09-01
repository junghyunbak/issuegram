import { GridIssues } from "@/app/_components/GridIssues";
import * as server from "@/hooks/server";
import { filterIssues, getIssueLabels } from "@/utils";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import Link from "next/link";

export async function generateStaticParams() {
  const issues = await server.useFetchIssues();

  const labels = Array.from(
    new Set(
      filterIssues(issues, "saved").reduce<string[]>(
        (a, issue) => [...a, ...getIssueLabels(issue)],
        [],
      ),
    ),
  );

  return labels.map((label) => ({ label }));
}

interface LabelIssuesProps {
  params: { label: string };
}

export default async function LabelIssues({
  params: { label },
}: LabelIssuesProps) {
  const issues = await server.useFetchIssues();

  const decodedLabel = decodeURIComponent(label);

  const filteredIssue = filterIssues(issues, "saved").filter((issue) => {
    const labels = getIssueLabels(issue);

    return labels.includes(decodedLabel);
  });

  return (
    <div>
      <Link
        className="flex items-center pb-4 text-igSecondaryText"
        href="/saved"
      >
        <ArrowUp className="-rotate-90" />
        <p className="p-1 text-sm font-semibold">저장됨</p>
      </Link>

      <p className="p-3 text-xl">{decodedLabel}</p>

      <GridIssues issues={filteredIssue} />
    </div>
  );
}
