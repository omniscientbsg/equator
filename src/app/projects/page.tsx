"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Maximize } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Amazon Data Centre",
    client: "Amazon",
    category: "Data Centres",
    location: "Mumbai, MH",
    sqft: "150,000",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    description: "Comprehensive data centre cleaning protocol establishment and daily execution.",
  },
  {
    id: 2,
    title: "Indriya Flagship Store",
    client: "Aditya Birla",
    category: "Retail Turnkey",
    location: "Delhi, NCR",
    sqft: "12,000",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
    description: "End-to-end civil, interior, and fixture execution for luxury jewelry retail.",
  },
  {
    id: 3,
    title: "Swiggy Instamart Dark Stores",
    client: "Swiggy",
    category: "Retail Turnkey",
    location: "PAN India (50+ Sites)",
    sqft: "200,000+",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80",
    description: "Rapid deployment and setup of quick-commerce dark stores.",
  },
  {
    id: 4,
    title: "JLL Corporate Office",
    client: "JLL",
    category: "Technical",
    location: "Bangalore, KA",
    sqft: "45,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: "24/7 technical facility management and preventive HVAC maintenance.",
  },
  {
    id: 5,
    title: "Hiranandani Hospital",
    client: "Hiranandani",
    category: "Housekeeping",
    location: "Mumbai, MH",
    sqft: "250,000",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    description: "Hospital-grade housekeeping and bio-hazard waste management protocols.",
  },
  {
    id: 6,
    title: "Being Human Stores",
    client: "Being Human",
    category: "Retail Turnkey",
    location: "PAN India (100+ Sites)",
    sqft: "150,000+",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80",
    description: "Over a decade of partnership executing retail stores across India.",
  }
];

const CATEGORIES = ["All", "Retail Turnkey", "Housekeeping", "Technical", "Data Centres"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (project) => activeTab === "All" || project.category === activeTab
  );

  return (
    <div className="pt-32 pb-32 bg-white min-h-screen selection:bg-equator-blue selection:text-white relative overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-equator-blue/10 via-equator-sky/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-equator-silver text-equator-navy text-xs font-bold tracking-widest uppercase mb-8 border border-equator-navy/5 shadow-sm">
            Case Studies
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-equator-navy leading-[1.1] tracking-tight mb-8">
            Execution in <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Action.</span>
          </h1>
          <p className="text-xl md:text-2xl text-equator-charcoal/60 leading-relaxed font-light max-w-3xl">
            A selection of our most impactful retail builds, facility management contracts, and technical deployments across India.
          </p>
        </div>
      </section>

      {/* Filtered Grid */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={clsx(
                "px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300",
                activeTab === category
                  ? "bg-equator-navy text-white shadow-xl shadow-equator-navy/20 transform -translate-y-1"
                  : "bg-white text-equator-charcoal/50 border border-equator-silver hover:bg-equator-silver hover:text-equator-navy shadow-sm"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                className="group cursor-pointer bg-white rounded-[2.5rem] border border-equator-silver/50 overflow-hidden shadow-xl shadow-equator-navy/5 hover:shadow-2xl hover:shadow-equator-navy/15 hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-equator-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-white/90 backdrop-blur-md text-equator-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 relative flex-1 flex flex-col">
                  <div className="absolute top-0 right-8 -translate-y-1/2 w-16 h-16 bg-equator-blue text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-500 shadow-xl z-20">
                    <ArrowRight size={24} className="-rotate-45" />
                  </div>

                  <h3 className="font-display text-2xl text-equator-navy mb-4 group-hover:text-equator-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-equator-charcoal/60 font-light mb-8 line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-6 pt-6 border-t border-equator-silver/50">
                    <div className="flex items-center gap-2 text-sm text-equator-charcoal font-medium">
                      <div className="w-8 h-8 rounded-full bg-equator-silver/50 flex items-center justify-center text-equator-sky">
                        <MapPin size={16} />
                      </div>
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-equator-charcoal font-medium">
                      <div className="w-8 h-8 rounded-full bg-equator-silver/50 flex items-center justify-center text-equator-sky">
                        <Maximize size={16} />
                      </div>
                      {project.sqft} sq.ft
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-7xl mt-32 relative z-10">
        <div className="bg-equator-navy rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-equator-blue blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-8">
              Ready to execute your next project?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-equator-navy px-10 py-5 rounded-full font-bold hover:bg-equator-sky hover:text-white hover:scale-105 transition-all duration-300 shadow-xl">
              Discuss Your Requirements <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
