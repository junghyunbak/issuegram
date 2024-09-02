import utf8 from "utf8";
import base64 from "base-64";
import { HeaderIntro } from "./HeaderIntro";
import { HeaderCounter } from "./HeaderCounter";
import { HeaderButton } from "./HeaderButton";
import { HeaderProfile } from "./HeaderProfile";
import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";
import { server } from "@/hooks";
import "./index.css";

export async function Header() {
  const userInfo = await server.useFetchUserInfo();
  const readme = await server.useFetchReadme();
  const issues = await server.useFetchIssues();

  const readmeContent = utf8.decode(base64.decode(readme.content));

  return (
    <header>
      <div className="mobile:flex sticky top-0 z-10 hidden h-11 w-full items-center justify-center border-b border-igElevatedSeparator bg-white dark:border-igElevatedSeparatorDark dark:bg-black">
        <p>{userInfo.login}</p>
      </div>

      <div className="mobile:m-4 mb-[44px] flex items-stretch">
        <div className="mr-[30px] flex shrink-0 grow basis-0 items-center justify-center">
          <HeaderProfile userInfo={userInfo} />
        </div>

        <div className="flex shrink grow-[2] basis-[30px] flex-col justify-center">
          <div className="mobile:h-full mobile:flex-col mobile:place-items-start mobile:justify-evenly mb-[20px] flex items-center">
            <div className="mr-5">
              <span className="text-xl">{userInfo.login}</span>
            </div>
            <HeaderButton readme={readme} />
          </div>

          <HiddenMobileLayout>
            <HeaderCounter
              postCount={issues.length}
              followerCount={userInfo.followers}
              followingCount={userInfo.following}
            />
          </HiddenMobileLayout>

          <HiddenMobileLayout>
            <HeaderIntro name={userInfo.name || ""} content={readmeContent} />
          </HiddenMobileLayout>
        </div>
      </div>

      <ShowMobileLayout>
        <div className="px-4 pb-5">
          <HeaderIntro name={userInfo.name || ""} content={readmeContent} />
        </div>
      </ShowMobileLayout>

      <ShowMobileLayout>
        <div className="w-full border-t border-igSeparator dark:border-igSeparatorDark">
          <HeaderCounter
            postCount={issues.length}
            followerCount={userInfo.followers}
            followingCount={userInfo.following}
          />
        </div>
      </ShowMobileLayout>
    </header>
  );
}
