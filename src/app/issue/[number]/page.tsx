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
import ArrowUpLarge from "@/assets/svgs/arrow-up-large.svg";
import React from "react";

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

  const filteredIssues = filterIssues(issues, getIssueLabelType(issue));

  const curIdx = filteredIssues.findIndex((_issue) => _issue === issue);
  const startIdx = curIdx - 3 <= 0 ? 0 : curIdx - 3;

  return (
    <div>
      <ShowMobileLayout>
        <div className="flex h-11 w-full items-center justify-between border-b border-igElevatedSeparator px-[16px] dark:border-igElevatedSeparatorDark">
          <Link href="/">
            <ArrowUpLarge className="-rotate-90 transform" />
          </Link>
          <p className="font-semibold">게시물</p>
          <div className="w-[24px]" />
        </div>
      </ShowMobileLayout>

      <div className="mx-auto flex w-full max-w-[815px] border border-igSeparator max-md:border-0 dark:border-igSeparatorDark">
        <HiddenMobileLayout>
          <IssueBanner issue={issue} />
        </HiddenMobileLayout>

        <div className="flex aspect-square w-full flex-col overflow-x-hidden border-l border-igSeparator max-md:overflow-x-visible max-md:border-0 dark:border-igSeparatorDark">
          <IssueHeader issue={issue} />

          <div className="w-full flex-1 overflow-x-hidden overflow-y-scroll max-md:flex-none max-md:scrollbar-hide">
            <ShowMobileLayout>
              <IssueBanner issue={issue} />
            </ShowMobileLayout>

            <ShowMobileLayout>
              <IssueFooter issue={issue} issueReactions={reactions} />
            </ShowMobileLayout>

            <CommentListLayout>
              <Markdown markdown={issue.body || ""} enableFragmentLink={false}/>

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

        <GridIssues issues={filteredIssues.slice(startIdx, startIdx + 6)} />
      </div>
    </div>
  );
}
