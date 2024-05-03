import Image from "next/image";
import { getIssueLabels } from "@/utils";
import uniqolor from "uniqolor";

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
      <div
        className="flex size-full items-center justify-center p-3 max-md:p-2"
        style={{
          backgroundColor: uniqolor(issueLabels.join("")).color,
        }}
      >
        <div className="flex size-full items-center justify-center rounded-md bg-white p-2">
          <p className="font-euljiro break-all text-3xl text-black max-md:text-xl">
            {issue.title}
          </p>
        </div>
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
