import CommentOutline from "@/assets/svgs/comment-outline.svg";
import HeartOutline from "@/assets/svgs/heart-outline.svg";

interface IssueFooterProps {
  issue: Issues[number];
}

export function IssueFooter({ issue }: IssueFooterProps) {
  const date = new Date(issue.created_at);

  return (
    <div className="border-t p-4">
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
      <p className="text-sm">
        <span className="font-semibold">
          {issue.reactions ? issue.reactions.total_count : 0}명
        </span>
        이 좋아합니다.
      </p>
      <p className="text-xs text-[#737373]">
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
      </p>
    </div>
  );
}
