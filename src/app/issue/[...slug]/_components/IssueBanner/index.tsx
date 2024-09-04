import { TextThumbnail } from "@/components/widgets/TextThumbnail";
import { getIssueLabels, getIssueThumbnail } from "@/utils";

interface IssueBannerProps {
  issue: Issues[number];
  isModal?: boolean;
}

export function IssueBanner({ issue, isModal = true }: IssueBannerProps) {
  const { title } = issue;

  const issueLabels = getIssueLabels(issue);

  issueLabels.sort((a, b) => (a < b ? -1 : 1));

  const thumbnail = getIssueThumbnail(issue);

  return (
    <div
      className={[
        "mobile:aspect-square mobile:w-full flex h-full overflow-hidden",
        isModal ? "w-[300px]" : "w-[260px]",
      ].join(" ")}
    >
      {typeof thumbnail === "string" ? (
        <div className="relative flex size-full items-center justify-center">
          <img className="absolute size-full object-cover" src={thumbnail} />
          <div className="absolute size-full backdrop-blur" />
          <img className="absolute object-contain" src={thumbnail} />
        </div>
      ) : (
        <TextThumbnail
          text={title}
          textForColor={issueLabels.join("")}
          type="banner"
        />
      )}
    </div>
  );
}
