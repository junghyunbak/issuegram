import { type Metadata } from "next";
import Link from "next/link";

import { Menu } from "../_components/Menu";
import { Header } from "../_components/Header";

import { TextThumbnail } from "@/components/widgets/TextThumbnail";
import { PageLayout } from "@/components/layouts/PageLayout";

import { getIssueLabels, getIssueThumbnail } from "@/utils";

import { getIssues, getUserInfo } from "@/api";

import "./page.css";

export async function generateMetadata(): Promise<Metadata> {
  const { user } = await getUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 저장됨`,
  };
}

export default async function Saved() {
  const { issues } = await getIssues();

  const labelToIssues = new Map<string, Issues>();

  issues.forEach((issue) => {
    const labels = getIssueLabels(issue);

    labels.forEach((label) => {
      if (!labelToIssues.has(label)) {
        labelToIssues.set(label, []);
      }

      labelToIssues.get(label)?.push(issue);
    });
  });

  return (
    <PageLayout>
      <Header />

      <Menu type="saved" />

      <ul className="flex flex-wrap mobile:px-4 mobileToTablet:[&>li:nth-child(2n)]:pr-0 pc:[&>li:nth-child(3n)]:pr-0 [&>li]:pb-4 [&>li]:pr-4 mobile:[&>li]:pr-0">
        {Array.from(labelToIssues.keys()).map((label) => {
          const [issue] = (labelToIssues.get(label) || []).sort((a, b) => {
            const aThumbnail = getIssueThumbnail(a);
            const bThumbnail = getIssueThumbnail(b);

            if (aThumbnail && !bThumbnail) {
              return -1;
            } else if (!aThumbnail && bThumbnail) {
              return 1;
            } else {
              return new Date(a.created_at) < new Date(b.created_at) ? -1 : 1;
            }
          });

          return (
            <li
              className="aspect-square w-1/3 mobile:w-full mobileToTablet:w-1/2"
              key={label}
            >
              <Link
                className="relative block size-full cursor-pointer overflow-hidden rounded border border-igStroke dark:border-igStrokeDark"
                href={`/saved/${label}`}
              >
                {issue &&
                  (() => {
                    const thumbnail = getIssueThumbnail(issue);
                    const labels = getIssueLabels(issue).sort((a, b) =>
                      a < b ? -1 : 1,
                    );

                    if (!thumbnail) {
                      return (
                        <TextThumbnail
                          text={issue.title}
                          textForColor={labels.join("")}
                        />
                      );
                    }

                    return (
                      <div className="absolute inset-0">
                        <img
                          className="size-full object-cover"
                          src={thumbnail}
                        />
                      </div>
                    );
                  })()}
                <div className="saved-item-dimmed absolute inset-0 flex items-end">
                  <p className="p-5 text-xl text-white">{label}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
}
