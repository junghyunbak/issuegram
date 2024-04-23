import Grid from "@/assets/svgs/grid.svg";
import TagUser from "@/assets/svgs/tag-user.svg";
import Saved from "@/assets/svgs/saved.svg";
import Link from "next/link";
import "./index.css";

interface MenuItemProps {
  type: LabelType;
  selectType: LabelType;
  href: string;
}

export function MenuItem({ type, selectType, href }: MenuItemProps) {
  const IconSvg: typeof Grid = (() => {
    if (type === "normal") {
      return Grid;
    }

    if (type === "saved") {
      return Saved;
    }

    return TagUser;
  })();

  const itemTitle = (() => {
    if (type == "normal") {
      return "게시글";
    }

    if (type === "saved") {
      return "저장됨";
    }

    return "포트폴리오";
  })();

  const isActive = selectType === type;

  return (
    <Link
      href={href}
      className={`menu-item ${isActive ? "dark:border-primaryTextDark border-t border-primaryText" : ""}`}
    >
      <IconSvg
        className={`${isActive ? "dark:fill-primaryTextDark dark:stroke-primaryTextDark fill-primaryText stroke-primaryText max-md:fill-igPrimaryButton max-md:stroke-igPrimaryButton" : "fill-igSecondaryText dark:fill-igSecondaryTextDark stroke-igSecondaryText dark:stroke-igSecondaryTextDark"}`}
      />

      <p
        className={`${isActive ? "dark:text-primaryTextDark font-semibold text-primaryText" : "text-igSecondaryText dark:text-igSecondaryTextDark"}`}
      >
        {itemTitle}
      </p>
    </Link>
  );
}
