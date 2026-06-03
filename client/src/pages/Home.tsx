import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { MessageCircle, Calendar, MapPin, Users, User, Mail, Phone, Globe, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Página principal de Elqui Valley Tour
 * Imágenes completas sin recortes
 * Botones clickeables dentro de las imágenes
 * Incluye sección de reservas integrada
 */

interface TourSection {
  id: string;
  image: string;
  alt: string;
  tourId?: string;
  tourName?: string;
  buttonAreas?: ButtonArea[];
}

interface ButtonArea {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: 'reserve' | 'whatsapp' | 'scroll';
  target?: string;
  tour?: string;
}

interface ReservationFormData {
  tour: string;
  date: string;
  guests: string;
  name: string;
  whatsapp: string;
  email: string;
  country: string;
  comments: string;
}

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  title: {
    es: 'Reserva tu Experiencia',
    en: 'Book Your Experience'
  },
  subtitle: {
    es: 'Completa el formulario y nos contactaremos en menos de 24 horas',
    en: 'Complete the form and we will contact you within 24 hours'
  },
  language: {
    es: 'Idioma',
    en: 'Language'
  },
  tourSelected: {
    es: 'Tour Seleccionado',
    en: 'Selected Tour'
  },
  selectTour: {
    es: 'Selecciona un tour',
    en: 'Select a tour'
  },
  astronomicTour: {
    es: 'Tour Astronómico',
    en: 'Astronomical Tour'
  },
  pisqueTour: {
    es: 'Tour Pisquero',
    en: 'Pisco Tour'
  },
  damosIsland: {
    es: 'Isla Damas',
    en: 'Damos Island'
  },
  charalIsland: {
    es: 'Isla Chañaral',
    en: 'Charal Island'
  },
  elquiValley: {
    es: 'Valle del Elqui',
    en: 'Elqui Valley'
  },
  pichasca: {
    es: 'Pichasca',
    en: 'Pichasca'
  },
  cityTour: {
    es: 'City Tour La Serena',
    en: 'City Tour La Serena'
  },
  desiredDate: {
    es: 'Fecha Deseada',
    en: 'Desired Date'
  },
  numberOfGuests: {
    es: 'Cantidad de Personas',
    en: 'Number of Guests'
  },
  fullName: {
    es: 'Nombre Completo',
    en: 'Full Name'
  },
  whatsapp: {
    es: 'WhatsApp',
    en: 'WhatsApp'
  },
  email: {
    es: 'Correo Electrónico',
    en: 'Email'
  },
  country: {
    es: 'País',
    en: 'Country'
  },
  additionalComments: {
    es: 'Comentarios Adicionales',
    en: 'Additional Comments'
  },
  bookViaWhatsapp: {
    es: 'Reservar por WhatsApp',
    en: 'Book via WhatsApp'
  },
  requiredField: {
    es: 'Campo obligatorio',
    en: 'Required field'
  },
  invalidEmail: {
    es: 'Email inválido',
    en: 'Invalid email'
  },
  minimumGuests: {
    es: 'Mínimo 1 persona',
    en: 'Minimum 1 guest'
  },
  confirmReservation: {
    es: '¿Confirmar reserva?',
    en: 'Confirm reservation?'
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel'
  },
  confirm: {
    es: 'Confirmar',
    en: 'Confirm'
  },
  selectDate: {
    es: 'Selecciona una fecha',
    en: 'Select a date'
  },
  optional: {
    es: '(Opcional)',
    en: '(Optional)'
  }
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [formData, setFormData] = useState<ReservationFormData>({
    tour: '',
    date: '',
    guests: '1',
    name: '',
    whatsapp: '',
    email: '',
    country: '',
    comments: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sections: TourSection[] = [
    {
      id: 'home',
      image: '/images/hero.png',
      alt: 'Elqui Valley Tour - Home',
      buttonAreas: [
        {
          x: 30,
          y: 65,
          width: 15,
          height: 6,
          label: 'Reservar por WhatsApp',
          action: 'whatsapp'
        },
        {
          x: 50,
          y: 65,
          width: 15,
          height: 6,
          label: 'Ver Experiencias',
          action: 'scroll',
          target: 'astronomico'
        }
      ]
    },
    {
      id: 'astronomico',
      image: '/images/tour_astronomico.png',
      alt: 'Tour Astronómico',
      tourId: 'astronomico',
      tourName: 'Tour Astronómico',
      buttonAreas: [
        {
          x: 25,
          y: 80,
          width: 15,
          height: 6,
          label: 'Tour Astronómico',
          action: 'reserve',
          tour: 'astronomico'
        }
      ]
    },
    {
      id: 'pisco',
      image: '/images/ruta_pisco.png',
      alt: 'Ruta del Pisco',
      tourId: 'pisco',
      tourName: 'Ruta del Pisco',
      buttonAreas: [
        {
          x: 25,
          y: 80,
          width: 15,
          height: 6,
          label: 'Ruta del Pisco',
          action: 'reserve',
          tour: 'pisco'
        }
      ]
    },
    {
      id: 'valle',
      image: '/images/valle_elqui.png',
      alt: 'Valle del Elqui',
      tourId: 'valle-del-elqui',
      tourName: 'Valle del Elqui',
      buttonAreas: [
        {
          x: 25,
          y: 80,
          width: 15,
          height: 6,
          label: 'Valle del Elqui',
          action: 'reserve',
          tour: 'valle-del-elqui'
        }
      ]
    },
    {
      id: 'isla-damas',
      image: '/images/fauna_humboldt_isla.png',
      alt: 'Fauna del Humboldt - Vida Salvaje en su Hábitat Natural',
      tourId: 'isla-damas',
      tourName: 'Fauna del Humboldt'
    },
    {
      id: 'fauna',
      image: '/images/fauna_humboldt.png',
      alt: 'Fauna del Humboldt'
    },
    {
      id: 'cultura',
      image: '/images/cultura.png',
      alt: 'Tierra de Poesía y Cultura'
    },
    {
      id: 'turismo-local',
      image: '/images/experiencias_gallery.png',
      alt: 'Experiencias Reales - Turismo Local'
    },
    {
      id: 'reservas',
      image: '/images/ballenas_reservas.png',
      alt: 'Avistamiento de Ballenas - Reserva tu Aventura'
    },
    {
      id: 'galeria',
      image: '/images/miles_viajeros.png',
      alt: 'Miles de Viajeros, Un Solo Destino Inolvidable'
    }
  ];

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const tours = [
    { id: 'tour-astronomico', label: t('astronomicTour') },
    { id: 'tour-pisquero', label: t('pisqueTour') },
    { id: 'isla-damas', label: t('damosIsland') },
    { id: 'isla-charal', label: t('charalIsland') },
    { id: 'valle-elqui', label: t('elquiValley') },
    { id: 'pichasca', label: t('pichasca') },
    { id: 'city-tour', label: t('cityTour') }
  ];

  const handleReserve = (tour: string) => {
    const tourMap: Record<string, string> = {
      'astronomico': 'tour-astronomico',
      'pisco': 'tour-pisquero',
      'isla-damas': 'isla-damas',
      'isla-chanal': 'isla-charal',
      'valle-del-elqui': 'valle-elqui',
      'pichasca': 'pichasca',
      'la-serena': 'city-tour'
    };
    const mappedTour = tourMap[tour] || tour;
    setFormData(prev => ({ ...prev, tour: mappedTour }));
    
    // Scroll a la sección de reservas
    setTimeout(() => {
      const element = document.getElementById('reservas-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleWhatsApp = () => {
    const phone = '56932795131';
    const message = 'Hola, me gustaría reservar una experiencia en Elqui Valley Tour';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleScroll = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (area: ButtonArea) => {
    if (area.action === 'reserve' && area.tour) {
      handleReserve(area.tour);
    } else if (area.action === 'whatsapp') {
      handleWhatsApp();
    } else if (area.action === 'scroll' && area.target) {
      handleScroll(area.target);
    }
  };

  const renderButtonAreas = (section: TourSection) => {
    if (!section.buttonAreas) return null;

    return section.buttonAreas.map((area, idx) => (
      <button
        key={idx}
        onClick={() => handleButtonClick(area)}
        className="absolute opacity-0 hover:opacity-20 bg-white transition-opacity duration-200 cursor-pointer rounded"
        style={{
          left: `${area.x}%`,
          top: `${area.y}%`,
          width: `${area.width}%`,
          height: `${area.height}%`,
          transform: 'translate(-50%, -50%)'
        }}
        title={area.label}
      />
    ));
  };

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.tour) newErrors.tour = t('requiredField');
    if (!formData.date) newErrors.date = t('requiredField');
    if (!formData.name) newErrors.name = t('requiredField');
    if (!formData.whatsapp) newErrors.whatsapp = t('requiredField');
    if (!formData.email) newErrors.email = t('requiredField');
    if (formData.email && !isValidEmail(formData.email)) newErrors.email = t('invalidEmail');
    if (parseInt(formData.guests) < 1) newErrors.guests = t('minimumGuests');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const sendToWhatsApp = () => {
    const selectedTour = tours.find(t => t.id === formData.tour)?.label || formData.tour;
    
    const messageTemplate = language === 'es'
      ? `Hola, quiero reservar un tour.

Tour: ${selectedTour}

Fecha: ${formData.date}

Personas: ${formData.guests}

Nombre: ${formData.name}

WhatsApp: ${formData.whatsapp}

Email: ${formData.email}

País: ${formData.country}

Comentarios:
${formData.comments}

Por favor enviar disponibilidad y valor.`
      : `Hello, I would like to book a tour.

Tour: ${selectedTour}

Date: ${formData.date}

Guests: ${formData.guests}

Name: ${formData.name}

WhatsApp: ${formData.whatsapp}

Email: ${formData.email}

Country: ${formData.country}

Comments:
${formData.comments}

Please send availability and pricing.`;

    const phone = '56932795131';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageTemplate)}`;
    window.open(url, '_blank');
    
    setShowConfirmation(false);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        tour: '',
        date: '',
        guests: '1',
        name: '',
        whatsapp: '',
        email: '',
        country: '',
        comments: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-black">
      {/* SECTIONS CON IMÁGENES */}
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="w-full relative"
          style={{ minHeight: 'auto' }}
        >
          <img
            src={section.image}
            alt={section.alt}
            className="w-full h-auto object-contain object-center"
            style={{ display: 'block', maxHeight: 'none' }}
          />

          {/* Botones clickeables dentro de la imagen */}
          <div className="absolute inset-0 pointer-events-none">

            {section.buttonAreas && (
              <div className="relative w-full h-full pointer-events-auto">
                {renderButtonAreas(section)}
              </div>
            )}
          </div>

          {/* Botón "Reservar Ahora" visible en esquina inferior derecha */}
          {section.tourId && (
            <button
              onClick={() => handleReserve(section.tourId!)}
              className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-1 md:gap-2 shadow-lg z-10"
            >
              <MessageCircle size={14} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden md:inline">Reservar Ahora</span>
              <span className="md:hidden">Reservar</span>
            </button>
          )}
        </section>
      ))}

      {/* SECCIÓN DE FORMULARIO DE RESERVAS */}
      <section
        id="reservas-form"
        className="w-full bg-gradient-to-br from-black via-gray-900 to-black py-8 md:py-16"
      >
        <div className="max-w-2xl mx-auto px-4">
          {/* Language Selector */}
          <div className="flex gap-2 justify-center mb-12">
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                language === 'es'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                language === 'en'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              EN
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">{t('title')}</h1>
            <p className="text-white/60 text-lg">{t('subtitle')}</p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3 text-green-300">
              <CheckCircle size={24} />
              <span>{language === 'es' ? 'Reserva enviada a WhatsApp exitosamente' : 'Reservation sent to WhatsApp successfully'}</span>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tour Selection */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={18} />
                  {t('tourSelected')}
                </label>
                <select
                  name="tour"
                  value={formData.tour}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.tour ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">{t('selectTour')}</option>
                  {tours.map(tour => (
                    <option key={tour.id} value={tour.id} className="bg-gray-900">
                      {tour.label}
                    </option>
                  ))}
                </select>
                {errors.tour && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.tour}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Calendar size={18} />
                  {t('desiredDate')}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.date ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.date}
                  </p>
                )}
              </div>

              {/* Guests */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Users size={18} />
                  {t('numberOfGuests')}
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.guests ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.guests && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.guests}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <User size={18} />
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.name}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare size={18} />
                  {t('whatsapp')}
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+56 9 XXXX XXXX"
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.whatsapp ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.whatsapp && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.whatsapp}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Mail size={18} />
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Globe size={18} />
                  {t('country')}
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder={language === 'es' ? 'Tu país' : 'Your country'}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                />
              </div>

              {/* Comments */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  {t('additionalComments')} <span className="text-white/50 text-sm">{t('optional')}</span>
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder={language === 'es' ? 'Comentarios adicionales...' : 'Additional comments...'}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2 text-lg"
              >
                <MessageSquare size={20} />
                {t('bookViaWhatsapp')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">{t('confirmReservation')}</h3>
            <div className="space-y-3 mb-6 text-white/80 text-sm">
              <p><strong>{t('tourSelected')}:</strong> {tours.find(t => t.id === formData.tour)?.label}</p>
              <p><strong>{t('desiredDate')}:</strong> {formData.date}</p>
              <p><strong>{t('numberOfGuests')}:</strong> {formData.guests}</p>
              <p><strong>{t('fullName')}:</strong> {formData.name}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
              >
                {t('cancel')}
              </button>
              <button
                onClick={sendToWhatsApp}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
