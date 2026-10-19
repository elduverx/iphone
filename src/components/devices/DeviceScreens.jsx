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

// CarPlay: concepto de app de movilidad
export const CarPlayScreen = () => {
  const { lang } = useLanguage();
  const es = lang === 'es';
  const [eta, setEta] = useState(4);

  // cuenta atrás del tiempo de llegada, en bucle
  useEffect(() => {
    if (reducedMotion()) return;
    const timer = setInterval(() => setEta((prev) => (prev <= 1 ? 4 : prev - 1)), 1750);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex bg-[#0b0b0d]">
      <div className="w-[4.2em] flex flex-col items-center justify-between py-[1em] bg-black/60">
        <p className="text-[0.85em] font-semibold">9:41</p>
        <div className="flex flex-col gap-[0.6em]">
          {['bg-forge', 'bg-[#30D158]', 'bg-[#0A84FF]'].map((c) => (
            <div key={c} className={`w-[2.4em] h-[2.4em] rounded-[0.6em] ${c}`} />
          ))}
        </div>
        <div className="w-[1.8em] h-[1.8em] rounded-[0.5em] border border-white/30" />
      </div>
      <div className="relative flex-1 overflow-hidden">
        {/* mapa */}
        <div className="absolute inset-0 bg-[#1b1d22]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_0.1em,transparent_0.1em),linear-gradient(90deg,rgba(255,255,255,0.08)_0.1em,transparent_0.1em)] [background-size:3em_3em]" />
        <svg viewBox="0 0 300 140" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path id="carplay-route" d="M20 120 C 80 110, 90 60, 150 62 S 230 30, 280 20" fill="none" stroke="#FF6A1A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="280" cy="20" r="7" fill="#FF6A1A" stroke="#fff" strokeWidth="2" />
          {/* el coche recorre la ruta */}
          <circle r="7" fill="#fff" stroke="#FF6A1A" strokeWidth="3">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#carplay-route" />
            </animateMotion>
          </circle>
        </svg>
        <div className="absolute left-[1em] bottom-[1em] w-[15em] rounded-[1em] bg-black/75 backdrop-blur border border-white/10 p-[0.9em]">
          <p className="text-[0.75em] text-gray-200">{es ? 'Tu conductor llega en' : 'Your driver arrives in'}</p>
          <p className="text-[1.6em] font-semibold leading-tight tabular-nums">{eta} min</p>
          <p className="text-[0.75em] text-gray mt-[0.2em]">Tesla Model 3 · 1234 KLM</p>
        </div>
      </div>
    </div>
  );
};
