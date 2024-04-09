import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMenu = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 59 59"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#21949F"
      d="M53.423 28.5a2 2 0 0 1 0 2L42.327 49.718a2 2 0 0 1-1.732 1h-22.19a2 2 0 0 1-1.732-1L5.577 30.5a2 2 0 0 1 0-2L16.673 9.282a2 2 0 0 1 1.732-1h22.19a2 2 0 0 1 1.732 1z"
    />
    <path
      stroke="#21949F"
      strokeWidth={2}
      d="M57.557 29a1 1 0 0 1 0 1L43.96 53.548a1 1 0 0 1-.866.5h-27.19a1 1 0 0 1-.866-.5L1.443 30a1 1 0 0 1 0-1L15.04 5.452a1 1 0 0 1 .866-.5h27.19a1 1 0 0 1 .866.5z"
    />
  </svg>
);
const Memo = memo(SvgMenu);
export default Memo;
