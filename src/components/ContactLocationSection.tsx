import { useState, FormEvent } from 'react';
import { MapPin, Phone, Clock, Compass, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function ContactLocationSection() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSubmitted(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Error submitting message. Please call 0321 8440321.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0c0b] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
            Visit Us in Lahore
          </span>
          <h2
            id="contact-heading"
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4]"
          >
            Location &amp; Contact
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a8a194] font-light">
            Conveniently located in Johar Town, Phase 1. Dine in, take away, or order home delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Restaurant Details Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-[#131110] rounded-xl border border-[#2b2724] p-8 shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-[#f2ede4] tracking-wide">
                THE LAMB HOUSE
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#c88a38] font-semibold mt-1">
                Authentic Pakistani Meat House
              </p>

              <div className="mt-8 space-y-6">
                
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#1c1a18] border border-[#2d2925] flex items-center justify-center text-[#c88a38] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8f887b] uppercase tracking-wider">Address</h4>
                    <p className="text-base text-[#f2ede4] font-medium mt-1 leading-snug">
                      445, Block G1, Block G 1 Phase 1,<br />
                      Johar Town, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#1c1a18] border border-[#2d2925] flex items-center justify-center text-[#c88a38] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8f887b] uppercase tracking-wider">Phone / Delivery</h4>
                    <a
                      href="tel:03218440321"
                      className="text-lg text-[#c88a38] font-bold hover:underline block mt-0.5"
                    >
                      0321 8440321
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#1c1a18] border border-[#2d2925] flex items-center justify-center text-[#c88a38] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8f887b] uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-base text-[#f2ede4] font-medium mt-1">
                      Monday – Sunday (Daily)
                    </p>
                    <p className="text-sm text-[#ded5c5]">
                      2:30 PM – 2:00 AM (Late Night)
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="pt-6 border-t border-[#24211e]">
                  <h4 className="text-xs font-semibold text-[#8f887b] uppercase tracking-wider mb-3">
                    Restaurant Features &amp; Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Outdoor seating',
                      'Home delivery',
                      'Counter service',
                      'Family friendly',
                      'Suitable for groups',
                      'High-quality meat',
                      'Late-night dining',
                    ].map((feat) => (
                      <span
                        key={feat}
                        className="px-3 py-1 rounded bg-[#1a1816] text-[#c88a38] text-xs font-medium border border-[#332f2b]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:03218440321"
                    id="contact-call-now-btn"
                    className="flex-1 min-w-[140px] py-3 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                  <a
                    href="https://maps.app.goo.gl/JacoscgzBPpPYr1d8"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-get-directions-btn"
                    className="flex-1 min-w-[140px] py-3 rounded bg-[#1e1c1a] hover:bg-[#292623] text-[#f2ede4] border border-[#383430] text-center font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#c88a38]" />
                    Get Directions
                  </a>
                </div>

              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="rounded-xl overflow-hidden border border-[#2b2724] bg-[#121110] shadow-xl h-64">
              <iframe
                title="The Lamb House Johar Town Lahore Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4862024765954!2d74.27063467628357!3d31.45579997424367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919016e7bb46c69%3A0xe5eb6c4294ee5c93!2sThe%20Lamb%20House!5e0!3m2!1sen!2spk!4v1710000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quick Message / Inquiries Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#131110] rounded-xl border border-[#2b2724] p-8 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-[#f2ede4]">
                Send an Enquiry
              </h3>
              <p className="text-xs text-[#a8a194] mt-1 mb-6">
                Have questions regarding private catering, whole lamb orders, or group bookings? Write to us below.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded bg-[#171514] border border-[#302b26]">
                  <CheckCircle className="w-10 h-10 text-[#5cb85c] mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-bold text-[#f2ede4]">Message Sent</h4>
                  <p className="text-xs text-[#ded5c5] mt-2">
                    Thank you for contacting The Lamb House. Our manager will reply promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded bg-[#211e1c] text-xs font-semibold text-[#c88a38]"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="e.g. Usman Ali"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        required
                        placeholder="0321 8440321"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="name@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-[#ded5c5] uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Ask about table availability, takeout orders, or special cuts..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#181615] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
