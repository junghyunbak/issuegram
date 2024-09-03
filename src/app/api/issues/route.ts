import config from "@/config";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");

  if (!page) {
    return Response.json(
      { data: {}, message: "잘못된 요청입니다." },
      { status: 401 },
    );
  }

  const result = await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues?per_page=9&page=${page}&creator=${config.github.owner}`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: ["issues"],
      },
    },
  );

  const issues = (await result.json()) as Issues;

  const isLastPage = !result.headers.get("link")?.includes('rel="next"');

  return Response.json({
    data: { items: issues, isLastPage },
    message: "OK",
  });
}
