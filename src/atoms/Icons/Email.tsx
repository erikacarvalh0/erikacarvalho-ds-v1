import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmail = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 41 35"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 28.857V6.571A5.57 5.57 0 0 1 6.571 1H34.43A5.57 5.57 0 0 1 40 6.571v22.286a5.57 5.57 0 0 1-5.571 5.572H6.57A5.57 5.57 0 0 1 1 28.857"
      clipRule="evenodd"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.572 10.75 20.5 19.107 34.43 10.75"
    />
  </svg>
);
const Memo = memo(SvgEmail);
export default Memo;
