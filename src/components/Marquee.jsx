// Fila infinita: renderiza los items dos veces y la animación CSS desplaza la mitad
const Marquee = ({ items, renderItem, reverse = false, duration = 45, className = '' }) => (
  <div className={`marquee ${className}`}>
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ '--marquee-duration': `${duration}s` }}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
          {items.map((item, i) => (
            <div key={i} className="shrink-0">{renderItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
