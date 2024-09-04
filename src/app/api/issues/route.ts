import config from "@/config";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");

  const labels = request.nextUrl.searchParams.get("labels") || "";

  if (!page) {
    return Response.json(
      { data: {}, message: "잘못된 요청입니다." },
      { status: 401 },
    );
  }

  const commonParams: Record<string, string> = {
    page: page,
    creator: config.github.owner,
    labels,
  };

  /**
   * 고정되지 않은(assignee: none) 이슈 데이터 로드
   */
  const getUnpinIssues = async () => {
    const unpinSearchParams = new URLSearchParams({
      ...commonParams,
      per_page: `${9}`,
      assignee: "none",
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
  };

  /**
   * 고정된 이슈 데이터 로드
   *
   * 단, 페이지가 1일 경우에만 유효한 데이터를 리턴
   */
  const getPinIssues = async () => {
    if (page !== (1).toString()) {
      return { pinIssues: [] };
    }

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

    return { pinIssues };
  };

  const { unpinIssues, isLastPage } = await getUnpinIssues();

  const { pinIssues } = await getPinIssues();

  const issues: Issues = [...pinIssues, ...unpinIssues];

  return Response.json({
    data: { items: issues, isLastPage },
    message: "OK",
  });
}
