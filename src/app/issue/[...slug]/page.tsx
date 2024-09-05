import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import { IssueBanner } from "./_components/IssueBanner";
import { IssueHeader } from "./_components/IssueHeader";
import { IssueFooter } from "./_components/IssueFooter";
import { IssuePageMobileNav } from "./_components/IssuePageMobileNav";

import { Error } from "@/components/widgets/Error";
import { Markdown } from "@/components/widgets/Markdown";
import { CommentListLayout } from "@/components/layouts/CommentListLayout";
import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";
import { PageLayout } from "@/components/layouts/PageLayout";

import { GridIssues } from "@/app/_components/GridIssues";

import {
  getAnIssue,
  getIssueComments,
  getIssueReactions,
  getIssues,
  getUserInfo,
} from "@/api";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [number] = slug;

  const { issue } = await getAnIssue(number);

  if (!issue) {
    return {};
  }

  return {
    title: `${issue.title} | Issuegram`,
  };
}

export default async function Issue({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const [number, labels] = slug;

  const { issue } = await getAnIssue(number);

  if (!issue) {
    return <Error />;
  }

  const { comments } = await getIssueComments(number);

  const { reactions } = await getIssueReactions(number);

  const { user } = await getUserInfo();

  const { issues } = await getIssues(labels);

  const curIdx = issues.findIndex(
    ({ number: issueNumber }) => issueNumber === +number,
  );
  const startIdx = curIdx - 3 <= 0 ? 0 : curIdx - 3;

  return (
    <PageLayout>
      <div className="sticky top-0 z-10 hidden bg-white mobile:block dark:bg-black">
        <IssuePageMobileNav />
      </div>

      <div className="mx-auto flex w-full max-w-[815px] border border-igSeparator mobile:border-0 dark:border-igSeparatorDark">
        <HiddenMobileLayout>
          <IssueBanner issue={issue} isModal={false} />
        </HiddenMobileLayout>

        <div className="flex aspect-square w-full flex-col overflow-x-hidden border-l border-igSeparator mobile:overflow-x-visible mobile:border-0 dark:border-igSeparatorDark">
          <IssueHeader issue={issue} />

          <div className="w-full flex-1 overflow-x-hidden overflow-y-scroll mobile:flex-none mobile:scrollbar-hide">
            <ShowMobileLayout>
              <IssueBanner issue={issue} />
            </ShowMobileLayout>

            <ShowMobileLayout>
              <IssueFooter issue={issue} issueReactions={reactions} />
            </ShowMobileLayout>

            <CommentListLayout>
              <Markdown markdown={issue.body || ""} />

              {comments.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    style={
                      {
                        "--profile-image": `url("${comment.user?.avatar_url}")`,
                        "--user-name": `"${comment.user?.login} "`,
                      } as React.CSSProperties
                    }
                  >
                    <Markdown markdown={comment.body || ""} />
                  </div>
                );
              })}
            </CommentListLayout>
          </div>

          <HiddenMobileLayout>
            <IssueFooter issue={issue} issueReactions={reactions} />
          </HiddenMobileLayout>
        </div>
      </div>

      <div className="mt-[48px] w-full border-b border-igSeparator dark:border-igSeparatorDark" />

      <div className="pt-[42px]">
        <p className="mb-[20px] text-sm font-semibold">
          <Link href="/" className="hover:opacity-50">
            {user.login}
          </Link>
          <span className="text-igSecondaryText dark:text-igSecondaryTextDark">
            님의 게시글 더보기
          </span>
        </p>

        <GridIssues
          issues={issues.slice(startIdx, startIdx + 6)}
          linking={false}
          labels={labels}
        />
      </div>
    </PageLayout>
  );
}
