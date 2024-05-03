import { getIssueLabels, getIssueThumbnail } from "@/utils";
import uniqolor from "uniqolor";

interface IssueBannerProps {
  issue: Issues[number];
}

export function IssueBanner({ issue }: IssueBannerProps) {
  const { title } = issue;

  const issueLabels = getIssueLabels(issue);

  issueLabels.sort((a, b) => (a < b ? -1 : 1));

  const thumbnail = getIssueThumbnail(issue);

  return (
    <div
      className={`flex h-full w-[300px] overflow-hidden max-md:aspect-square max-md:w-full`}
    >
      {typeof thumbnail === "string" ? (
        <div className="relative flex size-full items-center justify-center">
          <img className="absolute size-full object-cover" src={thumbnail} />
          <div className="absolute size-full backdrop-blur" />
          <img className="absolute object-contain" src={thumbnail} />
        </div>
      ) : (
        <div
          className="flex size-full items-center justify-center p-4 max-md:p-3"
          style={{
            backgroundColor: uniqolor(issueLabels.join("")).color,
          }}
        >
          <div className="flex size-full items-center justify-center rounded-md bg-white p-2">
            <p className="font-euljiro break-all text-4xl text-black">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
