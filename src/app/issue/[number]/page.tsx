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
import { hasSpecificLabelToIssue } from "@/utils";
import config from "@/config";
import { Metadata } from "next";
import React from "react";

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

  const issue = issues.find((issue) => issue.number === parseInt(number, 10));

  if (!issue) {
    return <Error />;
  }

  const userInfo = await server.useFetchUserInfo();

  const comments = await server.useFetchIssueComments(number);

  const curIssueType: MenuType = hasSpecificLabelToIssue(
    issue,
    config.github.issues.portfolioLabel,
  )
    ? "포트폴리오"
    : "게시물";

  const moreIssues = issues.filter((issue) => {
    const issueType: MenuType = hasSpecificLabelToIssue(
      issue,
      config.github.issues.portfolioLabel,
    )
      ? "포트폴리오"
      : "게시물";

    return issueType === curIssueType;
  });

  const curIdx = moreIssues.findIndex(
    (issue) => issue.number === parseInt(number, 10),
  );

  const startIdx = curIdx - 3 <= 0 ? 0 : curIdx - 3;

  return (
    <div>
      <ShowMobileLayout>
        <div className="flex h-11 w-full items-center justify-center border-b">
          <p className="font-semibold text-primaryText">게시물</p>
        </div>
      </ShowMobileLayout>

      <div className="mx-auto flex w-full max-w-[815px] border max-md:border-0">
        <HiddenMobileLayout>
          <IssueBanner issue={issue} />
        </HiddenMobileLayout>

        <div className="flex aspect-square w-full flex-col overflow-x-hidden max-md:overflow-x-visible">
          <IssueHeader issue={issue} />

          <div className="w-full flex-1 overflow-x-hidden overflow-y-scroll max-md:flex-none max-md:scrollbar-hide">
            <ShowMobileLayout>
              <IssueBanner issue={issue} />
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

          <IssueFooter issue={issue} />
        </div>
      </div>

      <div className="mt-[48px] w-full border-b" />

      <div className="pt-[42px]">
        <p className="mb-[20px] text-sm font-semibold text-secondaryText">
          <Link href="/" className="text-secondaryButton hover:opacity-50">
            {userInfo.login}
          </Link>
          님의 게시글 더보기
        </p>

        <GridIssues issues={moreIssues.slice(startIdx, startIdx + 6)} />
      </div>
    </div>
  );
}
