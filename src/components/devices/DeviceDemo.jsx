import { MacFrame, PhoneFrame, TabletFrame, TVFrame, VisionWindow, WatchFrame } from './DeviceFrames';
import { VideoScreen, VisionRoom, VisionTicTacToe } from './DeviceScreens';

// Tamaño base (px) de cada dispositivo: todo el marco va en em
const deviceSizes = { iphone: 11, watch: 15, vision: 10.5, mac: 11.5, ipad: 10.5, tv: 11 };

const showcase = (name) => ({ src: `/assets/showcase/${name}.mp4`, poster: `/assets/showcase/${name}.jpg` });

// Dispositivo con su demo. `media` permite cambiar el vídeo; por defecto usa el del escaparate.
const DeviceDemo = ({ device, media, label = '' }) => {
  const video = media ?? showcase(device);

  switch (device) {
    case 'iphone':
      return <PhoneFrame><VideoScreen {...video} label={label} /></PhoneFrame>;
    case 'watch':
      return <WatchFrame><VideoScreen {...video} label={label} /></WatchFrame>;
    case 'mac':
      return <MacFrame><VideoScreen {...video} label={label} /></MacFrame>;
    case 'ipad':
      return <TabletFrame portrait><VideoScreen {...video} label={label} /></TabletFrame>;
    case 'tv':
      return <TVFrame><VideoScreen {...video} label={label} /></TVFrame>;
    case 'vision':
      return (
        <div className="relative w-[50em] h-[34em] rounded-[2.4em] flex-center">
          <VisionRoom />
          <VisionWindow
            className="relative"
            ornament={['✕', '◯', '↺'].map((symbol) => (
              <span key={symbol} className="w-[2.6em] h-[2.6em] rounded-full flex-center bg-white/10 text-[0.9em]">{symbol}</span>
            ))}
          >
            <VisionTicTacToe />
          </VisionWindow>
        </div>
      );
    default:
      return null;
  }
};

// Escenario con rejilla y brillo, escalado al ancho disponible
export const DeviceStage = ({ device, media, label, className = '' }) => (
  <div className={`relative rounded-[2.5rem] bg-gradient-to-b from-neutral-900/80 to-black border border-white/5 overflow-hidden flex-center [--device-scale:0.58] sm:[--device-scale:0.8] md:[--device-scale:1] ${className}`}>
    <div className="absolute inset-0 grid-backdrop opacity-60" aria-hidden="true" />
    <div className="absolute w-2/3 h-2/3 rounded-full bg-forge/15 blur-[90px]" aria-hidden="true" />
    <div className="device-stage-inner relative" style={{ fontSize: `calc(${deviceSizes[device]}px * var(--device-scale))` }}>
      <DeviceDemo device={device} media={media} label={label} />
    </div>
  </div>
);

export default DeviceDemo;
