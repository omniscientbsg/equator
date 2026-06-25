"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const CLIENTS = [
  { name: "Amazon", category: "Retail & Turnkey" },
  { name: "Being Human", category: "Retail & Turnkey" },
  { name: "Crossword", category: "Retail & Turnkey" },
  { name: "Flipkart", category: "Retail & Turnkey" },
  { name: "Indriya", category: "Retail & Turnkey" },
  { name: "Swiggy Instamart", category: "Retail & Turnkey" },
  { name: "AWS", category: "Housekeeping" },
  { name: "Bain & Company", category: "Housekeeping" },
  { name: "DLF", category: "Housekeeping" },
  { name: "Godrej", category: "Housekeeping" },
  { name: "HDFC Bank", category: "Housekeeping" },
  { name: "Lodha", category: "Technical" },
  { name: "JLL", category: "Technical" },
  { name: "BCG", category: "Technical" },
  { name: "CBRE", category: "Technical" },
  { name: "Lumina CloudInfra", category: "Data Centres" },
  { name: "Digital Edge DC", category: "Data Centres" },
  { name: "NSE", category: "Data Centres" },
  { name: "State Bank of India", category: "Data Centres" },
];

const CATEGORIES = ["All", "Retail & Turnkey", "Housekeeping", "Technical", "Data Centres"];

export default function ClientLogos() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredClients = CLIENTS.filter(
    (client) => activeTab === "All" || client.category === activeTab
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-display-sm md:text-display-md text-equator-navy mb-4">
            Trusted By India's Most Demanding Brands
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === category
                  ? "bg-equator-navy text-white shadow-md"
                  : "bg-equator-silver/50 text-equator-charcoal/70 hover:bg-equator-silver hover:text-equator-navy"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client) => (
              <motion.div
                key={client.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="aspect-[3/2] flex items-center justify-center bg-white border border-equator-silver rounded-xl p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                {/* Placeholder for real logo images */}
                <span className="font-bold text-equator-navy/50 text-center text-sm md:text-base px-2">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
