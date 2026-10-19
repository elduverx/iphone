import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import { useLanguage } from '../i18n/LanguageContext';

// Colores del tema "Default (Dark)" de Xcode
const tokenColors = {
  k: 'text-[#FC5FA3] font-semibold', // palabra clave
  d: 'text-[#5DD8FF]', // tipo declarado
  t: 'text-[#D0A8FF]', // tipo del sistema
  m: 'text-[#A167E6]', // miembro del sistema
  s: 'text-[#FC6A5D]', // cadena
  n: 'text-[#D0BF69]', // número
  p: 'text-white', // texto plano
};

// Cada línea es una lista de [tipo, texto]; el título de la tarjeta depende del idioma
const buildCode = (cardTitle) => [
  [['k', 'import'], ['p', ' SwiftUI']],
  [],
  [['k', 'struct'], ['p', ' '], ['d', 'ActivityCard'], ['p', ': '], ['t', 'View'], ['p', ' {']],
  [['p', '    '], ['k', 'let'], ['p', ' progress: '], ['t', 'Double']],
  [],
  [['p', '    '], ['k', 'var'], ['p', ' body: '], ['k', 'some'], ['p', ' '], ['t', 'View'], ['p', ' {']],
  [['p', '        '], ['t', 'VStack'], ['p', '(alignment: .'], ['m', 'leading'], ['p', ', spacing: '], ['n', '12'], ['p', ') {']],
  [['p', '            '], ['t', 'Text'], ['p', '('], ['s', `"${cardTitle}"`], ['p', ')']],
  [['p', '                .'], ['m', 'font'], ['p', '(.'], ['m', 'headline'], ['p', ')']],
  [['p', '            '], ['t', 'Gauge'], ['p', '(value: progress) {']],
  [['p', '                '], ['t', 'Text'], ['p', '(progress, format: .'], ['m', 'percent'], ['p', ')']],
  [['p', '            }']],
  [['p', '            .'], ['m', 'gaugeStyle'], ['p', '(.'], ['m', 'accessoryCircularCapacity'], ['p', ')']],
  [['p', '            .'], ['m', 'tint'], ['p', '(.'], ['m', 'orange'], ['p', ')']],
  [['p', '        }']],
  [['p', '        .'], ['m', 'padding'], ['p', '('], ['n', '20'], ['p', ')']],
  [['p', '        .'], ['m', 'glassEffect'], ['p', '(in: .'], ['m', 'rect'], ['p', '(cornerRadius: '], ['n', '28'], ['p', '))']],
  [['p', '    }']],
  [['p', '}']],
];

const RING = 2 * Math.PI * 34;
const PROGRESS = 0.87;

const CodeShowcase = () => {
  const { t } = useLanguage();
  const sectionRef = useRef();
  const percentRef = useRef();
  const code = buildCode(t('code.cardTitle'));

  useGSAP(() => {
    animateWithGsap('#code_title', { y: 0, opacity: 1 })

    const counter = { value: 0 };
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#code-window', start: 'top 75%', once: true },
    });

    tl.to('.code-line', { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out' })
      .to('#preview-card', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.3')
      .to('#preview-ring', { strokeDashoffset: RING * (1 - PROGRESS), duration: 1.4, ease: 'power3.out' }, '<0.2')
      .to(counter, {
        value: PROGRESS * 100,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => { percentRef.current.textContent = `${Math.round(counter.value)}%`; },
      }, '<');

    gsap.to('.code-point', {
      scrollTrigger: { trigger: '.code-point', start: 'top 85%' },
      opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="common-padding relative overflow-hidden">
      <div className="glow-orb w-[35vw] h-[35vw] bg-forge/15 top-1/3 -right-[10%]" aria-hidden="true" />

      <div className="screen-max-width relative">
        <h2 id="code_title" className="section-heading">{t('code.title')}</h2>
        <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4 max-w-2xl">{t('code.subtitle')}</p>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          {/* ventana de código */}
          <div id="code-window" className="glass-card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-gray font-semibold">ActivityCard.swift</span>
            </div>
            <pre className="p-5 md:p-7 text-[11px] sm:text-[13px] md:text-sm leading-relaxed font-mono overflow-x-auto">
              <code>
                {code.map((line, i) => (
                  <div key={i} className="code-line opacity-0 -translate-x-3 flex">
                    <span className="select-none w-8 shrink-0 text-right pr-4 text-neutral-600">{i + 1}</span>
                    <span className="whitespace-pre">
                      {line.map(([type, text], j) => (
                        <span key={j} className={tokenColors[type]}>{text}</span>
                      ))}
                      {i === code.length - 1 && <span className="caret ml-1" />}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* resultado en vivo */}
          <div className="flex flex-col items-center">
            <div className="relative w-[250px] aspect-[9/19.5] rounded-[2.8rem] border-[6px] border-neutral-800 overflow-hidden bg-gradient-to-br from-[#2a1206] via-black to-[#06142a] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-black" />
              <div className="absolute inset-0 flex-center px-5">
                <div id="preview-card" className="opacity-0 scale-75 w-full rounded-[28px] bg-white/10 border border-white/20 backdrop-blur-xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                  <p className="font-semibold mb-3">{t('code.cardTitle')}</p>
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
                      <circle
                        id="preview-ring"
                        cx="40" cy="40" r="34" fill="none" stroke="#FF9F0A" strokeWidth="7" strokeLinecap="round"
                        strokeDasharray={RING} strokeDashoffset={RING}
                      />
                    </svg>
                    <span ref={percentRef} className="absolute inset-0 flex-center text-sm font-semibold">0%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray text-xs mt-4">{t('code.preview')}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {t('code.points').map((point, i) => (
            <li key={i} className="code-point opacity-0 translate-y-10 border-t border-neutral-700 pt-5 text-gray-200 font-semibold">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CodeShowcase;
