import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEyeClosed = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 10.5Q5.805 16 10.5 16t8.5-5.5M4.5 13.423l-2 2.077M16.5 13.423l2 2.077M12.5 16l1 2.5M8.5 16l-1 2.5" />
    </g>
  </svg>
);
const Memo = memo(SvgEyeClosed);
export default Memo;
