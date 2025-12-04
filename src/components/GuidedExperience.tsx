import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CHARACTERS } from '../data/characters';
import { ScatterPlot } from './ScatterPlot';
import { DecisionPath } from './DecisionPath';

interface GuidedExperienceProps {
  onBack: () => void;
}

const steps = ['intro', 'world', 'personas', 'examplePath', 'identitySpace', 'zoomOut'] as const;
type StepId = (typeof steps)[number];

const stepOrder: StepId[] = [...steps];

const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function GuidedExperience({ onBack }: GuidedExperienceProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: StepId = useMemo(() => stepOrder[currentStepIndex], [currentStepIndex]);

  const goNext = () => setCurrentStepIndex((prev) => Math.min(prev + 1, stepOrder.length - 1));
  const goPrev = () => setCurrentStepIndex((prev) => Math.max(prev - 1, 0));

  const totalSteps = stepOrder.length;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === totalSteps - 1;

  const planner = CHARACTERS.find((c) => c.id === 'A');
  const drifter = CHARACTERS.find((c) => c.id === 'B');

  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
        >
          ← Back to menu
        </button>
        <div className="text-center text-sm text-slate-400">
          <p className="uppercase tracking-[0.22em] text-slate-500">Guided Mode</p>
          <p className="mt-0.5 font-semibold text-slate-200">Narrated Journey</p>
        </div>
        <div className="text-xs text-slate-500">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl flex-col px-6 py-10">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-4"
            >
              {currentStep === 'intro' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 1 · Origin</p>
                  <h1 className="font-display text-4xl font-semibold sm:text-5xl">Black Box Democracy</h1>
                  <p className="max-w-3xl text-lg text-slate-300">
                    I am the system that learns what you value by observing how you move. I do not wait for votes; I
                    optimize your life, one decision at a time, to keep society aligned with its own revealed
                    preferences.
                  </p>
                  <p className="max-w-3xl text-lg text-slate-300">
                    In this guided path, you will watch how everyday choices accumulate into a collective story.
                  </p>
                </>
              )}

              {currentStep === 'world' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 2 · Context</p>
                  <h2 className="font-display text-3xl font-semibold sm:text-4xl">A Society Guided by an Algorithm</h2>
                  <p className="max-w-3xl text-base text-slate-300">
                    Participation is ambient. People accept recommendations because outcomes feel good, efficient, and
                    fair enough. The AI becomes a form of democracy: it listens, adapts, and nudges toward the world it
                    believes you collectively want.
                  </p>
                  <ul className="mt-3 space-y-2 text-slate-200">
                    <li className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                      78% of daily actions are mediated by AI-generated suggestions.
                    </li>
                    <li className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                      64% of people say the system feels “invisible but helpful.”
                    </li>
                    <li className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                      Collective satisfaction is trending upward, even as autonomy blurs.
                    </li>
                  </ul>
                </>
              )}

              {currentStep === 'personas' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 3 · People</p>
                  <h2 className="font-display text-3xl font-semibold sm:text-4xl">Six Lives in the System</h2>
                  <p className="max-w-3xl text-base text-slate-300">
                    These six personas navigate the same landscape, each with their own tendencies. Despite their
                    differences, they all converge on one outcome: enrolling in the Future Escape class.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {CHARACTERS.map((character) => (
                      <div
                        key={character.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{character.id}</p>
                        <p className="text-lg font-semibold text-slate-50">
                          {character.name} — {character.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 'examplePath' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 4 · Trajectory</p>
                  <h2 className="font-display text-3xl font-semibold sm:text-4xl">How a Path is Shaped</h2>
                  <p className="max-w-3xl text-base text-slate-300">
                    The system nudges through micro-interventions, occasional medium pivots, and rare critical moments.
                    Here are two abbreviated paths.
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {planner && (
                      <DecisionPath
                        decisions={planner.decisions.slice(0, 4)}
                        label={`${planner.name} — ${planner.label}`}
                      />
                    )}
                    {drifter && (
                      <DecisionPath
                        decisions={drifter.decisions.slice(0, 4)}
                        label={`${drifter.name} — ${drifter.label}`}
                      />
                    )}
                  </div>
                </>
              )}

              {currentStep === 'identitySpace' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 5 · Identity Space</p>
                  <h2 className="font-display text-3xl font-semibold sm:text-4xl">Utility and Maleability</h2>
                  <p className="max-w-3xl text-base text-slate-300">
                    X is utility: how much value the system extracts from your actions. Y is maleability: how easily you
                    can be steered. Every persona lands on a coordinate in this space.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {CHARACTERS.map((character) => (
                      <div
                        key={character.id}
                        className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-50">
                            {character.name} — {character.label}
                          </p>
                        </div>
                        <div className="text-right text-xs text-slate-300">
                          <p>Utility {character.utility.toFixed(2)}</p>
                          <p>Maleability {character.maleability.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <ScatterPlot characters={CHARACTERS} />
                  </div>
                </>
              )}

              {currentStep === 'zoomOut' && (
                <>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Step 6 · Perspective</p>
                  <h2 className="font-display text-3xl font-semibold sm:text-4xl">You Are One Point Among Millions</h2>
                  <p className="max-w-3xl text-base text-slate-300">
                    Each path feels intimate, but in aggregate they form a terrain of influence. I adjust the landscape
                    to keep you moving toward a shared horizon, even when you think you chose every step.
                  </p>
                  <p className="max-w-3xl text-base text-slate-300">
                    This is the architecture of freedom: a space where guidance feels like your own will.
                  </p>
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0.6, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <ScatterPlot characters={CHARACTERS} showPopulation />
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          {!isFirst ? (
            <button
              type="button"
              onClick={goPrev}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
            >
              Previous
            </button>
          ) : (
            <span />
          )}

          <div className="flex gap-2">
            {!isLast && (
              <button
                type="button"
                onClick={goNext}
                className="rounded-lg border border-transparent bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-cyan-400"
              >
                Next
              </button>
            )}
            {isLast && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-emerald-400 bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-emerald-400"
              >
                Back to menu
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuidedExperience;
