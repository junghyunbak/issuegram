import { server } from "@/hooks";
import { IssueBanner } from "./_components/IssueBanner";
import { Error } from "@/components/widgets/Error";
import { IssueHeader } from "./_components/IssueHeader";
import { IssueFooter } from "./_components/IssueFooter";
import { CommentListLayout } from "@/components/layouts/CommentListLayout";
import { Markdown } from "@/components/widgets/Markdown";
import Link from "next/link";
import { GridIssues } from "@/app/_components/GridIssues";
import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";
import { filterIssues, getIssueLabelType } from "@/utils";
import { Metadata } from "next";
import React from "react";
import { IssuePageMobileNav } from "./_components/IssuePageMobileNav";

export async function generateStaticParams() {
  const issues = await server.useFetchIssues();

  return issues.map((issue) => ({ number: issue.number.toString() }));
}

export async function generateMetadata({
  params: { number },
}: {
  params: { number: string };
}): Promise<Metadata> {
  const issue = await server.useFetchAnIssue(number);

  return {
    title: `${issue.title} | Issuegram`,
  };
}

export default async function Issue({
  params: { number },
}: {
  params: { number: string };
}) {
  const issues = await server.useFetchIssues();
  const comments = await server.useFetchIssueComments(number);
  const userInfo = await server.useFetchUserInfo();

  const issue = issues.find((issue) => issue.number === parseInt(number, 10));

  if (!issue) {
    return <Error />;
  }

  const reactions =
    (issue.reactions?.total_count || 0) > 0
      ? await server.useFetchIssueReactions(number)
      : [];

  const filteredIssues = filterIssues(issues, getIssueLabelType(issue)).filter(
    ({ number: issueNumber }) => issueNumber.toString() !== number,
  );

  // [ ]: 현재 인덱스 계산법은 더 많은 게시글을 확인할 수 없다.
  const curIdx = filteredIssues.findIndex((_issue) => _issue === issue);
  const startIdx = curIdx - 3 <= 0 ? 0 : curIdx - 3;

  return (
    <div>
      <div className="mobile:block sticky top-0 z-10 hidden bg-white dark:bg-black">
        <IssuePageMobileNav />
      </div>

      <div className="mobile:border-0 mx-auto flex w-full max-w-[815px] border border-igSeparator dark:border-igSeparatorDark">
        <HiddenMobileLayout>
          <IssueBanner issue={issue} isModal={false} />
        </HiddenMobileLayout>

        <div className="mobile:overflow-x-visible mobile:border-0 flex aspect-square w-full flex-col overflow-x-hidden border-l border-igSeparator dark:border-igSeparatorDark">
          <IssueHeader issue={issue} />

          <div className="mobile:flex-none mobile:scrollbar-hide w-full flex-1 overflow-x-hidden overflow-y-scroll">
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
            {userInfo.login}
          </Link>
          <span className="text-igSecondaryText dark:text-igSecondaryTextDark">
            님의 게시글 더보기
          </span>
        </p>

        <GridIssues
          issues={filteredIssues.slice(startIdx, startIdx + 6)}
          linking={false}
        />
      </div>
    </div>
  );
}
