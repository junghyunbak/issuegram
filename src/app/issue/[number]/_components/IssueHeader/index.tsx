import { IssueHeaderMenu } from "./IssueHeaderMenu";

interface IssueHeaderProps {
  issue: Issues[number];
}

// [ ]: 넘치는 title 말줄임 처리할 것

export function IssueHeader({ issue }: IssueHeaderProps) {
  return (
    <div className="flex justify-between border-b p-[14px] pr-[8px]">
      <div className="flex flex-1 items-center overflow-hidden">
        <img
          className="h-[32px] w-[32px] rounded-full border"
          src={issue.user ? issue.user.avatar_url : ""}
        />

        <div className="ml-[14px]">
          <p className="text-sm font-semibold">
            {issue.user ? issue.user.login : ""}
          </p>
          <p className="whitespace-nowrap text-xs">{issue.title}</p>
        </div>
      </div>

      <IssueHeaderMenu issue={issue} />
    </div>
  );
}
