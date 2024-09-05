import utf8 from "utf8";

import base64 from "base-64";

import { HeaderIntro } from "./HeaderIntro";
import { HeaderCounter } from "./HeaderCounter";
import { HeaderButton } from "./HeaderButton";
import { HeaderProfile } from "./HeaderProfile";

import { responsive } from "@/components/layouts/ResponsiveLayout";

import { getUserInfo, getProfileReadme, getIssues } from "@/api";

export async function Header() {
  const { user } = await getUserInfo();

  const { readme } = await getProfileReadme();

  const { issues } = await getIssues();

  const readmeContent = utf8.decode(base64.decode(readme.content));

  return (
    <header>
      <div className="sticky top-0 z-10 hidden h-11 w-full items-center justify-center border-b border-igElevatedSeparator bg-white mobile:flex dark:border-igElevatedSeparatorDark dark:bg-black">
        <p>{user.login}</p>
      </div>

      <div className="mb-[44px] flex items-stretch mobile:m-4">
        <div className="mr-[30px] flex shrink-0 grow basis-0 items-center justify-center">
          <HeaderProfile userInfo={user} />
        </div>

        <div className="flex shrink grow-[2] basis-[30px] flex-col justify-center">
          <div className="mb-[20px] flex items-center mobile:h-full mobile:flex-col mobile:place-items-start mobile:justify-evenly">
            <div className="mr-5">
              <span className="text-xl">{user.login}</span>
            </div>
            <HeaderButton readme={readme} />
          </div>

          <responsive.mobile.x.div className="flex flex-col gap-[20px]">
            <HeaderCounter
              postCount={issues.length}
              followerCount={user.followers}
              followingCount={user.following}
            />

            <HeaderIntro name={user.name || ""} content={readmeContent} />
          </responsive.mobile.x.div>
        </div>
      </div>

      <responsive.mobile.div className="flex flex-col">
        <div className="px-4 pb-5">
          <HeaderIntro name={user.name || ""} content={readmeContent} />
        </div>

        <div className="w-full border-t border-igSeparator dark:border-igSeparatorDark">
          <HeaderCounter
            postCount={issues.length}
            followerCount={user.followers}
            followingCount={user.following}
          />
        </div>
      </responsive.mobile.div>
    </header>
  );
}
