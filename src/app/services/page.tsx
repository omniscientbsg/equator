import Link from "next/link";
import { ArrowRight, Building2, Wrench, Sparkles, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const features = [
    { name: "Retail + Technical + Housekeeping under one roof", eq: true, typical: false },
    { name: "ISO 9001 & 45001 certified", eq: true, typical: false },
    { name: "PAN India deployment", eq: true, typical: false },
    { name: "Structured SOPs & checklists", eq: true, typical: true },
    { name: "Data centre-grade cleaning", eq: true, typical: false },
    { name: "1M+ sq. ft. track record", eq: true, typical: false },
  ];

  return (
    <div className="pt-32 pb-0 bg-white selection:bg-equator-blue selection:text-white">
      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-equator-sky/10 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-equator-silver text-equator-navy text-xs font-bold tracking-widest uppercase mb-8 border border-equator-navy/5 shadow-sm">
            Our Services
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-equator-navy leading-[1.1] tracking-tight mb-8">
            One Partner.<br />
            Three Pillars.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Zero Gaps.</span>
          </h1>
          <p className="text-xl md:text-2xl text-equator-charcoal/60 max-w-3xl leading-relaxed font-light">
            Whether you're building a new retail store, maintaining a corporate campus, or cleaning a data centre — Equator delivers the expertise, systems, and manpower to get it done right.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-32 space-y-32">
        
        {/* Retail Turnkey */}
        <div className="flex flex-col md:flex-row gap-16 items-center group">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-equator-silver/50 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
            <div className="aspect-[4/3] bg-equator-navy rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-xl shadow-equator-navy/5 group-hover:shadow-2xl group-hover:shadow-equator-navy/20 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="Retail Turnkey" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-equator-navy/80 to-transparent" />
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 relative z-10 group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                <Building2 size={48} strokeWidth={1.5} className="text-white" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-sm tracking-widest font-bold text-equator-sky mb-4 uppercase">
              Service 01
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-equator-navy mb-6">
              Retail Turnkey Projects
            </h2>
            <p className="text-lg text-equator-charcoal/60 leading-relaxed font-light mb-8">
              Complete store execution from planning and civil work to fixtures, lighting, branding, and final handover. We've delivered 1M+ sq. ft. across India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {["Store Planning & Design", "Civil & Interior Execution", "Electrical Works", "Fixture Manufacturing", "Branding & Signage", "Final Setup"].map(item => (
                <div key={item} className="flex items-center gap-3 text-equator-navy font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-equator-sky" /> {item}
                </div>
              ))}
            </div>
            <Link href="/services/retail-turnkey" className="inline-flex items-center gap-3 bg-equator-navy text-white px-8 py-4 rounded-full font-bold hover:bg-equator-blue hover:scale-105 transition-all duration-300">
              View Full Details <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Technical Services */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center group">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-equator-silver/50 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
            <div className="aspect-[4/3] bg-equator-navy rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-xl shadow-equator-navy/5 group-hover:shadow-2xl group-hover:shadow-equator-navy/20 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80" alt="Technical Facility Services" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-equator-navy/80 to-transparent" />
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 relative z-10 group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                <Wrench size={48} strokeWidth={1.5} className="text-white" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-sm tracking-widest font-bold text-equator-sky mb-4 uppercase">
              Service 02
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-equator-navy mb-6">
              Technical Facility Services
            </h2>
            <p className="text-lg text-equator-charcoal/60 leading-relaxed font-light mb-8">
              Preventive maintenance, HVAC, electrical, plumbing, and breakdown assistance — keeping commercial and retail spaces running without interruption.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {["Electrical Maintenance", "HVAC Services", "Plumbing Support", "Preventive Maintenance", "Lighting Management", "Civil Repair"].map(item => (
                <div key={item} className="flex items-center gap-3 text-equator-navy font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-equator-sky" /> {item}
                </div>
              ))}
            </div>
            <Link href="/services/technical" className="inline-flex items-center gap-3 bg-equator-navy text-white px-8 py-4 rounded-full font-bold hover:bg-equator-blue hover:scale-105 transition-all duration-300">
              View Full Details <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Housekeeping */}
        <div className="flex flex-col md:flex-row gap-16 items-center group">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-equator-silver/50 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
            <div className="aspect-[4/3] bg-equator-navy rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-xl shadow-equator-navy/5 group-hover:shadow-2xl group-hover:shadow-equator-navy/20 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80" alt="Housekeeping Solutions" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-equator-navy/80 to-transparent" />
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 relative z-10 group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                <Sparkles size={48} strokeWidth={1.5} className="text-white" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-sm tracking-widest font-bold text-equator-sky mb-4 uppercase">
              Service 03
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-equator-navy mb-6">
              Housekeeping Solutions
            </h2>
            <p className="text-lg text-equator-charcoal/60 leading-relaxed font-light mb-8">
              Trained teams, structured cleaning schedules, and quality checks for commercial, retail, data centre, and hospitality environments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {["Retail Cleaning", "Data Centre Cleaning", "Floor Care", "Washroom Hygiene", "Deep Cleaning", "Waste Management"].map(item => (
                <div key={item} className="flex items-center gap-3 text-equator-navy font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-equator-sky" /> {item}
                </div>
              ))}
            </div>
            <Link href="/services/housekeeping" className="inline-flex items-center gap-3 bg-equator-navy text-white px-8 py-4 rounded-full font-bold hover:bg-equator-blue hover:scale-105 transition-all duration-300">
              View Full Details <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </section>

      {/* Comparison Table */}
      <section className="bg-equator-navy text-white py-32 mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Why Choose an Integrated Partner?</h2>
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto">See how a unified approach compares to fragmented vendor management.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-6 px-6 border-b border-white/10 font-bold text-xl">The Requirement</th>
                    <th className="py-6 px-6 border-b border-white/10 font-display text-3xl text-equator-sky text-center">Equator</th>
                    <th className="py-6 px-6 border-b border-white/10 font-bold text-xl text-white/40 text-center">Typical Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="py-6 px-6 border-b border-white/5 font-light text-lg">{feature.name}</td>
                      <td className="py-6 px-6 border-b border-white/5 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-equator-sky/20 text-equator-sky group-hover:scale-110 transition-transform">
                          {feature.eq ? <CheckCircle2 size={24} /> : "✗"}
                        </div>
                      </td>
                      <td className="py-6 px-6 border-b border-white/5 text-center text-white/40 font-light">
                        {feature.typical ? "Variable" : "Rarely"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
