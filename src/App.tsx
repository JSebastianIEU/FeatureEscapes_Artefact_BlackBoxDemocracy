import { useState } from 'react';
import Landing from './components/Landing';
import GuidedExperience from './components/GuidedExperience';
import FreeMode from './components/FreeMode';

export type Mode = 'none' | 'guided' | 'free';

function App() {
  const [mode, setMode] = useState<Mode>('none');

  const handleBackToMenu = () => setMode('none');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {mode === 'none' && <Landing onSelectMode={(nextMode) => setMode(nextMode)} />}
      {mode === 'guided' && <GuidedExperience onBack={handleBackToMenu} />}
      {mode === 'free' && <FreeMode onBack={handleBackToMenu} />}
    </div>
  );
}

export default App;
