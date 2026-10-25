import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Vídeo en bucle dentro de un marco de dispositivo
export const VideoScreen = ({ src, poster, label }) => (
  <video
    src={src}
    poster={poster}
    aria-label={label}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="w-full h-full object-cover"
  />
);

// DuviTricky (visionOS): partida de tres en raya que se juega sola
const MOVES = [4, 0, 2, 8, 6]; // X gana en la diagonal 2-4-6
const WIN = [2, 4, 6];

export const VisionTicTacToe = () => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(() => (reducedMotion() ? MOVES.length : 0));

  useEffect(() => {
    if (reducedMotion()) return;
    // una jugada cada 0,8 s y, al ganar, una pausa antes de empezar de nuevo
    const timer = setTimeout(() => setStep((prev) => (prev > MOVES.length + 2 ? 0 : prev + 1)), step === 0 ? 600 : 800);
    return () => clearTimeout(timer);
  }, [step]);

  const played = MOVES.slice(0, Math.min(step, MOVES.length));
  const won = step >= MOVES.length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[1.2em] p-[1.6em]">
      <div className="flex items-center justify-between w-full">
        <p className="text-[1.5em] font-semibold">DuviTricky</p>
        <span className={`px-[0.9em] py-[0.35em] rounded-full text-[0.8em] font-semibold transition-colors ${won ? 'bg-forge/30 text-white' : 'bg-white/15'}`}>
          {won ? (lang === 'es' ? '✕ gana' : '✕ wins') : `${lang === 'es' ? 'Turno' : 'Turn'} ${played.length % 2 === 0 ? '✕' : '◯'}`}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[0.7em]">
        {Array.from({ length: 9 }, (_, i) => {
          const index = played.indexOf(i);
          const mark = index === -1 ? '' : index % 2 === 0 ? 'x' : 'o';
          const highlight = won && WIN.includes(i);
          return (
            <div
              key={i}
              className={`w-[4.6em] h-[4.6em] rounded-[1.1em] flex-center font-bold border transition-all duration-500 shadow-[inset_0_0.05em_0_rgba(255,255,255,0.3)] ${highlight ? 'bg-forge/25 border-forge/80 shadow-[0_0_1.5em_rgba(255,106,26,0.6)] scale-105' : 'bg-white/10 border-white/15'}`}
            >
              <span className={`text-[2.2em] leading-none transition-all duration-300 ${mark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} ${mark === 'x' ? 'text-forge-light' : 'text-white'}`}>
                {mark === 'x' ? '✕' : mark === 'o' ? '◯' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Fondo de "habitación" para visionOS
export const VisionRoom = () => (
  <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
    <div className="absolute inset-0 bg-gradient-to-b from-[#3b2f2a] via-[#1f1a18] to-[#0d0b0a]" />
    <div className="absolute -left-[10%] top-[10%] w-[50%] h-[60%] rounded-full bg-[#c9874a]/30 blur-[60px]" />
    <div className="absolute right-[5%] top-[5%] w-[30%] h-[45%] rounded-[2em] bg-[#8fb3d9]/20 blur-[30px]" />
    <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/70 to-transparent" />
  </div>
);
