import Image from "next/image";
import { getIssueLabels } from "@/utils";
import { TextThumbnail } from "@/components/widgets/TextThumbnail";

interface GridIssuesItemThumbnailProps {
  issue: Issues[number];
  thumbnail?: ThumbnailData;
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
  thumbnail,
}: GridIssuesItemThumbnailContentProps) {
  if (!thumbnail) {
    const issueLabels = getIssueLabels(issue).sort((a, b) => (a < b ? -1 : 1));

    return (
      <TextThumbnail text={issue.title} textForColor={issueLabels.join("")} />
    );
  }

  if (thumbnail.base64) {
    return (
      <Image
        fill
        src={thumbnail.url}
        alt=""
        style={{ objectFit: "cover" }}
        blurDataURL={thumbnail.base64}
        placeholder="blur"
      />
    );
  }

  return <Image fill src={thumbnail.url} alt="" className="object-cover" />;
}
