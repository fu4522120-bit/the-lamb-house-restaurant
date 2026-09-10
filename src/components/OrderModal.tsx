import { MenuItem } from '../types';
import { X, Phone, MessageSquare, MapPin, Clock, Calendar } from 'lucide-react';
import { getImageUrl } from '../data/restaurantData';

interface OrderModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onGoToReservation: () => void;
}

export function OrderModal({ dish, onClose, onGoToReservation }: OrderModalProps) {
  if (!dish) return null;

  return (
    <div
      id="order-enquiry-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#131110] rounded-xl border border-[#332e29] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-[#c88a38] hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dish Media */}
        <div className="relative aspect-[16/9] bg-[#1a1816]">
          <img
            src={getImageUrl(dish.imageUrl)}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131110] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
            <h3 className="text-xl font-serif font-bold text-white">
              {dish.name}
            </h3>
            {dish.price && (
              <span className="text-sm font-semibold text-[#c88a38] px-2 py-0.5 rounded bg-black/70">
                {dish.price}
              </span>
            )}
          </div>
        </div>

        {/* Content & Ordering Instructions */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#ded5c5] leading-relaxed">
            {dish.description}
          </p>

          <div className="p-3.5 rounded bg-[#181615] border border-[#292521] space-y-2 text-xs text-[#a8a194]">
            <div className="flex items-center gap-2 text-[#f2ede4]">
              <Clock className="w-3.5 h-3.5 text-[#c88a38]" />
              <span>Cooked fresh to order (Average preparation: 20-30 mins)</span>
            </div>
            <div className="flex items-center gap-2 text-[#f2ede4]">
              <MapPin className="w-3.5 h-3.5 text-[#c88a38]" />
              <span>Available for Dine-in, Takeaway &amp; Home Delivery in Johar Town</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="tel:03218440321"
              className="w-full py-3 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call 0321 8440321 to Order
            </a>

            <button
              onClick={() => {
                onClose();
                onGoToReservation();
              }}
              className="w-full py-2.5 rounded bg-[#1e1c1a] hover:bg-[#282522] text-[#ded5c5] border border-[#332f2b] text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#c88a38]" />
              Book a Table for this Dish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
