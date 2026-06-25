import Link from "next/link";
import { ArrowRight, Wrench, Settings } from "lucide-react";

export default function TechnicalServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-white">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-equator-silver text-equator-navy text-xs font-bold mb-6">
            SERVICE 02 — TECHNICAL SERVICES
          </div>
          <h1 className="font-display text-display-md md:text-display-xl text-equator-navy mb-8">
            Reliable Technical Support. Zero Downtime.
          </h1>
          <p className="text-body-lg text-equator-charcoal/70 mb-10 max-w-2xl">
            Equator's technical service division ensures commercial and retail facilities operate without interruption — day in, day out.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl text-equator-navy mb-6">Proactive Facility Care</h2>
            <p className="text-equator-charcoal/70 leading-relaxed mb-6">
              Our technical service division focuses on preventive maintenance, operational efficiency, and quick response support for commercial and retail facilities.
            </p>
            <p className="text-equator-charcoal/70 leading-relaxed">
              With experienced technical teams and systematic service management, we help businesses reduce downtime and maintain smooth operational performance.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <Settings className="text-equator-sky" /> Reduced Downtime
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <Settings className="text-equator-sky" /> Faster Response
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <Settings className="text-equator-sky" /> Preventive Planning
              </div>
              <div className="flex items-center gap-2 font-bold text-equator-navy">
                <Settings className="text-equator-sky" /> Skilled Teams
              </div>
            </div>
          </div>
          
          <div className="bg-equator-charcoal text-white p-10 rounded-3xl shadow-equator">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Wrench size={24} className="text-equator-sky" />
              </div>
              <h3 className="font-display text-2xl">Support Includes</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Electrical Maintenance",
                "HVAC Services",
                "Plumbing Support",
                "Preventive Maintenance",
                "Lighting & Utility Management",
                "Civil Repair Works",
                "Breakdown Assistance",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 bg-equator-sky rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="bg-equator-silver py-24 mb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-equator-navy mb-4">Value-Added Services</h2>
            <p className="text-equator-charcoal/70 max-w-2xl mx-auto">Beyond standard maintenance, we provide comprehensive audits and staff welfare programs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {[
              "Electrical Thermography",
              "Electrical Audit",
              "Earth Pit Checking",
              "Visual Panel Check",
              "Lux Measurement",
              "Equipment Check",
              "Power Analysis",
              "Fire System Check",
              "SOP & Checklists",
              "Staff Rewards & Recognition",
              "Staff Birthday Celebrations",
            ].map((item, i) => (
              <div key={i} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-black/5 font-medium text-equator-navy">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-display text-display-sm text-equator-navy mb-8">Need Technical Facility Support?</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-equator-blue text-white px-8 py-4 rounded-full font-bold hover:bg-equator-navy transition-colors">
          Get a Technical Assessment <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
