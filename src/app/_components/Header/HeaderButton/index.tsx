interface HeaderButtonProps {
  readme: Readme;
}

export function HeaderButton({ readme }: HeaderButtonProps) {
  return (
    <a
      className="flex h-8 w-fit cursor-pointer items-center rounded-lg bg-igSecondaryButton px-4 text-sm font-semibold leading-[18px] hover:bg-igSecondaryButtonHover active:opacity-50 dark:bg-igSecondaryButtonDark dark:hover:bg-igSecondaryButtonHoverDark"
      href={readme.html_url || ""}
      target="_blank"
    >
      프로필 편집
    </a>
  );
}
