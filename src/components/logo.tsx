import { useId } from "react";

export function Logo({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="38" y="52" width="244" height="142" rx="34" fill="currentColor" opacity=".07" />
      <rect x="38" y="52" width="244" height="142" rx="34" fill="none" stroke="currentColor" strokeWidth="11" />
      <path
        d="M86 105l30 22-30 22M143 153l34-52M191 105l30 22-30 22"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <rect x="54" y="220" width="34" height="24" rx="7" />
        <rect x="98" y="220" width="34" height="24" rx="7" />
        <rect x="142" y="220" width="68" height="24" rx="7" fill={`url(#${id})`} />
        <rect x="220" y="220" width="46" height="24" rx="7" />
        <rect x="72" y="253" width="48" height="18" rx="6" />
        <rect x="128" y="253" width="64" height="18" rx="6" />
        <rect x="200" y="253" width="48" height="18" rx="6" />
      </g>
    </svg>
  );
}
