import React, { useState } from 'react';
import { X } from 'lucide-react';
import ReservationForm from './ReservationForm';

/**
 * Modal de reservas que se abre desde la navegación
 */
interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTour?: string;
}

export default function ReservationModal({ isOpen, onClose, selectedTour }: ReservationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>
        <ReservationForm selectedTour={selectedTour} />
      </div>
    </div>
  );
}
