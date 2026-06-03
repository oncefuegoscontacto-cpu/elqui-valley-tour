import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Navegación sticky transparente sobre la imagen hero
 * Menú centrado con "Reservas" en lugar de "Nosotros"
 * Selector de idiomas (ES/EN)
 * Sin fondo negro, solo transparencia
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { label: 'INICIO', id: 'home' },
    { label: 'TOURS', id: 'astronomico' },
    { label: 'EXPERIENCIAS', id: 'pisco' },
    { label: 'DESTINOS', id: 'valle' },
    { label: 'RESERVAS', path: '/reservas', isReservas: true },
  ];

  const handleNavigation = (item: any) => {
    setIsMenuOpen(false);
    
    if (item.isReservas) {
      // Navegar a la página de reservas
      setLocation('/reservas');
      return;
    } else {
      // Obtener la ruta actual
      const currentPath = window.location.pathname;
      
      // Si no estamos en la página principal, navegar a ella primero
      if (currentPath !== '/') {
        setLocation('/');
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      } else {
        // Si ya estamos en la página principal, solo hacer scroll
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleWhatsApp = () => {
    const phone = '56932795131';
    const message = language === 'es' 
      ? 'Hola, me gustaría reservar una experiencia en Elqui Valley Tour'
      : 'Hello, I would like to book an experience at Elqui Valley Tour';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="text-white text-sm font-semibold hover:text-green-400 transition-colors duration-300 cursor-pointer tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Selector - Center Right */}
          <div className="hidden md:flex items-center gap-2 mr-6">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                language === 'es'
                  ? 'bg-green-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ES
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-green-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* WhatsApp Button - Right Side */}
          <button
            onClick={handleWhatsApp}
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer font-semibold shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.37 1.237-3.285 2.144-1.831 1.832-2.911 4.28-2.911 6.881 0 1.758.363 3.497 1.075 5.093L2.323 22l2.447-.745c1.529.855 3.285 1.274 5.051 1.274h.004c5.407 0 9.8-4.393 9.8-9.8 0-2.621-1.079-5.086-3.04-6.938-1.962-1.853-4.565-2.872-7.327-2.872z" />
            </svg>
            WhatsApp
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white cursor-pointer"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 space-y-3 bg-black/80 backdrop-blur-md rounded-lg p-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left text-white text-sm font-semibold hover:text-green-400 transition-colors duration-300 py-3 px-4 cursor-pointer tracking-wide"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Selector Mobile */}
            <div className="border-t border-white/20 pt-3 mt-3">
              <p className="text-white/60 text-xs font-semibold px-4 mb-2">
                {language === 'es' ? 'Idioma' : 'Language'}
              </p>
              <div className="flex gap-2 px-4">
                <button
                  onClick={() => setLanguage('es')}
                  className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition-all duration-300 ${
                    language === 'es'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors duration-300 text-sm font-semibold mt-4 cursor-pointer"
            >
              {language === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
