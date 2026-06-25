import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function HousekeepingServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-white">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-equator-silver text-equator-navy text-xs font-bold mb-6">
            SERVICE 03 — HOUSEKEEPING
          </div>
          <h1 className="font-display text-display-md md:text-display-xl text-equator-navy mb-8">
            Clean Spaces. Consistent Standards. Every Day.
          </h1>
          <p className="text-body-lg text-equator-charcoal/70 mb-10 max-w-2xl">
            Professional housekeeping solutions designed to maintain clean, organized, and hygienic commercial and retail spaces.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl text-equator-navy mb-6">Structured Hygiene Management</h2>
            <p className="text-equator-charcoal/70 leading-relaxed mb-6">
              Our housekeeping teams are trained to maintain high operational standards while ensuring consistency, hygiene, and smooth day-to-day upkeep across facilities.
            </p>
            <p className="text-equator-charcoal/70 leading-relaxed mb-8">
              We follow structured cleaning schedules, quality checks, and efficient manpower management to support workplaces that are well-maintained and professionally managed.
            </p>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <CheckCircle size={20} className="text-equator-sky" /> Trained Staff
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <CheckCircle size={20} className="text-equator-sky" /> Scheduled Maintenance
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <CheckCircle size={20} className="text-equator-sky" /> Quality Standards
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <CheckCircle size={20} className="text-equator-sky" /> Reliable Operations
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Retail & Commercial Cleaning",
              "Data Centre Cleaning",
              "Floor Care & Maintenance",
              "Washroom Hygiene Management",
              "Glass & Facade Cleaning",
              "Deep Cleaning Services",
              "Pantry & Utility Area Support",
              "Waste Management",
            ].map((item, i) => (
              <div key={i} className="bg-equator-silver/40 p-6 rounded-2xl flex flex-col justify-center min-h-[120px] text-center border border-transparent hover:border-equator-sky/30 transition-colors">
                <span className="font-medium text-equator-navy text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Centre Callout */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="bg-equator-navy rounded-3xl p-10 md:p-16 text-white text-center shadow-equator relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-equator-sky/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <Sparkles size={48} className="text-equator-gold mx-auto mb-6" />
            <h2 className="font-display text-3xl mb-6">Data Centre Specialization</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
              Data Centre cleaning requires a different standard. Our teams are trained for static-sensitive environments, precision cleaning protocols, and strict access management required by India's leading data centre operators.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-equator-silver">
              <span className="px-4 py-2 rounded-full bg-white/10">Lumina CloudInfra</span>
              <span className="px-4 py-2 rounded-full bg-white/10">Digital Edge DC</span>
              <span className="px-4 py-2 rounded-full bg-white/10">NSE</span>
              <span className="px-4 py-2 rounded-full bg-white/10">State Bank of India</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-display text-display-sm text-equator-navy mb-8">Ready for Cleaner, Safer Spaces?</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-equator-blue text-white px-8 py-4 rounded-full font-bold hover:bg-equator-navy transition-colors">
          Request Housekeeping Proposal <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
