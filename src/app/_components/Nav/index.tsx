import React from "react";

import Issuegram from "@/assets/svgs/Issuegram-text.svg";
import Instagram from "@/assets/svgs/instagram.svg";
import NewPost from "@/assets/svgs/new-post.svg";

import Link from "next/link";

import config from "@/config";

import { NavButton } from "./NavButton";
import { ProfileIcon } from "./ProfileIcon";
import { SeeMore } from "./SeeMore";

import { getUserInfo } from "@/api";

import { responsive } from "@/components/layouts/ResponsiveLayout";

export async function Nav() {
  const { user } = await getUserInfo();

  return (
    <responsive.mobile.x.div className="flex w-[244px] flex-col border-r border-igSeparator p-[12px] transition-[width] tablet:w-[72px] pc-xl:w-[335px] dark:border-igSeparatorDark">
      <div className="relative mb-[96px] [&>div]:transition-[opacity] [&>div]:duration-500">
        <div className="absolute mt-[13px] p-[12px] opacity-100 tablet:opacity-0">
          <Link href="/">
            <Issuegram className="w-[103px]" />
          </Link>
        </div>

        <div className="absolute mt-[12px] opacity-0 tablet:opacity-100">
          <NavButton path="/">
            <Instagram />
          </NavButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <NavButton
            path={`${user.html_url}/${config.github.repo}/issues/new`}
            title="글쓰기"
          >
            <NewPost />
          </NavButton>

          <NavButton path="/" title="프로필">
            <ProfileIcon url={user.avatar_url} />
          </NavButton>
        </div>

        <SeeMore />
      </div>
    </responsive.mobile.x.div>
  );
}
