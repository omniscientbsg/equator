"use client";

import { useEffect } from "react";

/**
 * Featured work — asymmetric editorial grid (produx.design), scrolled vertically.
 * Card sizes/aspects taken from live produx: lg 1.15, sm 0.87 (portrait), wide 1.66. Sharp corners.
 * Titles animate with a per-word slide-up + fade reveal as each card enters the viewport.
 */
const PROJECTS = [
  { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80", name: "Amazon Retail", desc: "End-to-end retail store execution across 200+ locations nationwide.", tags: ["Turnkey", "Fixtures", "Electrical", "Handover"], cls: "is-lg" },
  { img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", name: "DLF Cyber Hub", desc: "Complete facility management for premium commercial complex.", tags: ["Technical", "HVAC", "Electrical", "Housekeeping"], cls: "is-sm is-down" },
  { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", name: "Flipkart Warehouses", desc: "Large-scale warehouse housekeeping and maintenance operations.", tags: ["Housekeeping", "Deep Clean", "Floor Care", "Maintenance"], cls: "is-wide" },
  { img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80", name: "HDFC Bank", desc: "PAN India branch maintenance and housekeeping program across 500+ locations.", tags: ["Technical", "Housekeeping", "Project Mgmt"], cls: "is-sm" },
  { img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80", name: "Lumina CloudInfra", desc: "Mission-critical data centre facility management and operations.", tags: ["Data Centre", "HVAC", "Electrical", "Security"], cls: "is-lg is-down" },
];

export default function ProduxProjects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.25 }
    );
    document.querySelectorAll(".pcard").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="pwork" id="work">
      <div className="wrap">
        <header className="pwork__head">
          <span className="eyebrow">Featured Projects</span>
          <span className="eyebrow num">{String(PROJECTS.length).padStart(2, "0")} selected projects</span>
        </header>

        <div className="pgrid">
          {PROJECTS.map((pr) => (
            <article className={`pcard ${pr.cls}`} key={pr.name}>
              <a href="#" className="pcard__media">
                <img src={pr.img} alt={pr.name} loading="lazy" />
                <div className="pcard__tags">
                  {pr.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="pcard__view">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                  View
                </span>
              </a>
              <div className="pcard__cap">
                <h3>
                  {pr.name.split(" ").map((w, i) => (
                    <span className="w" key={i}>
                      <span style={{ transitionDelay: `${0.06 * i}s` }}>{w}</span>
                    </span>
                  ))}
                </h3>
                <p>{pr.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
