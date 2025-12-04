type FreeModeProps = {
  onBack: () => void;
};

function FreeMode({ onBack }: FreeModeProps) {
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
          Free Mode — Exploration Space
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Experiment with open-ended inputs and watch how they ripple through a decision space. This area will soon
          host the scatter plot and graph interactions.
        </p>
      </div>
    </section>
  );
}

export default FreeMode;
