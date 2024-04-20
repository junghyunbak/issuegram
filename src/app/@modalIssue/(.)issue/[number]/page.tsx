import { server } from "@/hooks";
import { RouteModal } from "@/components/layouts/RouteModal";
import { Markdown } from "@/components/widgets/Markdown";
import { filterIssues, getIssueLabelType } from "@/utils";
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
  const comments = await server.useFetchIssueComments(number);

  const issue = issues.find((issue) => issue.number === parseInt(number, 10));

  if (!issue) {
    return null;
  }

  const reactions =
    (issue.reactions?.total_count || 0) > 0
      ? await server.useFetchIssueReactions(number)
      : [];

  const filteredIssues = filterIssues(issues, getIssueLabelType(issue));

  const curIdx = filteredIssues.findIndex((_issue) => _issue === issue);

  const prevIdx = curIdx - 1 < 0 ? -1 : curIdx - 1;
  const nextIdx = curIdx + 1 > filteredIssues.length - 1 ? -1 : curIdx + 1;

  return (
    <RouteModal>
      <>
        <div className="absolute left-[10px] z-30">
          <IssueModalRouteButton
            href={
              prevIdx === -1
                ? undefined
                : `/issue/${filteredIssues[prevIdx].number}`
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

            <div className="flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide max-md:h-[65dvh] max-md:flex-none">
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
        </IssueModalLayout>

        <div className="absolute right-[10px] z-30">
          <IssueModalRouteButton
            href={
              nextIdx === -1
                ? undefined
                : `/issue/${filteredIssues[nextIdx].number}`
            }
            direction="right"
          />
        </div>
      </>
    </RouteModal>
  );
}
