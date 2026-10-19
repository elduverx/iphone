import { useEffect, useState } from 'react';
import { contact } from '../constants';
import { whatsappUrl } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { ChatIcon } from './Icons';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(false);

  // en la sección de contacto ya hay un acceso a WhatsApp: el botón flotante se aparta
  useEffect(() => {
    const section = document.getElementById('contacto');
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(contact.whatsapp, t('contact.whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.whatsapp')}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-5 right-5 z-40 w-14 h-14 flex-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-110 transition-all duration-300 ${hidden ? 'opacity-0 translate-y-4 pointer-events-none' : ''}`}
    >
      <ChatIcon />
    </a>
  );
};

export default WhatsAppButton;
