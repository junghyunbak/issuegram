import config from "@/config";
import { type NextRequest } from "next/server";

/**
 * 특정 이슈의 인덱스를 계산할 수 있는 방법이 없기 때문에,
 *
 * 존재하는 모든 이슈를 가져와 계산하여 반환하고 있다.
 *
 * 이슈의 개수가 많지 않고, 캐싱이 가능하기 때문에 성능상 문제는 크게 없다.
 */
export async function GET(
  request: NextRequest,
  context: { params: { number: string } },
) {
  const labels = request.nextUrl.searchParams.get("labels") || "";

  const issueNumber = +context.params.number;

  const commonParams: Record<string, string> = {
    creator: config.github.owner,
    labels,
  };

  const getUnpinIssues = async () => {
    let issues: Issues = [];

    let isLastPage: boolean;

    let page = 1;

    do {
      const unpinSearchParams = new URLSearchParams({
        ...commonParams,
        per_page: `${100}`,
        assignee: "none",
        page: `${page}`,
      });

      const response = await fetch(
        `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues?${unpinSearchParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${config.github.accessToken}` },
          next: {
            tags: ["issues"],
          },
          cache: "force-cache",
        },
      );

      const unpinIssues = (await response.json()) as Issues;

      isLastPage = !response.headers.get("link")?.includes('rel="next"');

      issues = issues.concat(...unpinIssues);

      page++;
    } while (!isLastPage);

    return issues;
  };

  const getPinIssues = async () => {
    const pinSearchParams = new URLSearchParams({
      ...commonParams,
      assignee: config.github.owner,
    });

    const response = await fetch(
      `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues?${pinSearchParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${config.github.accessToken}` },
        next: {
          tags: ["issues"],
        },
        cache: "force-cache",
      },
    );

    const pinIssues = (await response.json()) as Issues;

    return pinIssues;
  };

  const pinIssues = await getPinIssues();

  const unpinIssues = await getUnpinIssues();

  const allIssues: Issues = [...pinIssues, ...unpinIssues];

  const idx = allIssues.findIndex(({ number }) => number === issueNumber);

  return Response.json({
    data: {
      issue: allIssues[idx],
      prevIssue: allIssues[idx - 1],
      nextIssue: allIssues[idx + 1],
    },
    message: "OK",
  });
}
