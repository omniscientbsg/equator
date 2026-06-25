"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const CLIENTS = [
  { name: "Amazon", category: "Retail Turnkey", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Flipkart", category: "Retail Turnkey", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg" },
  { name: "Crossword", category: "Retail Turnkey", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Crossword_Bookstores_Logo.png" },
  { name: "Swiggy", category: "Retail Turnkey", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg" },
  { name: "AWS", category: "Housekeeping", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Bain & Company", category: "Housekeeping", logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Bain_and_Company_Logo.svg" },
  { name: "DLF", category: "Housekeeping", logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/DLF_logo.svg" },
  { name: "Godrej", category: "Housekeeping", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Godrej_Logo.svg" },
  { name: "HDFC Bank", category: "Housekeeping", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" },
  { name: "Lodha", category: "Technical", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lodha_Group_Logo.svg/512px-Lodha_Group_Logo.svg.png" },
  { name: "JLL", category: "Technical", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/JLL_logo.svg" },
  { name: "BCG", category: "Technical", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Boston_Consulting_Group_2018_logo.svg" },
  { name: "CBRE", category: "Technical", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/CBRE_Group_logo.svg" },
  { name: "NSE", category: "Data Centres", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/National_Stock_Exchange_of_India_logo.svg" },
  { name: "SBI", category: "Data Centres", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" },
];

const CATEGORIES = ["All", "Retail Turnkey", "Housekeeping", "Technical", "Data Centres"];

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredClients = CLIENTS.filter(
    (client) => activeTab === "All" || client.category === activeTab
  );

  return (
    <div className="pt-32 pb-32 bg-equator-silver/20 min-h-screen relative selection:bg-equator-blue selection:text-white">
      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-equator-sky/10 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-20">
        <div className="max-w-4xl text-center mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-equator-navy text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            Our Partners
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-equator-navy leading-[1.1] tracking-tight mb-8">
            Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Leading Brands</span>
          </h1>
          <p className="text-xl md:text-2xl text-equator-charcoal/60 leading-relaxed font-light max-w-3xl mx-auto">
            From e-commerce giants to institutional banks, global consultancies to data centre operators — Equator delivers where it matters most.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-equator-navy/5 border border-equator-silver/50">
              <div className="font-display text-5xl md:text-6xl text-equator-blue mb-2">30+</div>
              <div className="text-sm font-bold text-equator-charcoal/50 uppercase tracking-widest">Enterprise Clients</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-equator-navy/5 border border-equator-silver/50">
              <div className="font-display text-5xl md:text-6xl text-equator-blue mb-2">500+</div>
              <div className="text-sm font-bold text-equator-charcoal/50 uppercase tracking-widest">Stores Executed</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-equator-navy/5 border border-equator-silver/50">
              <div className="font-display text-5xl md:text-6xl text-equator-blue mb-2">4</div>
              <div className="text-sm font-bold text-equator-charcoal/50 uppercase tracking-widest">Service Verticals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Grid */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={clsx(
                "px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300",
                activeTab === category
                  ? "bg-equator-navy text-white shadow-xl shadow-equator-navy/20 transform -translate-y-1"
                  : "bg-white text-equator-charcoal/50 hover:bg-equator-silver hover:text-equator-navy shadow-sm"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client) => (
              <motion.div
                key={client.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="aspect-square bg-white border border-equator-silver/50 rounded-[2rem] flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-2xl hover:shadow-equator-navy/10 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-equator-sky/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-equator-sky/20 transition-colors duration-500" />
                <div className="w-24 h-24 mb-4 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="font-display text-4xl text-equator-navy/40">${client.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <span className="font-bold text-equator-navy text-center text-sm md:text-base relative z-10 group-hover:text-equator-blue transition-colors duration-500">
                  {client.name}
                </span>
                <span className="text-xs font-medium text-equator-charcoal/40 mt-2 text-center uppercase tracking-wider relative z-10">
                  {client.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
