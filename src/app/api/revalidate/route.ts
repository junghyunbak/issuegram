import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import type { IssueCommentEvent, IssuesEvent } from "@octokit/webhooks-types";

export async function POST(request: NextRequest) {
  const secretToken = (/\?secret=([a-z0-9]+)/.exec(request.url) || [])[1];

  if (process.env.REVALIDATE_SECRET_TOKEN !== secretToken) {
    return Response.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 },
    );
  }

  switch (request.headers.get("x-github-event")) {
    case "issue_comment": {
      const payload = (await request.json()) as IssueCommentEvent;

      revalidateTag("issues");
      revalidateTag(`issue-${payload.issue.number}-comments`);

      break;
    }

    case "issues": {
      const payload = (await request.json()) as IssuesEvent;

      revalidateTag("issues");
      revalidateTag(`issue-${payload.issue.number}`);

      break;
    }

    default:
      break;
  }

  return Response.json({ data: "갱신되었습니다." });
}
