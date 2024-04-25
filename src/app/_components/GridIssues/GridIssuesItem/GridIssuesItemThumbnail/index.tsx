import Image from "next/image";
import randomGradient from "random-gradient";
import { getIssueLabels } from "@/utils";

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

    const bgGradient = {
      background: randomGradient(
        issueLabels.join("") || issue.title,
        "horizontal",
      ),
    };

    return (
      <div
        className="flex size-full items-center justify-center p-4"
        style={bgGradient}
      >
        <p className="break-all font-semibold text-white max-md:text-base">
          {issue.title}
        </p>
      </div>
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
