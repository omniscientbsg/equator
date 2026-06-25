import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";

export default function RetailTurnkeyPage() {
  return (
    <div className="pt-32 pb-24 bg-white">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-equator-silver text-equator-navy text-xs font-bold mb-6">
            SERVICE 01 — RETAIL TURNKEY
          </div>
          <h1 className="font-display text-display-md md:text-display-xl text-equator-navy mb-8">
            Complete Store Execution — From Concept to Handover
          </h1>
          <p className="text-body-lg text-equator-charcoal/70 mb-10 max-w-2xl">
            Equator manages every stage of retail store development so brands can focus on opening day, not the process.
          </p>
          <div className="flex gap-12 border-t border-b border-equator-silver py-6">
            <div>
              <div className="font-mono text-2xl font-bold text-equator-sky">1,000,000+</div>
              <div className="text-sm font-medium text-equator-charcoal/60">Sq. ft. executed</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-equator-sky">500+</div>
              <div className="text-sm font-medium text-equator-charcoal/60">Retail stores completed</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-equator-sky">PAN India</div>
              <div className="text-sm font-medium text-equator-charcoal/60">Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl text-equator-navy mb-6">Built for Brands Who Scale</h2>
            <p className="text-equator-charcoal/70 leading-relaxed mb-6">
              Our turnkey project services are designed for brands looking for a seamless execution partner. From planning and civil work to fixtures, lighting, branding, and final setup — we handle the complete execution process with structured coordination, quality control, and timely delivery.
            </p>
            <p className="text-equator-charcoal/70 leading-relaxed">
              With a strong execution network and experienced project management team, we ensure smooth coordination across vendors, timelines, and on-site operations to deliver retail spaces that are efficient, functional, and aligned with brand standards.
            </p>
          </div>
          <div className="bg-equator-silver/50 p-10 rounded-3xl">
            <h3 className="font-bold text-equator-navy mb-6">Scope of Work</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Store Planning & Design",
                "Final Store Setup & Handover",
                "Civil & Interior Execution",
                "Flooring & Ceiling Solutions",
                "Electrical Works",
                "Branding & Signage",
                "Fixture Installation",
                "Lighting Systems",
                "Site Supervision",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckSquare size={18} className="text-equator-sky shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-equator-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-equator-charcoal text-white py-24 mb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="font-display text-display-sm mb-16 text-center">Execution Process</h2>
          <div className="max-w-4xl mx-auto">
            {[
              { title: "Brief & Site Survey", desc: "Understand brand guidelines, store format, site constraints." },
              { title: "Planning & Design", desc: "Detailed drawings, BOQ preparation, vendor finalization." },
              { title: "Civil & Interior Execution", desc: "Flooring, ceiling, electrical rough-in, civil modifications." },
              { title: "Fixture & Fit-Out", desc: "Furniture, fixtures, display systems — manufactured and installed." },
              { title: "Branding & Signage", desc: "All visual identity elements installed per brand standards." },
              { title: "Quality Check & Snagging", desc: "Multi-point quality audit before handover." },
              { title: "Handover", desc: "Final walkthrough, documentation, keys handed to client." },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 mb-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-equator-sky flex items-center justify-center font-mono font-bold text-equator-sky group-hover:bg-equator-sky group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  {i < 6 && <div className="w-px h-full bg-white/20 my-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-display text-display-sm text-equator-navy mb-8">Ready to Open Your Next Store?</h2>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-equator-blue text-white px-8 py-4 rounded-full font-bold hover:bg-equator-navy transition-colors">
          Start Your Project <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
