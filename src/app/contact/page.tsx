"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle"); // idle, loading, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-32 bg-white min-h-screen relative selection:bg-equator-blue selection:text-white overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-equator-blue/10 via-equator-sky/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-equator-silver text-equator-navy text-xs font-bold tracking-widest uppercase mb-8 border border-equator-navy/5 shadow-sm">
            Contact Us
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-equator-navy leading-[1.1] tracking-tight mb-8">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Build Together.</span>
          </h1>
          <p className="text-xl md:text-2xl text-equator-charcoal/60 leading-relaxed font-light max-w-2xl mx-auto">
            Ready to elevate your retail space or streamline your facility operations? Our team is standing by to execute.
          </p>
        </div>
      </section>

      <section className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="bg-equator-silver/30 rounded-[3rem] p-4 md:p-8 border border-equator-silver shadow-2xl shadow-equator-navy/5 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            {/* Contact Info Panel */}
            <div className="bg-equator-navy rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-equator-blue blur-[80px] rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
              
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl mb-4">Get in Touch</h2>
                <p className="text-white/60 mb-12 font-light">
                  Fill out the form, or reach out to us directly using the information below.
                </p>
                
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-equator-sky/20 transition-colors duration-300">
                      <MapPin size={24} className="text-equator-sky" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Corporate Office</h4>
                      <p className="text-white/70 leading-relaxed font-light">
                        101, Equator House, Business Park<br />
                        Andheri East, Mumbai 400059<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-equator-sky/20 transition-colors duration-300">
                      <Phone size={24} className="text-equator-sky" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Call Us</h4>
                      <p className="text-white/70 leading-relaxed font-light">
                        +91 98765 43210<br />
                        +91 22 1234 5678
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-equator-sky/20 transition-colors duration-300">
                      <Mail size={24} className="text-equator-sky" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Email Us</h4>
                      <p className="text-white/70 leading-relaxed font-light">
                        info@equatorproperty.com<br />
                        sales@equatorproperty.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {formState === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <Send size={40} className="text-green-500" />
                    </div>
                    <h3 className="font-display text-3xl text-equator-navy mb-4">Message Sent!</h3>
                    <p className="text-equator-charcoal/60 text-lg">
                      Thank you for reaching out. A member of our team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setFormState("idle")}
                      className="mt-8 px-8 py-3 rounded-full border border-equator-silver font-bold text-equator-navy hover:bg-equator-silver transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-equator-navy uppercase tracking-wider">First Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white border border-equator-silver rounded-xl px-5 py-4 focus:outline-none focus:border-equator-blue focus:ring-1 focus:ring-equator-blue transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-equator-navy uppercase tracking-wider">Last Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white border border-equator-silver rounded-xl px-5 py-4 focus:outline-none focus:border-equator-blue focus:ring-1 focus:ring-equator-blue transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-equator-navy uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white border border-equator-silver rounded-xl px-5 py-4 focus:outline-none focus:border-equator-blue focus:ring-1 focus:ring-equator-blue transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-equator-navy uppercase tracking-wider">Service of Interest</label>
                      <select className="w-full bg-white border border-equator-silver rounded-xl px-5 py-4 focus:outline-none focus:border-equator-blue focus:ring-1 focus:ring-equator-blue transition-all appearance-none">
                        <option>Retail Turnkey Projects</option>
                        <option>Technical Facility Services</option>
                        <option>Housekeeping Solutions</option>
                        <option>Other / General Inquiry</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-equator-navy uppercase tracking-wider">Message</label>
                      <textarea 
                        rows={4}
                        required
                        className="w-full bg-white border border-equator-silver rounded-xl px-5 py-4 focus:outline-none focus:border-equator-blue focus:ring-1 focus:ring-equator-blue transition-all resize-none"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full bg-equator-blue hover:bg-equator-navy text-white font-bold py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
                    >
                      {formState === "loading" ? "Sending..." : "Send Message"} 
                      {formState !== "loading" && <ArrowRight size={20} />}
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
