export default function SFPALogo({ size = 32 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Red dot */}
      <circle cx={72} cy={20} r={10} fill="#C0272D" />
      {/* Blue arch */}
      <path
        d="M20 80 Q20 35 50 30 Q80 35 80 80"
        fill="none"
        stroke="#1B3A8C"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* Left figure */}
      <circle cx={28} cy={52} r={7} fill="#1B3A8C" />
      <line x1={28} y1={59} x2={28} y2={78} stroke="#1B3A8C" strokeWidth={5} strokeLinecap="round" />
      {/* Right figure */}
      <circle cx={72} cy={52} r={7} fill="#1B3A8C" />
      <line x1={72} y1={59} x2={72} y2={78} stroke="#1B3A8C" strokeWidth={5} strokeLinecap="round" />
      {/* Centre figure */}
      <circle cx={50} cy={46} r={7} fill="#1B3A8C" />
      <line x1={50} y1={53} x2={50} y2={78} stroke="#1B3A8C" strokeWidth={5} strokeLinecap="round" />
      {/* SFPA text */}
      <text
        x={50}
        y={96}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#1B3A8C"
        fontFamily="sans-serif"
      >
        SFPA
      </text>
    </svg>
  );
}
