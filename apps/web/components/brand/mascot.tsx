type MascotProps = {
  size?: number;
  className?: string;
};

export function Mascot({ size = 100, className }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="MissionReady mascot"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="var(--brand-soft)"
        stroke="var(--brand)"
        strokeWidth="2"
      />
      <circle cx="50" cy="42" r="18" fill="var(--brand)" />
      <rect x="38" y="58" width="24" height="18" rx="4" fill="var(--brand)" />
      <circle cx="44" cy="40" r="2.5" fill="var(--bg)" />
      <circle cx="56" cy="40" r="2.5" fill="var(--bg)" />
      <path
        d="M44 48 Q50 52 56 48"
        stroke="var(--bg)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
