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
      className={`menu-item ${isActive ? "border-t border-black" : ""}`}
    >
      <IconSvg
        className={`${isActive ? "max-md:fill-igPrimaryButton max-md:stroke-igPrimaryButton fill-black stroke-black" : "fill-secondaryText stroke-secondaryText"}`}
      />

      <p
        className={`${isActive ? "font-semibold text-black" : "text-secondaryText"}`}
      >
        {itemTitle}
      </p>
    </Link>
  );
}
