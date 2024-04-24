import Image from "next/image";
import randomGradient from "random-gradient";
import { getIssueLabels } from "@/utils";

interface GridIssuesItemThumbnailProps {
  issue: Issues[number];
  issueNumberToThumbnail?: Map<number, ThumbnailData>;
  lineCount: 3 | 4;
}

export function GridIssuesItemThumbnail(props: GridIssuesItemThumbnailProps) {
  const { lineCount } = props;

  return (
    <div
      className={`w-full overflow-hidden bg-[#efefef] ${lineCount === 3 ? "aspect-square" : "aspect-[65/100]"}`}
    >
      <GridIssuesItemThumbnailContent {...props} />
    </div>
  );
}

interface GridIssuesItemThumbnailContentProps
  extends GridIssuesItemThumbnailProps {}

function GridIssuesItemThumbnailContent({
  issue,
  issueNumberToThumbnail,
  lineCount,
}: GridIssuesItemThumbnailContentProps) {
  const thumbnail = issueNumberToThumbnail?.get(issue.number);

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
        <p
          className={[
            "break-all font-semibold text-white max-md:text-base",
            lineCount === 3 ? "text-xl" : "text-lg",
          ].join(" ")}
        >
          {issue.title}
        </p>
      </div>
    );
  }

  if (thumbnail.base64) {
    <Image
      fill
      src={thumbnail.url}
      alt=""
      className="object-cover"
      blurDataURL={thumbnail.base64}
      placeholder="blur"
    />;
  }

  return <Image fill src={thumbnail.url} alt="" className="object-cover" />;
}
