import Heart from "@/assets/svgs/heart.svg";
import Comment from "@/assets/svgs/comment.svg";

interface GridIssuesItemCounterProps {
  issue: Issues[number];
}

export function GridIssuesItemCounter({ issue }: GridIssuesItemCounterProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/[0.3] opacity-0 hover:opacity-100">
      <div className="mobile:flex-col flex gap-x-7 gap-y-2">
        {issue.reactions && issue.reactions.total_count !== 0 && (
          <div className="flex items-center gap-x-[7px] text-white">
            <Heart height="19px" />

            <p className="text-base font-bold">{issue.reactions.total_count}</p>
          </div>
        )}

        <div className="flex items-center gap-x-[7px] text-white">
          <Comment height="19px" />

          <p className="text-base font-bold">{issue.comments}</p>
        </div>
      </div>
    </div>
  );
}
