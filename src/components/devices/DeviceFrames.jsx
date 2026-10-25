// Marcos de dispositivos en CSS. Todas las medidas van en em:
// para escalar un dispositivo basta con cambiar el font-size del contenedor.

const titanium = 'bg-gradient-to-b from-[#3a3a3c] via-[#1c1c1e] to-[#2c2c2e]';

export const PhoneFrame = ({ children, className = '' }) => (
  <div className={`relative w-[17em] h-[36.8em] rounded-[2.9em] p-[0.45em] ${titanium} shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.9),inset_0_0_0_0.08em_rgba(255,255,255,0.12)] ${className}`}>
    <div className="relative w-full h-full rounded-[2.5em] overflow-hidden bg-black">
      {children}
      <div className="absolute top-[0.7em] left-1/2 -translate-x-1/2 w-[5.4em] h-[1.55em] rounded-full bg-black z-20" />
    </div>
  </div>
);

export const WatchFrame = ({ children, className = '' }) => (
  <div className={`relative w-[12em] ${className}`}>
    {/* correa */}
    <div className="absolute left-1/2 -translate-x-1/2 -top-[4.5em] w-[8.4em] h-[5.5em] rounded-t-[2em] bg-gradient-to-b from-transparent via-[#2a2a2c] to-[#3a3a3c]" />
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4.5em] w-[8.4em] h-[5.5em] rounded-b-[2em] bg-gradient-to-t from-transparent via-[#2a2a2c] to-[#3a3a3c]" />
    {/* corona digital y botón lateral */}
    <div className="absolute -right-[0.55em] top-[3.2em] w-[0.8em] h-[2.3em] rounded-[0.35em] bg-gradient-to-r from-[#4a4a4c] to-[#2a2a2c]" />
    <div className="absolute -right-[0.3em] top-[7.4em] w-[0.5em] h-[2.6em] rounded-[0.25em] bg-[#2a2a2c]" />
    <div className={`relative h-[14.6em] rounded-[3.4em] p-[0.55em] ${titanium} shadow-[0_2em_4em_-1em_rgba(0,0,0,0.9),inset_0_0_0_0.08em_rgba(255,255,255,0.15)]`}>
      <div className="w-full h-full rounded-[2.9em] overflow-hidden bg-black">{children}</div>
    </div>
  </div>
);

// Ventana de visionOS: cristal flotante con barra para moverla y ornamento lateral
export const VisionWindow = ({ children, ornament, className = '' }) => (
  <div className={`relative w-[38em] ${className}`}>
    {ornament && (
      <div className="absolute -left-[4.4em] top-1/2 -translate-y-1/2 flex flex-col gap-[0.9em] p-[0.7em] rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl">
        {ornament}
      </div>
    )}
    <div className="h-[23em] rounded-[2.4em] overflow-hidden bg-white/[0.08] border border-white/20 backdrop-blur-2xl shadow-[0_3em_6em_-2em_rgba(0,0,0,0.7),inset_0_0.08em_0_rgba(255,255,255,0.3)]">
      {children}
    </div>
    <div className="mx-auto mt-[0.9em] w-[6em] h-[0.5em] rounded-full bg-white/40" />
  </div>
);

export const MacFrame = ({ children, className = '' }) => (
  <div className={`relative w-[44em] flex flex-col items-center ${className}`}>
    <div className="w-[38em] h-[24.5em] rounded-t-[1.3em] p-[0.55em] pb-[1.4em] bg-[#0f0f10] shadow-[inset_0_0_0_0.08em_rgba(255,255,255,0.12)]">
      <div className="relative w-full h-full rounded-[0.6em] overflow-hidden bg-black">
        {children}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[5em] h-[0.9em] rounded-b-[0.5em] bg-[#0f0f10] z-20" />
      </div>
    </div>
    <div className="w-full h-[1.2em] rounded-b-[1.2em] bg-gradient-to-b from-[#c7c7cc] to-[#6e6e73] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6em] h-[0.45em] rounded-b-[0.4em] bg-[#8e8e93]" />
    </div>
  </div>
);

export const TabletFrame = ({ children, portrait = false, className = '' }) => (
  <div className={`relative ${portrait ? 'w-[26.5em] h-[35.2em]' : 'w-[37em] h-[26.5em]'} rounded-[2.2em] p-[0.85em] ${titanium} shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.9),inset_0_0_0_0.08em_rgba(255,255,255,0.12)] ${className}`}>
    <div className="w-full h-full rounded-[1.4em] overflow-hidden bg-black">{children}</div>
  </div>
);

export const TVFrame = ({ children, className = '' }) => (
  <div className={`relative w-[42em] flex flex-col items-center ${className}`}>
    <div className="w-full h-[23.6em] rounded-[0.7em] p-[0.4em] bg-[#0b0b0c] shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.9),inset_0_0_0_0.08em_rgba(255,255,255,0.1)]">
      <div className="w-full h-full rounded-[0.4em] overflow-hidden bg-black">{children}</div>
    </div>
    <div className="w-[1.6em] h-[1.6em] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e]" />
    <div className="w-[12em] h-[0.5em] rounded-full bg-[#2c2c2e]" />
  </div>
);
