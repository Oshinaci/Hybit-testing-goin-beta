import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useLandingTranslation } from '../translations/landingTranslations';

export const Testimonials: React.FC = () => {
  const t = useLandingTranslation();

  return (
    <section className="py-24 sm:py-32 relative bg-[#0C0C0F]/40 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            {t.principles.kicker}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t.principles.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.principles.subtitle}
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.principles.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-[#141418] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: User avatar + name */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#0095FF] p-0.5 flex items-center justify-center font-bold text-xs text-white">
                    <div className="w-full h-full rounded-full bg-[#18181B] flex items-center justify-center">
                      {item.avatar}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {item.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0095FF]" />
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {item.role} · <span className="text-neutral-300">{item.company}</span>
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Metric Callout */}
              {item.metric && (
                <div className="pt-5 mt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <span className="text-[#0095FF]">✓</span>
                  <span>{item.metric}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
