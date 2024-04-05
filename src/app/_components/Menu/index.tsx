import Grid from "@/assets/svgs/grid.svg";
import TagUser from "@/assets/svgs/tag-user.svg";
import Link from "next/link";
import React from "react";

interface MenuItemProps {
  type: MenuType;
  selectType: MenuType;
  href: string;
}

function MenuItem({ type, selectType, href }: MenuItemProps) {
  const IconSvg: typeof Grid = type === "게시물" ? Grid : TagUser;

  const isActive = selectType === type;

  return (
    <Link
      href={href}
      className={`flex h-[52px] items-center justify-center gap-[6px] text-xs active:opacity-50 max-md:flex-1 ${isActive ? "border-t border-black" : ""}`}
    >
      <IconSvg
        className={`h-6 md:h-3 ${isActive ? "fill-black stroke-black max-md:fill-[#0095F6] max-md:stroke-[#0095F6]" : "fill-[#737373] stroke-[#737373]"}`}
      />{" "}
      <p
        className={`text-[#737373] max-md:hidden ${isActive ? "font-semibold text-black" : ""}`}
      >
        {type}
      </p>
    </Link>
  );
}

interface MenuProps {
  type: MenuType;
}

export function Menu({ type }: MenuProps) {
  return (
    <div className="flex items-center justify-evenly border-t">
      <MenuItem href="/" type="게시물" selectType={type} />
      <MenuItem href="/portfolio" type="포트폴리오" selectType={type} />
    </div>
  );
}
