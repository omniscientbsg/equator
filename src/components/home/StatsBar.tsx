"use client";

import DataScrub from "@/components/scroll/DataScrub";

export default function StatsBar() {
  const stats = [
    { value: 1, suffix: "M+", label: "sq. ft. Executed" },
    { value: 500, suffix: "+", label: "Retail Stores Built" },
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: "PAN", suffix: " India", label: "Operational Reach", isString: true },
  ];

  return (
    <section className="bg-equator-navy py-16 md:py-20 relative z-20 overflow-hidden shadow-2xl">
      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-equator-blue/20 via-transparent to-equator-blue/20 mix-blend-multiply" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-equator-sky/20 blur-[100px] rounded-full translate-y-1/2 opacity-50" />
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 group">
              <div className="font-display text-5xl md:text-6xl text-white font-bold mb-4 flex items-center justify-center drop-shadow-md group-hover:scale-110 transition-transform duration-500 whitespace-nowrap font-mono">
                {stat.isString ? (
                  <span>
                    {stat.value}
                    <span className="text-equator-sky">{stat.suffix}</span>
                  </span>
                ) : (
                  <>
                    <DataScrub to={stat.value as number} />
                    <span className="text-equator-sky ml-1">{stat.suffix}</span>
                  </>
                )}
              </div>
              <div className="text-sm md:text-base text-white/60 font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-500 max-w-[200px] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
