import { getIssues } from "@/api";

import config from "@/config";

export const dynamic = "force-dynamic";

export async function GET() {
  /**
   * nginx reverse proxy로 인해 origin이 localhost로 찍히는 이슈가 있어 도메인을 하드코딩함.
   */
  const mainSitemap = createUrlInfomation({
    location: `https://${config.domain}`,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  const portfolioSitemap = createUrlInfomation({
    location: `https://${config.domain}/portfolio`,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  const savedSitemap = createUrlInfomation({
    location: `https://${config.domain}/saved`,
    changeFrequency: "weekly",
  });

  const { issues } = await getIssues();

  const issueSitemaps: string[] = [];

  issues.forEach((issue) => {
    issueSitemaps.push(
      createUrlInfomation({
        location: `https://${config.domain}/issue/${issue.number}`,
        changeFrequency: "weekly",
        lastModify: new Date(issue.updated_at),
        priority: 1.0,
      }),
    );
  });

  return new Response(
    `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${mainSitemap}
      ${portfolioSitemap}
      ${savedSitemap}
      ${issueSitemaps.join("\n")}
    </urlset>
  `,
    {
      headers: {
        "Content-Type": "text/xml",
      },
    },
  );
}

function createUrlInfomation({
  location,
  lastModify,
  changeFrequency,
  priority,
}: {
  location: string;
  lastModify?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}) {
  const attributes = [`<loc>${location}</loc>`];

  if (lastModify) {
    attributes.push(
      `<lastmod>${lastModify.getFullYear()}-${(lastModify.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${lastModify
        .getDate()
        .toString()
        .padStart(2, "0")}</lastmod>`,
    );
  }

  if (changeFrequency) {
    attributes.push(`<changefreq>${changeFrequency}</changefreq>`);
  }

  if (priority) {
    attributes.push(`<priority>${priority}</priority>`);
  }

  return `
    <url>
      ${attributes.join("\n")}
    </url>
  `;
}
