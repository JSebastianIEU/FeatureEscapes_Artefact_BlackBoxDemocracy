import { motion } from 'framer-motion';

type LandingProps = {
  onSelectMode: (mode: 'guided' | 'free') => void;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function Landing({ onSelectMode }: LandingProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-90" />
      <div className="absolute inset-0 blur-3xl">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-cyan-500/20" />
          <div className="absolute right-[12%] top-[28%] h-40 w-40 rounded-full bg-pink-500/15" />
          <div className="absolute bottom-[10%] left-[40%] h-28 w-28 rounded-full bg-emerald-400/15" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-4xl font-semibold uppercase tracking-[0.2em] text-slate-100 sm:text-5xl"
          >
            Black Box Democracy
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 text-lg text-slate-300 sm:text-xl"
          >
            A minimal playground to explore how AI and human choices can shape collective decision-making.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onSelectMode('guided')}
                className="rounded-xl bg-cyan-500 px-6 py-4 text-lg font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-400 active:translate-y-0.5"
              >
                Guided Mode (Narrated)
              </button>
              <button
                type="button"
                onClick={() => onSelectMode('free')}
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-4 text-lg font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-900"
              >
                Free Mode (Explore)
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default Landing;
