import { IssueBanner } from "@/app/issue/[...slug]/_components/IssueBanner";
import { IssueHeader } from "@/app/issue/[...slug]/_components/IssueHeader";
import { IssueFooter } from "@/app/issue/[...slug]/_components/IssueFooter";

import { RouteModal } from "@/components/layouts/RouteModal";
import { Markdown } from "@/components/widgets/Markdown";
import { CommentListLayout } from "@/components/layouts/CommentListLayout";
import { responsive } from "@/components/layouts/ResponsiveLayout";

import { IssueModalRouteButton } from "./_components/IssueModalRouteButton";
import { IssueModalLayout } from "./_components/IssueModalLayout";

import { getAnIssue, getIssueComments, getIssueReactions } from "@/api";

export default async function ModalIssue({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const number = slug[0];

  const labels = slug[1] || "";

  const { issue, nextIssue, prevIssue } = await getAnIssue(number, labels);

  const { comments } = await getIssueComments(number);

  const { reactions } = await getIssueReactions(number);

  if (!issue) {
    return null;
  }

  return (
    <RouteModal>
      <div className="absolute left-[10px] z-30">
        {prevIssue && (
          <IssueModalRouteButton
            href={`/issue/${prevIssue.number}/${labels}`}
            direction="left"
          />
        )}
      </div>

      <IssueModalLayout>
        <responsive.mobile.x.div>
          <IssueBanner issue={issue} />
        </responsive.mobile.x.div>

        <div className="flex aspect-square w-[45dvw] flex-col border-l border-igSeparator mobile:aspect-auto mobile:w-[320px] mobile:border-0 dark:border-igSeparatorDark">
          <IssueHeader issue={issue} />

          <div className=" flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide mobile:h-[65dvh] mobile:flex-none">
            <responsive.mobile.div className="flex flex-col">
              <IssueBanner issue={issue} />
              <IssueFooter issue={issue} issueReactions={reactions} />
            </responsive.mobile.div>

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

          <responsive.mobile.x.div>
            <IssueFooter issue={issue} issueReactions={reactions} />
          </responsive.mobile.x.div>
        </div>
      </IssueModalLayout>

      <div className="absolute right-[10px] z-30">
        {nextIssue && (
          <IssueModalRouteButton
            href={`/issue/${nextIssue.number}/${labels}`}
            direction="right"
          />
        )}
      </div>
    </RouteModal>
  );
}
