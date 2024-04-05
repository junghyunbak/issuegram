export function Footer({}) {
  // TODO: 데이터를 config 파일로 이동
  const links: { link: string; value: string }[] = [
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://github.com/junghyunbak", value: "Github" },
  ];

  return (
    <footer className="pb-[52px] max-md:hidden">
      <ul className="mt-[24px] flex flex-wrap justify-center">
        {links.map(({ link, value }, i) => {
          return (
            <li className="mx-[8px] mb-[12px] flex" key={i}>
              <a
                className="text-xs text-[#737373] active:opacity-50"
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
        <p className="text-xs text-[#737373]">
          © 2024 Issuegram from junghyunbak
        </p>
      </div>
    </footer>
  );
}
