import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

const SvgChartBar = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & { titleId?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} aria-label={title && !titleId ? title : undefined} aria-labelledby={title ? titleId : undefined} {...props}>
    {title && <title id={titleId}>{title}</title>}
    <path d="M4 20V10 M12 20V4 M20 20v-7 M2 20h20" />
  </svg>
);

export default memo(SvgChartBar);
