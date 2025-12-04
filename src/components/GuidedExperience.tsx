type GuidedExperienceProps = {
  onBack: () => void;
};

function GuidedExperience({ onBack }: GuidedExperienceProps) {
  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
        >
          Back to menu
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Prototype</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Guided Mode — Narrated Journey
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Follow a curated sequence of prompts and visualisations that unpack how automated systems might influence
          civic choices. More narration and visuals will appear here soon.
        </p>
      </div>
    </section>
  );
}

export default GuidedExperience;
