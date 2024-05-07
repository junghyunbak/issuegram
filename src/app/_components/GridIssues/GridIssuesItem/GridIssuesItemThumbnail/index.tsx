import Image from "next/image";
import { getIssueLabels, getIssueThumbnail } from "@/utils";
import { TextThumbnail } from "@/components/widgets/TextThumbnail";

interface GridIssuesItemThumbnailProps {
  issue: Issues[number];
}

export function GridIssuesItemThumbnail(props: GridIssuesItemThumbnailProps) {
  return (
    <div className={"absolute inset-0 size-full overflow-hidden bg-[#efefef]"}>
      <GridIssuesItemThumbnailContent {...props} />
    </div>
  );
}

interface GridIssuesItemThumbnailContentProps
  extends GridIssuesItemThumbnailProps {}

function GridIssuesItemThumbnailContent({
  issue,
}: GridIssuesItemThumbnailContentProps) {
  const thumbnailUrl = getIssueThumbnail(issue);

  if (!thumbnailUrl) {
    const issueLabels = getIssueLabels(issue).sort((a, b) => (a < b ? -1 : 1));

    return (
      <TextThumbnail text={issue.title} textForColor={issueLabels.join("")} />
    );
  }

  return <Image fill src={thumbnailUrl} alt="" className="object-cover" />;
}
