"use client";

import { useEffect } from "react";

/**
 * Featured work — asymmetric editorial grid (produx.design), scrolled vertically.
 * Card sizes/aspects taken from live produx: lg 1.15, sm 0.87 (portrait), wide 1.66. Sharp corners.
 * Titles animate with a per-word slide-up + fade reveal as each card enters the viewport.
 */
const IMG = "/produx/www.produx.design/images/FeaturedProject/";
const PROJECTS = [
  { img: "Payy.webp", name: "Payy Network", desc: "Stablecoin payments that feel familiar, not foreign.", tags: ["Creative Direction", "Visual Identity", "Motion", "Web Design"], cls: "is-lg" },
  { img: "GatherAI.webp", name: "Gather AI", desc: "First telco run entirely on AI, powering hundreds of brands from one intelligent core.", tags: ["Creative Direction", "Visual Identity", "Website"], cls: "is-sm is-down" },
  { img: "JurniAI.webp", name: "Jurni AI", desc: "Jurni is an AI funnel engine that turns a prompt into a live, conversion-ready journey.", tags: ["Creative Direction", "Visual Identity", "Motion", "Website"], cls: "is-wide" },
  { img: "parkerAI.webp", name: "Parker AI", desc: "Parker is an AI creative strategist that thinks, researches, and structures work like a senior partner.", tags: ["Creative Direction", "Visual Identity", "Motion"], cls: "is-sm" },
  { img: "NolanaAI.webp", name: "Nolana AI", desc: "AI-native agentic OS for financial services operations.", tags: ["Creative Direction", "Visual Identity", "Motion", "Website"], cls: "is-lg is-down" },
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
          <span className="eyebrow">Featured Work</span>
          <span className="eyebrow num">{String(PROJECTS.length).padStart(2, "0")} selected projects</span>
        </header>

        <div className="pgrid">
          {PROJECTS.map((pr) => (
            <article className={`pcard ${pr.cls}`} key={pr.name}>
              <a href="#" className="pcard__media">
                <img src={IMG + pr.img} alt={pr.name} loading="lazy" />
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
