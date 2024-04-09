import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTwitter = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 42 34"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      d="M12.7 26.109c-3.239-.07-6.01-2.057-7.255-4.86.288.023.574.03.853.03.827 0 1.634-.096 2.38-.3l-.03-.972c-3.446-.705-6.123-3.619-6.442-7.217a8.9 8.9 0 0 0 3.334.74l1.706.032-1.418-.948A8.09 8.09 0 0 1 2.239 5.9c0-1.231.28-2.391.772-3.442 4.314 4.986 10.548 8.237 17.56 8.579l.658.032-.145-.642a8.3 8.3 0 0 1-.187-1.846C20.897 4.13 24.5.5 28.971.5c2.305 0 4.418.978 5.902 2.557l.19.202.272-.054a17.8 17.8 0 0 0 4.343-1.458 8.07 8.07 0 0 1-3.031 3.204l.32.925a18.7 18.7 0 0 0 3.458-.774 16.2 16.2 0 0 1-3.168 2.97l-.224.158.014.274c.018.359.03.716.03 1.084 0 11.12-8.463 23.912-23.916 23.912-4.024 0-7.797-.98-11.116-2.732h.008c4.128 0 7.941-1.416 10.945-3.765l1.104-.864z"
    />
  </svg>
);
const Memo = memo(SvgTwitter);
export default Memo;
