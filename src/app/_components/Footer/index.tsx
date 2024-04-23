export function Footer({}) {
  // [ ]: 데이터를 config 파일로 이동
  const links: { link: string; value: string }[] = [
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://www.instagram.com/__cxxlxxhxxn/", value: "Instagram" },
    { link: "https://www.acmicpc.net/user/jeong5728", value: "Baekjoon" },
    { link: "https://ipwag.tistory.com/", value: "Tistory" },
    { link: "mailto:jeong5728@gmail.com", value: "Gmail" },
  ];

  return (
    <footer className="pb-[52px] max-md:hidden">
      <ul className="mt-[24px] flex flex-wrap justify-center">
        {links.map(({ link, value }, i) => {
          return (
            <li className="mx-[8px] mb-[12px] flex" key={i}>
              <a
                className="text-igSecondaryText dark:text-igSecondaryTextDark text-xs active:opacity-50"
                href={link}
                target="_blank"
              >
                {value}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="my-3 flex justify-center">
        <p className="text-igSecondaryText dark:text-igSecondaryTextDark text-xs">
          © 2024 Issuegram from junghyunbak
        </p>
      </div>
    </footer>
  );
}
