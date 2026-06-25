"use client";

import { clsx } from "clsx";
import { ShieldCheck, Target, HardHat, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import React, { useRef } from "react";

export default function AboutPage() {
  const values = [
    { title: "Quality Assurance", desc: "ISO 9001 certified processes embedded in everything we build.", icon: <Target className="text-equator-blue" size={32} /> },
    { title: "Safety First", desc: "ISO 45001 commitment to every worker on every single site.", icon: <ShieldCheck className="text-equator-blue" size={32} /> },
    { title: "Reliable Execution", desc: "Structured frameworks that deliver on time, every time.", icon: <HardHat className="text-equator-blue" size={32} /> },
    { title: "True Partnership", desc: "We measure our success entirely by the success of our clients.", icon: <Users className="text-equator-blue" size={32} /> },
  ];

  const timelineData = [
    { year: "2010", title: "Company Founded", desc: "Equator Property Managers is born." },
    { year: "2012", title: "First Retail Client", desc: "Onboarding of our first national client." },
    { year: "2015", title: "100 Retail Stores", desc: "A major milestone in turnkey projects." },
    { year: "2017", title: "Technical Division", desc: "Launch of specialized technical services." },
    { year: "2019", title: "Housekeeping", desc: "Expanding into facility housekeeping." },
    { year: "2021", title: "1M Sq. Ft. Executed", desc: "Crossing the 1 million sq ft milestone." },
    { year: "2022", title: "ISO Certification", desc: "Achieved ISO 9001 and ISO 45001." },
    { year: "2023", title: "Data Centres", desc: "Pioneering FM for Data Centres." },
    { year: "Today", title: "500+ Stores", desc: "Managing 500+ stores PAN India." },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-0 bg-white overflow-hidden selection:bg-equator-blue selection:text-white">
      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-equator-sky/10 via-equator-blue/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-32">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-equator-silver text-equator-navy text-xs font-bold tracking-widest uppercase mb-8 border border-equator-navy/5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-equator-blue animate-pulse" />
            Our Story
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-equator-navy leading-[1.1] tracking-tight mb-8">
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-equator-navy to-equator-blue">Execution.</span><br />
            Driven by <span className="relative">Trust.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-equator-sky/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-equator-charcoal/60 max-w-3xl leading-relaxed font-light">
            Equator Property Managers Pvt Ltd has been delivering integrated facility and retail solutions to India's leading brands for over a decade.
          </p>
        </div>
      </section>

      {/* Our Story Bento */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Story Box */}
          <div className="md:col-span-8 bg-equator-silver/40 rounded-[2.5rem] p-10 md:p-16 border border-white shadow-xl shadow-equator-navy/5 relative overflow-hidden group hover:shadow-2xl hover:shadow-equator-navy/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/60 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-equator-sky/20 transition-colors duration-500" />
            <h2 className="font-display text-3xl md:text-4xl text-equator-navy mb-8 relative z-10">From Single Projects to National Scale</h2>
            <div className="space-y-6 text-lg text-equator-charcoal/70 leading-relaxed relative z-10 font-light">
              <p>
                Equator was founded with a singular belief: that brands deserve a facility partner who treats their space with the same care they do. Starting with retail store execution, we expanded into technical facility services and housekeeping — building the systems, teams, and processes that allow India's most demanding brands to focus on their core business.
              </p>
              <p>
                Today, with over 1 million sq. ft. of executed retail space and hundreds of facilities under maintenance, Equator operates as a trusted extension of our clients' teams.
              </p>
            </div>
          </div>
          
          {/* Stats Box */}
          <div className="md:col-span-4 bg-equator-navy text-white rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-equator-blue blur-[60px] rounded-full translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="text-equator-sky font-mono text-sm tracking-widest font-bold mb-8 uppercase">Since 2010</div>
              <div className="font-display text-8xl md:text-9xl text-white/90 leading-none mb-4 -ml-2">14</div>
              <div className="text-xl text-white/80 font-light">Years of absolute dedication to operational excellence.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-32 mb-32">
        <div className="absolute inset-0 bg-equator-charcoal -skew-y-2 origin-top-left z-0 shadow-2xl" />
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="relative">
              <div className="absolute -left-8 top-0 text-white/5 font-display text-9xl leading-none">M</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">Our Mission</div>
              <p className="font-display text-3xl md:text-4xl leading-tight text-white/90">
                "To deliver consistent, high-quality integrated facility solutions that enable our clients' spaces to perform at their best — every day."
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-8 top-0 text-white/5 font-display text-9xl leading-none">V</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">Our Vision</div>
              <p className="font-display text-3xl md:text-4xl leading-tight text-white/90">
                "To be India's most trusted property management partner, known for operational excellence and zero-compromise delivery."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container relative z-10 mx-auto px-6 max-w-7xl mb-32">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-equator-navy mb-6">The Pillars We Stand On</h2>
          <p className="text-xl text-equator-charcoal/60 font-light">Our core values dictate every decision we make, from the boardroom to the job site.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="group bg-white p-8 rounded-[2rem] border border-equator-silver shadow-lg shadow-equator-navy/5 hover:shadow-2xl hover:shadow-equator-navy/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-equator-silver/50 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-equator-sky/20 transition-colors duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-equator-silver/40 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                {v.icon}
              </div>
              <h3 className="font-display text-2xl text-equator-navy mb-4 relative z-10">{v.title}</h3>
              <p className="text-equator-charcoal/60 font-light leading-relaxed relative z-10">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Animated Timeline Section */}
      <section className="py-32 bg-equator-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md border border-white/20 shadow-xl">
                Our Journey
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl drop-shadow-lg mb-4">A Decade of Growth</h2>
            </div>
            {/* Scroll Navigation Buttons */}
            <div className="hidden md:flex gap-4">
              <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar relative z-20 scroll-smooth px-[5vw] lg:px-[10vw] py-4"
          >
            <div className="flex gap-0 min-w-max items-center relative h-[400px]">
              
              {/* Scroll Progress Line Base */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
              
              {/* Scroll Progress Line Animated */}
              <motion.div 
                className="absolute top-1/2 left-0 h-[4px] bg-equator-sky -translate-y-1/2 origin-left z-10 shadow-[0_0_15px_rgba(74,144,217,0.8)]" 
                style={{ scaleX: scrollXProgress, width: "100%" }}
              />
              {timelineData.map((item, index) => (
                <div key={index} className="w-[300px] md:w-[400px] shrink-0 snap-center relative h-[400px]">
                  
                  {/* Top Half */}
                  <div className="absolute top-0 left-0 w-full h-[200px] flex flex-col justify-end items-center pb-8">
                    {index % 2 === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="w-full px-6 text-center"
                      >
                        <div className="font-mono text-3xl font-bold text-equator-sky mb-2">
                          {item.year}
                        </div>
                        <h3 className="font-display text-2xl text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/60 font-light text-sm">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* The Node (Exactly in the middle) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-equator-navy border-4 border-equator-sky shadow-[0_0_20px_rgba(74,144,217,0.8)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  
                  {/* Bottom Half */}
                  <div className="absolute bottom-0 left-0 w-full h-[200px] flex flex-col justify-start items-center pt-8">
                    {index % 2 !== 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="w-full px-6 text-center"
                      >
                        <div className="font-mono text-3xl font-bold text-equator-sky mb-2">
                          {item.year}
                        </div>
                        <h3 className="font-display text-2xl text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/60 font-light text-sm">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
