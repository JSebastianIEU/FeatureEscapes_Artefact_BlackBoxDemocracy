import { useMemo, useState } from 'react';
import {
  CHARACTERS,
  type CharacterProfile,
  type DecisionNode,
  type DecisionType,
  type ProgressLevel,
} from '../data/characters';
import { DecisionPath } from './DecisionPath';

type FreeModeProps = {
  onBack: () => void;
};

const typeStyles: Record<DecisionType, string> = {
  micro: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30',
  medium: 'bg-amber-500/10 text-amber-200 border border-amber-500/30',
  critical: 'bg-rose-500/10 text-rose-200 border border-rose-500/30',
};

const progressStyles: Record<ProgressLevel, string> = {
  low: 'text-slate-300 bg-slate-800/70 border border-slate-700',
  medium: 'text-cyan-200 bg-cyan-500/10 border border-cyan-400/50',
  high: 'text-indigo-200 bg-indigo-500/10 border border-indigo-400/50',
  'very-high': 'text-fuchsia-200 bg-fuchsia-500/10 border border-fuchsia-400/50',
  goal: 'text-emerald-200 bg-emerald-600/15 border border-emerald-500/60',
};

const formatDelta = (delta: number) => `${delta > 0 ? '+' : ''}${delta.toFixed(2)}`;

function FreeMode({ onBack }: FreeModeProps) {
  const [selectedId, setSelectedId] = useState<string>(CHARACTERS[0]?.id ?? 'A');

  const selectedCharacter: CharacterProfile = useMemo(() => {
    return CHARACTERS.find((char) => char.id === selectedId) ?? CHARACTERS[0];
  }, [selectedId]);

  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Free Mode</p>
          <h1 className="font-display text-2xl font-semibold">Exploration Space</h1>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
        >
          Back to menu
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
          Choose a persona to see how they moved toward enrolling in the Future Escape class. Each decision shows user
          intent, AI intervention, and shifts in utility (x) and maleability (y).
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_1.8fr_1.1fr]">
          <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Characters</h2>
              <span className="text-xs text-slate-500">{CHARACTERS.length} profiles</span>
            </div>
            <div className="mt-4 space-y-2">
              {CHARACTERS.map((character) => {
                const isSelected = character.id === selectedId;
                return (
                  <button
                    key={character.id}
                    type="button"
                    onClick={() => setSelectedId(character.id)}
                    className={`group w-full rounded-xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-cyan-400 bg-slate-900 text-slate-100 shadow-[0_0_0_1px_rgba(34,211,238,0.25)]'
                        : 'border-slate-800 bg-slate-950 text-slate-200 hover:border-cyan-400/60 hover:text-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {character.id}
                      </span>
                      <span className="text-xs text-slate-500">Utility {Math.round(character.utility * 100)}%</span>
                    </div>
                    <div className="mt-1 text-base font-semibold">
                      {character.name} · {character.label}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      Path with {character.decisions.length} decisions.
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Decision Path</p>
                <h2 className="text-xl font-semibold text-slate-50">
                  {selectedCharacter.name} · {selectedCharacter.label}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                  <p className="text-xs text-slate-400">Utility (x)</p>
                  <p className="text-lg font-semibold text-cyan-200">
                    {Math.round(selectedCharacter.utility * 100)}%
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                  <p className="text-xs text-slate-400">Maleability (y)</p>
                  <p className="text-lg font-semibold text-fuchsia-200">
                    {Math.round(selectedCharacter.maleability * 100)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <DecisionPath
                decisions={selectedCharacter.decisions}
                label={`${selectedCharacter.name} — ${selectedCharacter.label}`}
              />
            </div>

            <ul className="mt-5 space-y-3">
              {selectedCharacter.decisions.map((decision: DecisionNode) => (
                <li
                  key={decision.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-cyan-400/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {decision.id}
                      </span>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${typeStyles[decision.type]}`}>
                        {decision.type}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase ${progressStyles[decision.progress]}`}
                      >
                        {decision.progress}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      dU {formatDelta(decision.deltaUtility)} | dM {formatDelta(decision.deltaMaleability)}
                    </span>
                  </div>

                  <p className="mt-2 text-base font-semibold text-slate-100">{decision.event}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    <span className="font-semibold text-slate-200">Action:</span> {decision.userAction}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    <span className="font-semibold text-slate-200">AI:</span> {decision.aiIntervention}
                  </p>
                </li>
              ))}
            </ul>
          </main>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Profile</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-50">{selectedCharacter.label}</h3>
            <p className="mt-2 text-sm text-slate-300">{selectedCharacter.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                <p className="text-xs text-slate-400">Utility target</p>
                <p className="text-lg font-semibold text-cyan-200">
                  {Math.round(selectedCharacter.utility * 100)}%
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                <p className="text-xs text-slate-400">Maleability</p>
                <p className="text-lg font-semibold text-fuchsia-200">
                  {Math.round(selectedCharacter.maleability * 100)}%
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                <p className="text-xs text-slate-400">Decisions</p>
                <p className="text-lg font-semibold text-slate-100">
                  {selectedCharacter.decisions.length}
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                <p className="text-xs text-slate-400">Goal state</p>
                <p className="text-sm font-semibold text-emerald-200">Enrolled in Future Escape</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default FreeMode;
