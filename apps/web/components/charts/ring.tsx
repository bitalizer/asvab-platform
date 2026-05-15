type RingProps = {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color?: string;
  bg?: string;
  children?: React.ReactNode;
  label?: string;
};

export function Ring({
  value,
  max = 100,
  size = 200,
  stroke = 14,
  color = 'var(--brand)',
  bg = 'var(--line-2)',
  children,
  label,
}: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const off = c * (1 - pct);
  const pctLabel = label ?? `${Math.round(pct * 100)} percent`;
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={pctLabel}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
      )}
    </div>
  );
}
