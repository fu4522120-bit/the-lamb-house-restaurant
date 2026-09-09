import { Sparkles, Utensils, Users, Moon } from 'lucide-react';

export function WhyUsSection() {
  const features = [
    {
      title: 'QUALITY MEAT',
      description: 'Carefully prepared meat dishes with rich, satisfying flavour.',
      icon: Sparkles,
    },
    {
      title: 'AUTHENTIC FLAVOURS',
      description: 'Traditional Pakistani flavours presented with a modern restaurant experience.',
      icon: Utensils,
    },
    {
      title: 'FAMILY & GROUP DINING',
      description: 'A comfortable choice for families, friends and groups.',
      icon: Users,
    },
    {
      title: 'LATE-NIGHT DINING',
      description: 'Open daily until 2:00 AM.',
      icon: Moon,
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0a0a09] border-b border-[#1f1c1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
            The Lamb House Standard
          </span>
          <h2
            id="why-us-heading"
            className="mt-2 text-3xl sm:text-4xl font-bold font-serif text-[#f2ede4]"
          >
            Why Dine With Us
          </h2>
          <p className="mt-3 text-[#a8a194] text-base font-light">
            Dedicated to genuine Pakistani meat artistry, uncompromised quality, and heartfelt hospitality.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                id={`why-card-${index + 1}`}
                className="p-8 rounded-lg bg-[#121110] border border-[#262320] hover:border-[#c88a38]/60 transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#1c1a18] border border-[#332f2b] flex items-center justify-center text-[#c88a38] group-hover:text-white group-hover:bg-[#c88a38] transition-colors mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#f2ede4] tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#b5ada0] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1e1c19] text-[11px] uppercase tracking-widest text-[#787165]">
                  0{index + 1} // Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
