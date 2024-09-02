import Instagram from "@/assets/svgs/instagram.svg";
import InstagramText from "@/assets/svgs/instagram-text.svg";
import NewPost from "@/assets/svgs/new-post.svg";
import Link from "next/link";
import React from "react";
import { server } from "@/hooks";
import config from "@/config";
import { NavButton } from "./NavButton";
import { ProfileIcon } from "./ProfileIcon";
import { SeeMore } from "./SeeMore";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";

interface NavProps {}

export async function Nav({}: NavProps) {
  const userInfo = await server.useFetchUserInfo();

  return (
    <HiddenMobileLayout>
      <nav className="pc-xl:w-[335px] tablet:w-[72px] flex w-[244px] flex-col border-r border-igSeparator p-[12px] transition-[width] dark:border-igSeparatorDark">
        <div className="relative mb-[96px] [&>div]:transition-[opacity] [&>div]:duration-500">
          <div className="tablet:opacity-0 absolute mt-[13px] p-[12px] opacity-100">
            <Link href="/">
              <InstagramText />
            </Link>
          </div>

          <div className="tablet:opacity-100 absolute mt-[12px] opacity-0">
            <NavButton path="/">
              <Instagram />
            </NavButton>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <NavButton
              path={`${userInfo.html_url}/${config.github.repo}/issues/new`}
              title="글쓰기"
            >
              <NewPost />
            </NavButton>

            <NavButton path="/" title="프로필">
              <ProfileIcon url={userInfo.avatar_url} />
            </NavButton>
          </div>

          <SeeMore />
        </div>
      </nav>
    </HiddenMobileLayout>
  );
}
