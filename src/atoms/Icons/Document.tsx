import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDocument = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 13 15"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="#2A2E3B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.5 12.5v-7l-5-5h-5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2"
      clipRule="evenodd"
    />
    <path
      stroke="#2A2E3B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.5 7.5h5M2.5 9.5h7M2.5 11.5h3M7.5.5v3a2 2 0 0 0 2 2h3"
    />
  </svg>
);
const Memo = memo(SvgDocument);
export default Memo;
