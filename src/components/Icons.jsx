// Iconos propios en SVG (sin assets de Apple). Heredan el color con currentColor.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}><path fill="currentColor" d="M7 4.5v15l12.5-7.5z" /></svg>
);

export const PauseIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}><path fill="currentColor" d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
);

export const ReplayIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={2.2} {...props}><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" /></svg>
);

export const ArrowRightIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} strokeWidth={2} {...props}><path d="M9 6l6 6-6 6" /></svg>
);

export const ChatIcon = (props) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...props}>
    <path fill="currentColor" d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5zm5.3 13.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.4.1.1.1.7-.1 1.3z" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}><path d="M4 8h16M4 16h16" /></svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const PlusIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}><path d="M12 5v14M5 12h14" /></svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} strokeWidth={2.4} className="shrink-0 text-forge" {...props}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

// Iconos de las páginas de servicio: siluetas genéricas de dispositivos y de cada tema
const platformPaths = {
  qa: <><rect x="5" y="4" width="14" height="17" rx="2.5" /><path d="M9 4.5V3h6v1.5M8.5 12.5l2.2 2.2 4.8-4.8" /></>,
  a11y: <><circle cx="12" cy="4.5" r="1.6" /><path d="M5 8.5c2.3.8 4.6 1.2 7 1.2s4.7-.4 7-1.2M12 9.7v4.3M12 14l-3 6.5M12 14l3 6.5" /></>,
  update: <><path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12a7.5 7.5 0 0 1 13.2-4.9" /><path d="M18 3.5v3.8h-3.8M6 20.5v-3.8h3.8" /></>,
  saas: <><path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 9z" /><path d="M10 14.5l1.5 1.5 3-3" /></>,
  business: <><path d="M3.5 20.5h17M5.5 20.5V9l6.5-4.5L18.5 9v11.5" /><path d="M9.5 20.5v-5h5v5M9 11h.01M15 11h.01" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><circle cx="16.5" cy="9" r="2.4" /><path d="M15.5 14.6c2.5-.3 4.4 1.3 5 4.4" /></>,
  iphone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M10.5 5h3" /></>,
  ipad: <><rect x="4" y="2.5" width="16" height="19" rx="2.5" /><circle cx="12" cy="18.6" r=".6" /></>,
  mac: <><rect x="3" y="4" width="18" height="12" rx="1.6" /><path d="M1.5 19.5h21M9 16l-.5 3.5M15 16l.5 3.5" /></>,
  watch: <><rect x="6.5" y="6" width="11" height="12" rx="3" /><path d="M9 6l.6-3.5h4.8L15 6M9 18l.6 3.5h4.8L15 18M17.5 11h1" /></>,
  tv: <><rect x="2.5" y="4.5" width="19" height="12" rx="1.6" /><path d="M8 20h8M12 16.5V20" /></>,
  vision: <><path d="M3 10.5c0-2.5 2-4 5-4h8c3 0 5 1.5 5 4v1.5c0 2.6-1.8 4.5-4.2 4.5-1.8 0-2.6-1.2-4.8-1.2s-3 1.2-4.8 1.2C4.8 16.5 3 14.6 3 12z" /></>,
};

export const PlatformIcon = ({ id, ...props }) => (
  <svg viewBox="0 0 24 24" width="40" height="40" {...base} strokeWidth={1.2} {...props}>{platformPaths[id]}</svg>
);
