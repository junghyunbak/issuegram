import Pin from "@/assets/svgs/pin.svg";

interface GridIssuesItemPinProps {
  issue: Issues[number];
}

export function GridIssuesItemPin({ issue }: GridIssuesItemPinProps) {
  if (!issue.assignee) {
    return null;
  }

  return (
    <div className="absolute right-0 top-0 m-2">
      <Pin className="text-white" />
    </div>
  );
}
