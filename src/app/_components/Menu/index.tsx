import React from "react";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  type: MenuType;
}

export function Menu({ type }: MenuProps) {
  return (
    <div className="flex items-center justify-evenly border-t border-igSeparator dark:border-igSeparatorDark">
      <MenuItem href="/" type="normal" selectType={type} />
      <MenuItem href="/saved" type="saved" selectType={type} />
    </div>
  );
}
