import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDownload = ({
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
      d="m2.5 7.5 3.999 4.233 4-4.191M6.5.5v11M.5 14.5h12"
    />
  </svg>
);
const Memo = memo(SvgDownload);
export default Memo;
