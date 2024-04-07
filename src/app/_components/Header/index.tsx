import config from "@/config";
import base64 from "base-64";
import utf8 from "utf8";
import "./index.css";
import { server } from "@/hooks";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

interface CounterProps {
  post: number;
  followers: number;
  following: number;
}

function Counter({ post, followers, following }: CounterProps) {
  return (
    <ul className="counter">
      <li>
        <p>
          게시물 <span>{post}</span>
        </p>
      </li>

      <li>
        <Link className="active:opacity-50" href="/followers">
          팔로워 <span>{followers}</span>
        </Link>
      </li>

      <li>
        <Link className="active:opacity-50" href="/following">
          팔로우 <span>{following}</span>
        </Link>
      </li>
    </ul>
  );
}

interface IntroduceProps {
  name: string;
  content: string;
}

export function Introduce({ name, content }: IntroduceProps) {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-semibold">{name}</p>
      <div className="text-sm [&_img]:inline">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath, [remarkFrontmatter, ["toml"]]]}
          rehypePlugins={[
            rehypeRaw,
            rehypeSlug,
            [rehypeKatex, { output: "mathml" }],
          ]}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

export async function Header() {
  const userInfo = await server.useFetchUserInfo();
  const readme = await server.useFetchReadme();
  const issues = await server.useFetchIssues();

  const readmeContent = utf8.decode(base64.decode(readme.content));

  return (
    <header>
      <div className="hidden h-11 items-center justify-center border-b max-md:flex">
        <p>{userInfo.login}</p>
      </div>

      <div className="mb-[44px] flex items-stretch max-md:m-4">
        <div className="mr-[30px] flex shrink-0 grow basis-0 items-center justify-center">
          <div className="flex h-[181px] items-center">
            <img
              src={userInfo.avatar_url}
              className="h-[150px] w-[150px] rounded-full max-md:h-[77px] max-md:w-[77px]"
            />
          </div>
        </div>

        <div className="flex shrink grow-[2] basis-[30px] flex-col justify-center">
          <div className="mb-[20px] flex items-center max-md:h-full max-md:flex-col max-md:place-items-start max-md:justify-evenly">
            <div className="mr-5">
              <span className="text-xl">{userInfo.login}</span>
            </div>
            <a
              className="flex h-8 w-fit cursor-pointer items-center rounded-lg bg-[#efefef] px-4 text-sm font-semibold leading-[18px] hover:bg-[#dbdbdb]"
              href={readme.html_url}
              target="_blank"
            >
              프로필 편집
            </a>
          </div>

          <div className="max-md:hidden">
            <Counter
              post={issues.length}
              followers={userInfo.followers}
              following={userInfo.following}
            />
          </div>

          <div className="max-md:hidden">
            <Introduce name={userInfo.name || ""} content={readmeContent} />
          </div>
        </div>
      </div>

      <div className="hidden px-4 pb-5 max-md:block">
        <Introduce name={userInfo.name || ""} content={readmeContent} />
      </div>

      <div className="flex border-t md:hidden">
        <Counter
          post={issues.length}
          followers={userInfo.followers}
          following={userInfo.following}
        />
      </div>
    </header>
  );
}
