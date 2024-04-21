import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import type { IssueCommentEvent, IssuesEvent } from "@octokit/webhooks-types";

export async function POST(request: NextRequest) {
  if (
    process.env.REVALIDATE_SECRET_TOKEN !==
    request.nextUrl.searchParams.get("secret")
  ) {
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
      // BUG: reactions의 경우 webhook 에서 지원하지 않아, 현재는 의미가 없는 코드
      revalidateTag(`issue-${payload.issue.number}-reactions`);

      break;
    }

    case "push": {
      revalidateTag("intro-readme");
    }

    default:
      break;
  }

  return Response.json({ data: "갱신되었습니다." });
}
