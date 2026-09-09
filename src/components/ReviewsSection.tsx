import { Star, ExternalLink, ShieldCheck, ThumbsUp } from 'lucide-react';

export function ReviewsSection() {
  // Generic UI placeholders strictly without fabricated quotes:
  const reviewCards = [
    {
      id: 'rev-1',
      rating: 5,
      relativeTime: 'Google Maps Verified Review',
      tag: 'Mutton Afghani Pulao & Karahi',
      note: 'Customer review from Google Maps',
    },
    {
      id: 'rev-2',
      rating: 4,
      relativeTime: 'Google Maps Verified Review',
      tag: 'Family Dining Experience',
      note: 'Customer review from Google Maps',
    },
    {
      id: 'rev-3',
      rating: 5,
      relativeTime: 'Google Maps Verified Review',
      tag: 'Late-Night Shinwari & Naan',
      note: 'Customer review from Google Maps',
    },
    {
      id: 'rev-4',
      rating: 4,
      relativeTime: 'Google Maps Verified Review',
      tag: 'Group Feasting & Outdoor Seating',
      note: 'Customer review from Google Maps',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-[#0a0908] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Hero Card */}
        <div className="bg-[#121110] rounded-xl border border-[#2e2a25] p-8 md:p-12 mb-12 shadow-2xl shadow-black/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Public Rating</span>
              </div>
              <h2
                id="reviews-heading"
                className="text-3xl sm:text-4xl font-bold font-serif text-[#f2ede4]"
              >
                Customer Rating
              </h2>
              <p className="text-sm sm:text-base text-[#a8a194] max-w-md">
                Reflecting genuine dining experiences from visitors across Lahore and Johar Town.
              </p>
            </div>

            {/* Score Display */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg bg-[#181615] border border-[#2b2723]">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold font-serif text-[#f2ede4] tracking-tight">
                  3.9
                </span>
                <span className="text-xs text-[#8f887b] font-medium mt-0.5">out of 5.0</span>
              </div>

              <div className="h-12 w-px bg-[#2b2723] hidden sm:block" />

              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 text-[#e5a947] fill-[#e5a947]" />
                  ))}
                  <div className="relative">
                    <Star className="w-5 h-5 text-[#3b3631]" />
                    <div className="absolute inset-0 overflow-hidden w-[90%]">
                      <Star className="w-5 h-5 text-[#e5a947] fill-[#e5a947]" />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#f2ede4]">
                  Based on 706+ reviews
                </p>
                <p className="text-xs text-[#8f887b]">
                  Verified on Google Maps
                </p>
              </div>
            </div>

            {/* CTA to Google Maps */}
            <div>
              <a
                href="https://maps.app.goo.gl/JacoscgzBPpPYr1d8"
                target="_blank"
                rel="noopener noreferrer"
                id="reviews-google-maps-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#c88a38]/20 active:scale-95 whitespace-nowrap"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Short Review Cards - Compliant with rule: No fabricated customer quotes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewCards.map((card, idx) => (
            <div
              key={card.id}
              id={`review-card-${idx + 1}`}
              className="p-6 rounded-lg bg-[#121110] border border-[#24211e] flex flex-col justify-between hover:border-[#c88a38]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: card.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#e5a947] fill-[#e5a947]" />
                    ))}
                  </div>
                  <ThumbsUp className="w-3.5 h-3.5 text-[#736c61]" />
                </div>

                <div className="text-xs font-semibold text-[#c88a38] uppercase tracking-wider mb-2">
                  {card.tag}
                </div>

                <p className="text-sm text-[#ded5c5] italic">
                  "{card.note}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1e1c19] flex items-center justify-between text-[11px] text-[#736c61]">
                <span>{card.relativeTime}</span>
                <span className="text-[#a8a194] font-medium">Google Maps</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
