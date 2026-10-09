import React from 'react';
import { motion } from 'motion/react';
import {
  KeyRound,
  Code2,
  FileCheck2,
  Cpu,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useLandingTranslation } from '../translations/landingTranslations';

export const Security: React.FC = () => {
  const t = useLandingTranslation();

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'user-control':
        return KeyRound;
      case 'passkey-login':
        return Lock;
      case 'encrypted-infrastructure':
        return Cpu;
      case 'account-recovery':
        return FileCheck2;
      case 'data-privacy':
      default:
        return Code2;
    }
  };

  return (
    <section id="security" className="py-24 sm:py-32 relative bg-[#09090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            {t.security.kicker}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t.security.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.security.subtitle}
          </p>
        </div>

        {/* Security Cards Grid: Asymmetric Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.security.pillars.map((pillar, idx) => {
            const Icon = getPillarIcon(pillar.id);
            const isWide = idx === 0;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative rounded-3xl bg-[#141418] border border-white/[0.08] hover:border-white/[0.16] p-7 transition-all duration-300 flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#0095FF]">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-emerald-400">
                      {pillar.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {pillar.subtitle}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {pillar.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{t.security.bottomTitle}</div>
              <div className="text-xs text-neutral-400">{t.security.bottomSubtitle}</div>
            </div>
          </div>

          <a
            href="#faq"
            className="text-xs font-semibold text-[#0095FF] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>{t.security.bottomLink}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
