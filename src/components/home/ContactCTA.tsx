import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-br from-equator-navy to-equator-blue py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-equator-sky/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-equator-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-display text-display-md md:text-display-lg text-white mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-body-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Tell us about your project and we'll get back within 24 hours with a tailored proposal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="bg-white text-equator-navy hover:bg-equator-silver px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-transform hover:-translate-y-1 shadow-lg w-full sm:w-auto justify-center"
          >
            Get a Free Quote
            <ArrowRight size={20} />
          </Link>
          <a
            href="tel:+911234567890"
            className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <Phone size={20} />
            Call Us Today
          </a>
        </div>
      </div>
    </section>
  );
}
