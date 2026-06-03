import React from 'react';

/**
 * Botón flotante WhatsApp
 * Se posiciona en la esquina inferior derecha
 * Tamaño responsive: pequeño en móvil, más grande en desktop
 */
export default function WhatsAppButton() {
  const handleClick = () => {
    const phone = '+56932795131';
    const message = 'Hola, me gustaría reservar una experiencia en Elqui Valley Tour';
    const url = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-2.5 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.37 1.237-3.285 2.144-1.831 1.832-2.911 4.28-2.911 6.881 0 1.758.363 3.497 1.075 5.093L2.323 22l2.447-.745c1.529.855 3.285 1.274 5.051 1.274h.004c5.407 0 9.8-4.393 9.8-9.8 0-2.621-1.079-5.086-3.04-6.938-1.962-1.853-4.565-2.872-7.327-2.872z" />
      </svg>
    </button>
  );
}
