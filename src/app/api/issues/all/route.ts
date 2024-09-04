import config from "@/config";

export async function GET() {
  let issues: Issues = [];

  let isLastPage: boolean;

  let page = 1;

  do {
    const unpinSearchParams = new URLSearchParams({
      creator: config.github.owner,
      per_page: `${100}`,
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

  return Response.json({
    data: {
      items: issues,
    },
    message: "OK",
  });
}
