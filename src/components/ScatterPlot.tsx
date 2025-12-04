import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CharacterProfile } from '../data/characters';

export interface ScatterPlotProps {
  characters: CharacterProfile[];
  width?: number;
  height?: number;
  showPopulation?: boolean;
}

type PopulationPoint = {
  x: number;
  y: number;
};

const defaultWidth = 500;
const defaultHeight = 350;

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  characters,
  width = defaultWidth,
  height = defaultHeight,
  showPopulation = false,
}) => {
  const padding = { left: 60, right: 24, top: 24, bottom: 48 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const population = useMemo<PopulationPoint[]>(() => {
    if (!showPopulation) return [];
    const count = 220;
    const points: PopulationPoint[] = [];

    // Light bias toward center by mixing uniform with a mild central pull.
    for (let i = 0; i < count; i += 1) {
      const rand = () => {
        const u = Math.random();
        const v = Math.random();
        return (u + v) / 2; // triangle distribution peaking near 0.5
      };
      points.push({ x: rand(), y: rand() });
    }
    return points;
  }, [showPopulation]);

  const ticks = [0, 0.5, 1];

  const toX = (utility: number) => padding.left + utility * innerWidth;
  const toY = (maleability: number) => padding.top + (1 - maleability) * innerHeight;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <svg width={width} height={height} className="mx-auto block">
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={padding.left + innerWidth}
          y2={padding.top + innerHeight}
          stroke="#64748b"
          strokeWidth={1}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerHeight}
          stroke="#64748b"
          strokeWidth={1}
        />

        {/* Axis ticks and labels */}
        {ticks.map((t) => (
          <g key={`x-${t}`}>
            <line
              x1={toX(t)}
              y1={padding.top + innerHeight}
              x2={toX(t)}
              y2={padding.top + innerHeight + 6}
              stroke="#94a3b8"
              strokeWidth={1}
            />
            <text
              x={toX(t)}
              y={padding.top + innerHeight + 18}
              textAnchor="middle"
              fontSize={11}
              fill="#cbd5e1"
            >
              {t}
            </text>
          </g>
        ))}
        {ticks.map((t) => (
          <g key={`y-${t}`}>
            <line
              x1={padding.left - 6}
              y1={toY(t)}
              x2={padding.left}
              y2={toY(t)}
              stroke="#94a3b8"
              strokeWidth={1}
            />
            <text
              x={padding.left - 10}
              y={toY(t) + 4}
              textAnchor="end"
              fontSize={11}
              fill="#cbd5e1"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Axis titles */}
        <text
          x={padding.left + innerWidth / 2}
          y={padding.top + innerHeight + 36}
          textAnchor="middle"
          fontSize={12}
          fill="#e2e8f0"
        >
          Utility
        </text>
        <text
          x={padding.left - 44}
          y={padding.top + innerHeight / 2}
          textAnchor="middle"
          fontSize={12}
          fill="#e2e8f0"
          transform={`rotate(-90 ${padding.left - 44} ${padding.top + innerHeight / 2})`}
        >
          Maleability
        </text>

        {/* Population points */}
        {population.map((p, idx) => (
          <circle
            key={`pop-${idx}`}
            cx={toX(p.x)}
            cy={toY(p.y)}
            r={2}
            fill="#7dd3fc"
            opacity={0.18}
          />
        ))}

        {/* Character points */}
        {characters.map((character, idx) => (
          <g key={character.id}>
            <motion.circle
              cx={toX(character.utility)}
              cy={toY(character.maleability)}
              r={8}
              fill="#22d3ee"
              stroke="#0ea5e9"
              strokeWidth={1.5}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            />
            <text
              x={toX(character.utility) + 10}
              y={toY(character.maleability) - 10}
              fontSize={11}
              fill="#e2e8f0"
            >
              {character.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
