import CommentOutline from "@/assets/svgs/comment-outline.svg";
import HeartOutline from "@/assets/svgs/heart-outline.svg";
import { IssueFooterLike } from "./IssueFooterLike";

interface IssueFooterProps {
  issue: Issues[number];
  issueReactions: Reactions;
}

export function IssueFooter({ issue, issueReactions }: IssueFooterProps) {
  const date = new Date(issue.created_at);

  return (
    <div className="border-igSeparator dark:border-igSeparatorDark w-full border-t p-4">
      <div className="flex gap-[16px] [&_a]:pb-[8px]">
        <a className="active:opacity-50" href={issue.html_url} target="_blank">
          <HeartOutline className="dark:fill-primaryTextDark fill-primaryText" />
        </a>
        <a
          className="active:opacity-50"
          href={`${issue.html_url}#new_comment_form`}
          target="_blank"
        >
          <CommentOutline className="dark:stroke-primaryTextDark stroke-primaryText" />
        </a>
      </div>

      <IssueFooterLike issueReactions={issueReactions} />

      <p className="text-igSecondaryText dark:text-igSecondaryTextDark text-xs">
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
      </p>
    </div>
  );
}
