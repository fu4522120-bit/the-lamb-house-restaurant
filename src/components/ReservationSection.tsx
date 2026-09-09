import { useState, FormEvent } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: '4',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);
    setLoading(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit reservation');
      }

      // Mandatory notice required by prompt:
      setSuccessNotice('Your reservation request has been received. The restaurant will contact you to confirm availability.');
      setFormData({
        name: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '20:00',
        guests: '4',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please call 0321 8440321 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-24 bg-[#0a0a09] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
              Plan Your Feast
            </span>
            <h2
              id="reservation-heading"
              className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4]"
            >
              Book a Table
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a8a194] font-light max-w-xl mx-auto">
              Reserve your group or family dining experience in Johar Town, Lahore. Open daily from 2:30 PM until 2:00 AM.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#121110] rounded-xl border border-[#2b2724] p-6 sm:p-10 shadow-2xl shadow-black/80">
            {successNotice ? (
              <div
                id="reservation-success-box"
                className="py-10 px-6 text-center rounded-lg bg-[#161413] border border-[#3b362f]"
              >
                <div className="w-14 h-14 rounded-full bg-[#1e2e1a] text-[#5cb85c] flex items-center justify-center mx-auto mb-4 border border-[#2e4726]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f2ede4]">
                  Reservation Request Received
                </h3>
                <p className="mt-3 text-sm text-[#ded5c5] max-w-md mx-auto leading-relaxed">
                  Your reservation request has been received. The restaurant will contact you to confirm availability.
                </p>
                <div className="mt-6 pt-6 border-t border-[#262320] text-xs text-[#8f887b]">
                  Need immediate confirmation? Call our front desk at{' '}
                  <a href="tel:03218440321" className="text-[#c88a38] font-bold hover:underline">
                    0321 8440321
                  </a>
                </div>
                <button
                  onClick={() => setSuccessNotice(null)}
                  className="mt-6 px-6 py-2 rounded bg-[#211e1c] text-[#ded5c5] hover:text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Make Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="reservation-form" className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="res-name" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#c88a38]" /> Name *
                    </label>
                    <input
                      type="text"
                      id="res-name"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] placeholder-[#6b6458] focus:outline-none focus:border-[#c88a38]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="res-phone" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#c88a38]" /> Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="res-phone"
                      required
                      placeholder="0321 8440321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] placeholder-[#6b6458] focus:outline-none focus:border-[#c88a38]"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="res-date" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c88a38]" /> Date *
                    </label>
                    <input
                      type="date"
                      id="res-date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-1.5">
                    <label htmlFor="res-time" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c88a38]" /> Expected Arrival Time *
                    </label>
                    <select
                      id="res-time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                    >
                      <option value="15:00">3:00 PM (Lunch)</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM (Dinner Rush)</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="23:00">11:00 PM</option>
                      <option value="00:00">12:00 AM (Late Night)</option>
                      <option value="01:00">1:00 AM (Late Night)</option>
                    </select>
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="space-y-1.5">
                  <label htmlFor="res-guests" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c88a38]" /> Number of Guests *
                  </label>
                  <select
                    id="res-guests"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Standard Table)</option>
                    <option value="6">6 Persons (Family Table)</option>
                    <option value="8">8 Persons (Large Family)</option>
                    <option value="10">10 Persons (Group Feast)</option>
                    <option value="15">15+ Persons (Private Group Arrangement)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="res-message" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#c88a38]" /> Special Requests / Seating Preference
                  </label>
                  <textarea
                    id="res-message"
                    rows={3}
                    placeholder="e.g. Prefer outdoor seating, family high chairs, or reserving mutton shinwari in advance."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] placeholder-[#6b6458] focus:outline-none focus:border-[#c88a38]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="res-submit-btn"
                  disabled={loading}
                  className="w-full py-4 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#c88a38]/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    'Request Reservation'
                  )}
                </button>

                <p className="text-[11px] text-center text-[#7e766a]">
                  * No automatic charge. A staff member from The Lamb House will phone or message you to confirm seating availability.
                </p>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
