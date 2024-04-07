import { server } from "@/hooks";
import { RouteModal } from "@/components/layouts/RouteModal";
import { Markdown } from "@/components/widgets/Markdown";
import { hasSpecificLabelToIssue } from "@/utils";
import config from "@/config";
import { IssueBanner } from "@/app/issue/[number]/_components/IssueBanner";
import { IssueHeader } from "@/app/issue/[number]/_components/IssueHeader";
import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";
import { CommentListLayout } from "@/components/layouts/CommentListLayout";
import { IssueFooter } from "@/app/issue/[number]/_components/IssueFooter";
import { IssueModalRouteButton } from "./_components/IssueModalRouteButton";
import { IssueModalLayout } from "./_components/IssueModalLayout";

export default async function ModalIssue({
  params: { number },
}: {
  params: { number: string };
}) {
  const issues = await server.useFetchIssues();

  const curIdx = issues.findIndex(
    (issue) => issue.number === parseInt(number, 10),
  );

  const issue = issues[curIdx];

  if (!issue) {
    return null;
  }

  const curIssueType: MenuType = hasSpecificLabelToIssue(
    issue,
    config.github.issues.portfolioLabel,
  )
    ? "포트폴리오"
    : "게시물";

  let prevIdx = -1;
  let nextIdx = -1;

  for (let i = curIdx - 1; i >= 0; i--) {
    const prevIssueType: MenuType = hasSpecificLabelToIssue(
      issues[i],
      config.github.issues.portfolioLabel,
    )
      ? "포트폴리오"
      : "게시물";

    if (prevIssueType === curIssueType) {
      prevIdx = i;

      break;
    }
  }

  for (let i = curIdx + 1; i < issues.length; i++) {
    const prevIssueType: MenuType = hasSpecificLabelToIssue(
      issues[i],
      config.github.issues.portfolioLabel,
    )
      ? "포트폴리오"
      : "게시물";

    if (prevIssueType === curIssueType) {
      nextIdx = i;

      break;
    }
  }

  return (
    <RouteModal>
      <>
        <div className="absolute left-[10px]">
          <IssueModalRouteButton
            href={
              prevIdx === -1 ? undefined : `/issue/${issues[prevIdx].number}`
            }
            direction="left"
          />
        </div>

        <IssueModalLayout>
          <HiddenMobileLayout>
            <IssueBanner issue={issue} />
          </HiddenMobileLayout>

          <div className="flex aspect-square w-[45dvw] flex-col max-md:aspect-auto max-md:w-[320px]">
            <IssueHeader issue={issue} />

            <div className="flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide max-md:h-[50dvh] max-md:flex-none">
              <ShowMobileLayout>
                <IssueBanner issue={issue} />
              </ShowMobileLayout>

              <CommentListLayout>
                <Markdown markdown={issue.body || ""} />
              </CommentListLayout>
            </div>

            <IssueFooter issue={issue} />
          </div>
        </IssueModalLayout>

        <div className="absolute right-[10px]">
          <IssueModalRouteButton
            href={
              nextIdx === -1 ? undefined : `/issue/${issues[nextIdx].number}`
            }
            direction="right"
          />
        </div>
      </>
    </RouteModal>
  );
}