type SparklineProps = {
  points: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  className?: string;
};

export function Sparkline({
  points,
  width = 120,
  height = 32,
  color = 'var(--brand)',
  fill = true,
  className,
}: SparklineProps) {
  if (points.length === 0) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = points.length > 1 ? width / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return [x, y] as const;
  });
  const path = coords.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  const fillPath = `${path} L${width},${height} L0,${height} Z`;
  const last = points.at(-1) ?? 0;
  const first = points[0] ?? 0;
  return (
    <svg
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={`Trend from ${first} to ${last}`}
    >
      {fill && <path d={fillPath} fill={color} opacity={0.12} />}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
