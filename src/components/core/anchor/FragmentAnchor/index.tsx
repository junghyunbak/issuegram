"use client";

import type { HTMLAttributes, MouseEventHandler } from "react";

interface FragmentAnchorProps extends HTMLAttributes<HTMLAnchorElement> {}

export function FragmentAnchor(props: FragmentAnchorProps) {
  const handleFramgentAnchorClick: MouseEventHandler<HTMLAnchorElement> = (
    e,
  ) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLAnchorElement)) {
      return;
    }

    const targetId = (/.*#(.*)/.exec(e.target.href) || [])[1];
    const targetElement = document.querySelector(`#${targetId}`);

    if (targetElement) {
      // TODO: 가장 근접한 상위 스크롤에 적용되도록 구현
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <a {...props} onClick={handleFramgentAnchorClick} />;
}
