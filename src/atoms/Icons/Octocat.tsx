import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgOctocat = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 36"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      d="M10.182 34.962c1.094.208 1.496-.476 1.496-1.063 0-.525-.019-1.916-.028-3.76-6.088 1.334-7.372-2.965-7.372-2.965-.996-2.552-2.435-3.234-2.435-3.234-1.982-1.37.153-1.342.153-1.342 2.198.153 3.353 2.278 3.353 2.278 1.951 3.38 5.123 2.403 6.374 1.839.197-1.43.76-2.404 1.386-2.957-4.86-.553-9.97-2.454-9.97-10.924 0-2.413.849-4.385 2.253-5.932-.246-.559-.984-2.806.192-5.851 0 0 1.833-.593 6.019 2.266a20.8 20.8 0 0 1 5.472-.746c1.86.012 3.72.255 5.471.746 4.159-2.859 5.992-2.266 5.992-2.266 1.176 3.045.438 5.292.219 5.851C30.152 8.449 31 10.421 31 12.834c0 8.493-5.116 10.362-9.986 10.905.766.664 1.477 2.02 1.477 4.091 0 2.959-.027 5.336-.027 6.054 0 .58.383 1.271 1.505 1.05"
    />
  </svg>
);
const Memo = memo(SvgOctocat);
export default Memo;
