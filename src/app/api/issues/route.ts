import { type NextRequest } from "next/server";

import config from "@/config";

export async function GET(request: NextRequest) {
  const page = +(request.nextUrl.searchParams.get("page") || 0);

  const labels = request.nextUrl.searchParams.get("labels") || "";

  if (!page) {
    return Response.json(
      { data: {}, message: "잘못된 요청입니다." },
      { status: 401 },
    );
  }

  const { pinIssues } = await getPinIssues(page, labels);

  const { unpinIssues, isLastPage } = await getUnpinIssuesWithPage(
    page,
    labels,
  );

  const issues: Issues = [...pinIssues, ...unpinIssues];

  return Response.json({
    data: { items: issues, isLastPage },
    message: "OK",
  });
}

async function getUnpinIssuesWithPage(
  page: number,
  labels: string,
): Promise<{ unpinIssues: Issues; isLastPage: boolean }> {
  const unpinSearchParams = new URLSearchParams({
    creator: config.github.owner,

    assignee: "none",

    per_page: `${9}`,
    page: `${page}`,

    labels,
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

  const isLastPage = !response.headers.get("link")?.includes('rel="next"');

  return { unpinIssues, isLastPage };
}

async function getPinIssues(
  page: number,
  labels: string,
): Promise<{ pinIssues: Issues }> {
  if (page !== 1) {
    return { pinIssues: [] };
  }

  const pinSearchParams = new URLSearchParams({
    creator: config.github.owner,

    assignee: config.github.owner,

    /**
     * 고정 페이지는 많아봐야 10개 정도로 생각하기 때문에 `per_page=100`으로 설정한 후 요청을 한번만 보냄.
     */
    per_page: `${100}`,
    page: `${page}`,

    labels,
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

  return { pinIssues };
}
