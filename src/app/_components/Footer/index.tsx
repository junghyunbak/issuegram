import config from "@/config";

export function Footer({}) {
  const links = config.footerLinks;

  return (
    <footer className="pb-[52px] max-md:hidden">
      <ul className="mt-[24px] flex flex-wrap justify-center">
        {links.map(({ link, value }, i) => {
          return (
            <li className="mx-[8px] mb-[12px] flex" key={i}>
              <a
                className="text-xs text-igSecondaryText active:opacity-50 dark:text-igSecondaryTextDark"
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
        <p className="text-xs text-igSecondaryText dark:text-igSecondaryTextDark">
          © 2024 Issuegram from junghyunbak
        </p>
      </div>
    </footer>
  );
}
