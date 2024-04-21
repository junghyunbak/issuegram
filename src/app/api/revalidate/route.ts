import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import type { IssueCommentEvent, IssuesEvent } from "@octokit/webhooks-types";
import * as crypto from "crypto";

const WEBHOOK_SECRET: string = process.env.REVALIDATE_SECRET_TOKEN || "";

/**
 * https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries#typescript-example
 */
const verify_signature = (req: Request) => {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  let trusted = Buffer.from(`sha256=${signature}`, "ascii");
  let untrusted = Buffer.from(
    req.headers.get("x-hub-signature-256") || "",
    "ascii",
  );

  return crypto.timingSafeEqual(trusted, untrusted);
};

export async function POST(request: NextRequest) {
  if (!verify_signature(request)) {
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
