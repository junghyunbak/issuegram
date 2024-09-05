import ArrowUp from "@/assets/svgs/arrow-up.svg";

import Link from "next/link";

import { SavedIssuesLoader } from "./_components/SavedIssuesLoader";

import { PageLayout } from "@/components/layouts/PageLayout";

interface LabelIssuesProps {
  params: { label: string };
}

export default async function LabelIssues({
  params: { label },
}: LabelIssuesProps) {
  const decodedLabel = decodeURIComponent(label);

  return (
    <PageLayout>
      <div className="mobile:mt-6">
        <Link
          className="mb-4 flex w-fit items-center text-igSecondaryText"
          href="/saved"
        >
          <ArrowUp className="-rotate-90" />
          <p className="p-1 text-sm font-semibold">저장됨</p>
        </Link>

        <p className="px-3 py-2 text-xl">{decodedLabel}</p>

        <SavedIssuesLoader labels={decodedLabel} />
      </div>
    </PageLayout>
  );
}
