import "./index.css";

interface IssueFooterLikeProps {
  issueReactions: Reactions;
}

export function IssueFooterLike({ issueReactions }: IssueFooterLikeProps) {
  if (issueReactions.length === 0) {
    return (
      <div className="mb-[4px]">
        <p className="footer-like-text">
          가장 먼저 <span>좋아요</span>를 눌러보세요
        </p>
      </div>
    );
  }

  if (issueReactions.length === 1) {
    return (
      <div className="mb-[4px] flex">
        <div className="footer-like-user-icon">
          <img src={issueReactions[0].user?.avatar_url} />
        </div>

        <div className="w-[9px]" />

        <p className="footer-like-text">
          <span>좋아요 1개</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mb-[4px] flex">
      <div className="flex">
        {issueReactions.slice(0, 3).map((issueReaction) => {
          return (
            <div key={issueReaction.id} className="footer-like-user-icon">
              <img src={issueReaction.user?.avatar_url} />
            </div>
          );
        })}
      </div>

      <div className="w-[9px]" />

      <p className="footer-like-text">
        <span>{issueReactions[issueReactions.length - 1].user?.login}</span>님
        <span> 외 </span>
        <span>{issueReactions.length - 1}명</span>이 좋아합니다.
      </p>
    </div>
  );
}
