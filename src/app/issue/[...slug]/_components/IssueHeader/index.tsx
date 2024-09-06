import { IssueHeaderMenu } from "./IssueHeaderMenu";

interface IssueHeaderProps {
  issue: Issues[number];
}

export function IssueHeader({ issue }: IssueHeaderProps) {
  return (
    <div className="flex w-full border-b border-igSeparator p-[14px] pr-[8px] dark:border-igSeparatorDark">
      <div className="flex flex-grow items-center gap-[14px] overflow-hidden">
        <img
          className="h-[32px] w-[32px] rounded-full"
          src={issue.user ? issue.user.avatar_url : ""}
        />

        <div className="flex-grow overflow-hidden">
          <p className="truncate text-sm font-semibold">
            {issue.user ? issue.user.login : ""}
          </p>
          <p className="truncate whitespace-nowrap text-xs">{issue.title}</p>
        </div>
      </div>

      <IssueHeaderMenu issue={issue} />
    </div>
  );
}
