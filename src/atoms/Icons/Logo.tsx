import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLogo = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 51 51"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path fill="#58C9D4" d="M51 44.987V0H23.46v2.792h24.748l.054 42.195" />
    <path
      fill="#444"
      d="M11.22 8.804V6.013H0V51h11.22v-2.792H2.792V28.506h4.026v-2.791H2.792V8.805zM17.394 6.013v2.791h24.802v39.404H17.179V51h27.808V6.013z"
    />
  </svg>
);
const Memo = memo(SvgLogo);
export default Memo;
