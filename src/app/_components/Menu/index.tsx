import React from "react";
import { MenuItem } from "./MenuItem";

interface MenuProps {
  type: LabelType;
}

export function Menu({ type }: MenuProps) {
  return (
    <div className="flex items-center justify-evenly border-t">
      <MenuItem href="/" type="normal" selectType={type} />
      <MenuItem href="/saved" type="saved" selectType={type} />
      <MenuItem href="/portfolio" type="portfolio" selectType={type} />
    </div>
  );
}
