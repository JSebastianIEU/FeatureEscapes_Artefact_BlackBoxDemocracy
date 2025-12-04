import { motion } from 'framer-motion';
import type { DecisionNode } from '../data/characters';

export interface DecisionPathProps {
  decisions: DecisionNode[];
  label?: string;
}

type NodeStyle = {
  radius: number;
  fill: string;
  stroke: string;
};

const nodeStyles: Record<DecisionNode['type'], NodeStyle> = {
  micro: { radius: 6, fill: '#94a3b8', stroke: '#cbd5e1' },
  medium: { radius: 8, fill: '#818cf8', stroke: '#a5b4fc' },
  critical: { radius: 11, fill: '#22c55e', stroke: '#16a34a' },
};

const truncate = (text: string, max = 56) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
};

export const DecisionPath: React.FC<DecisionPathProps> = ({ decisions, label }) => {
  const width = 640;
  const height = 150;
  const padding = 32;
  const lineY = 68;
  const labelY = 105;

  const count = decisions.length;
  const spacing = count > 1 ? (width - padding * 2) / (count - 1) : 0;

  const positions = decisions.map((_, idx) => padding + spacing * idx);

  return (
    <div className="w-full rounded-xl border border-slate-700/70 bg-slate-900/60 p-4 shadow-sm">
      {label && <p className="mb-2 text-sm font-semibold text-slate-100">{label}</p>}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="presentation">
        <line
          x1={padding}
          y1={lineY}
          x2={width - padding}
          y2={lineY}
          stroke="#475569"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {decisions.map((decision, idx) => {
          const { radius, fill, stroke } = nodeStyles[decision.type];
          const x = positions[idx];
          return (
            <g key={decision.id}>
              <motion.circle
                cx={x}
                cy={lineY}
                r={radius}
                fill={fill}
                stroke={stroke}
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              />
              <text
                x={x}
                y={lineY - radius - 10}
                textAnchor="middle"
                fontSize={10}
                fill="#cbd5e1"
                className="uppercase tracking-[0.14em]"
              >
                {decision.type.toUpperCase()}
              </text>
              <text x={x} y={labelY} textAnchor="middle" fontSize={11} fill="#e2e8f0">
                {truncate(decision.event, 46)}
              </text>
              <text x={x} y={labelY + 14} textAnchor="middle" fontSize={10} fill="#94a3b8">
                AI: {truncate(decision.aiIntervention, 48)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
