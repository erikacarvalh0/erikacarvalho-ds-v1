import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLinkedin = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.8}
      d="M1 3.25A2.25 2.25 0 0 1 3.25 1h13.5A2.25 2.25 0 0 1 19 3.25v13.5A2.25 2.25 0 0 1 16.75 19H3.25A2.25 2.25 0 0 1 1 16.75zM5.91 8.67v5.625M5.91 6.523v.011M10.41 14.295V8.67"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.8}
      d="M14.91 14.295V10.92a2.25 2.25 0 0 0-4.5 0"
    />
  </svg>
);
const Memo = memo(SvgLinkedin);
export default Memo;
