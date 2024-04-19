import CommentOutline from "@/assets/svgs/comment-outline.svg";
import HeartOutline from "@/assets/svgs/heart-outline.svg";

interface IssueFooterProps {
  issue: Issues[number];
  issueReactions: Reactions;
}

export function IssueFooter({ issue, issueReactions }: IssueFooterProps) {
  const date = new Date(issue.created_at);

  return (
    <div className="w-full border-t p-4">
      <div className="flex gap-[16px] [&_a]:pb-[8px]">
        <a className="active:opacity-50" href={issue.html_url} target="_blank">
          <HeartOutline />
        </a>
        <a
          className="active:opacity-50"
          href={`${issue.html_url}#new_comment_form`}
          target="_blank"
        >
          <CommentOutline />
        </a>
      </div>

      <div className="mb-[4px] flex">
        <ul className="flex">
          {issueReactions.slice(0, 3).map((issueReaction) => {
            return (
              <li
                key={issueReaction.id}
                className="-mr-[5px] h-[20px] w-[20px] overflow-hidden rounded-full"
              >
                <img
                  src={issueReaction.user?.avatar_url}
                  className="size-full"
                />
              </li>
            );
          })}
        </ul>

        {issueReactions.length > 0 && <div className="w-[9px]" />}

        <p className="text-sm">
          {issueReactions.length >= 2 && (
            <>
              <span className="font-semibold">
                {issueReactions[issueReactions.length - 1].user?.login}
              </span>
              님<span className="font-semibold"> 외 </span>
            </>
          )}
          <span className="font-semibold">
            {issueReactions.length >= 2
              ? issueReactions.length - 1
              : issueReactions.length}
            명
          </span>
          이 좋아합니다.
        </p>
      </div>

      <p className="text-xs text-[#737373]">
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
      </p>
    </div>
  );
}
