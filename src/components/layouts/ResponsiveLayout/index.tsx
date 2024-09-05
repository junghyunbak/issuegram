import { type HTMLAttributes } from "react";

interface MobileDivProps extends HTMLAttributes<HTMLDivElement> {}

function MobileDiv({ children, className, ...props }: MobileDivProps) {
  return (
    <div
      className={`${className ? className : ""} mobile-x:!hidden`}
      {...props}
    >
      {children}
    </div>
  );
}

interface NonMobileDivProps extends HTMLAttributes<HTMLDivElement> {}

function NonMobileDiv({ children, className, ...props }: NonMobileDivProps) {
  return (
    <div className={`${className ? className : ""} mobile:!hidden`} {...props}>
      {children}
    </div>
  );
}

export const responsive = {
  mobile: {
    div: MobileDiv,
    x: {
      div: NonMobileDiv,
    },
  },
};
