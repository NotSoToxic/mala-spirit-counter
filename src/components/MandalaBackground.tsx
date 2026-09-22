export function MandalaBackground() {
  const petals = Array.from({ length: 16 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-(--gradient-shrine)" />
      <svg
        viewBox="0 0 400 400"
        className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.07]"
      >
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="110"
            rx="26"
            ry="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${(360 / petals.length) * i} 200 200)`}
          />
        ))}
        {[60, 105, 150, 185].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        ))}
      </svg>
    </div>
  );
}
