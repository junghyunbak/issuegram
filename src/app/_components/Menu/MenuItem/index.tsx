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

  if (isActive) {
    return (
      <Link
        href={href}
        className="menu-item border-igPrimaryText dark:border-igPrimaryTextDark border-t"
      >
        <IconSvg className="max-md:text-igPrimaryButton" />

        <p className="font-semibold">{itemTitle}</p>
      </Link>
    );
  }

  return (
    <Link href={href} className="menu-item">
      <IconSvg className="text-igSecondaryText dark:text-igSecondaryTextDark" />

      <p className="text-igSecondaryText dark:text-igSecondaryTextDark">
        {itemTitle}
      </p>
    </Link>
  );
}
