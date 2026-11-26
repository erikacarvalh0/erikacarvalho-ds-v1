import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

const SvgDashboard = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & { titleId?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} aria-label={title && !titleId ? title : undefined} aria-labelledby={title ? titleId : undefined} {...props}>
    {title && <title id={titleId}>{title}</title>}
    <path d="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" />
  </svg>
);

export default memo(SvgDashboard);
