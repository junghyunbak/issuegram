interface IssueHeaderProps {
  issue: Issues[number];
}

export function IssueHeader({ issue }: IssueHeaderProps) {
  return (
    <div className="flex items-center border-b p-[14px]">
      <img
        className="h-[32px] w-[32px] rounded-full"
        src={issue.user ? issue.user.avatar_url : ""}
      />

      <div className="ml-[14px]">
        <p className="text-sm font-semibold">
          {issue.user ? issue.user.login : ""}
        </p>
        <p className="text-xs">{issue.title}</p>
      </div>
    </div>
  );
}
