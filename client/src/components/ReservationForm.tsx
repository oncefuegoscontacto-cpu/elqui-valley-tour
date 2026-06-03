import React, { useState } from 'react';
import { Calendar, Users, MapPin, Send } from 'lucide-react';

/**
 * Formulario de reservas con calendario
 * Incluye selección de fecha, número de personas, tipo de experiencia
 * Envía los datos a WhatsApp
 */
interface ReservationFormProps {
  selectedTour?: string;
}

export default function ReservationForm({ selectedTour }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    fecha: '',
    personas: '2',
    experiencia: selectedTour || 'tour-astronomico',
    nombre: '',
    email: '',
    telefono: '',
  });

  // Actualizar experiencia si selectedTour cambia
  React.useEffect(() => {
    if (selectedTour) {
      setFormData(prev => ({
        ...prev,
        experiencia: selectedTour
      }));
    }
  }, [selectedTour]);

  const experiences = [
    { id: 'tour-astronomico', label: 'Tour Astronómico' },
    { id: 'ruta-pisco', label: 'Ruta del Pisco' },
    { id: 'avistamiento-ballenas', label: 'Avistamiento de Ballenas' },
    { id: 'isla-damas', label: 'Isla Damas' },
    { id: 'fauna', label: 'Fauna del Humboldt' },
    { id: 'tierra-poesia', label: 'Tierra de Poesía' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
*Nueva Reserva - Elqui Valley Tour*

*Experiencia:* ${experiences.find(e => e.id === formData.experiencia)?.label}
*Fecha:* ${formData.fecha}
*Personas:* ${formData.personas}
*Nombre:* ${formData.nombre}
*Email:* ${formData.email}
*Teléfono:* ${formData.telefono}

Por favor confirmar disponibilidad.
    `.trim();

    const phone = '+56932795131';
    const url = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Reset form
    setFormData({
      fecha: '',
      personas: '2',
      experiencia: 'tour-astronomico',
      nombre: '',
      email: '',
      telefono: '',
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Reserva tu Experiencia</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Experiencia */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Experiencia
          </label>
          <select
            name="experiencia"
            value={formData.experiencia}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            {experiences.map(exp => (
              <option key={exp.id} value={exp.id} className="bg-gray-900 text-white">
                {exp.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Calendar className="inline w-4 h-4 mr-2" />
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Personas */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Users className="inline w-4 h-4 mr-2" />
            Número de Personas
          </label>
          <select
            name="personas"
            value={formData.personas}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num} className="bg-gray-900 text-white">
                {num} {num === 1 ? 'persona' : 'personas'}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="+56 9 XXXX XXXX"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-6"
        >
          <Send className="w-4 h-4" />
          Enviar a WhatsApp
        </button>
      </form>

      <p className="text-xs text-white/60 mt-4 text-center">
        Recibirás la confirmación en WhatsApp
      </p>
    </div>
  );
}
