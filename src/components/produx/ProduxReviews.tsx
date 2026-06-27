"use client";

import { useLayoutEffect, useRef } from "react";

/** Beyond clients — pinned horizontal testimonial slider with center-focus scaling (produx.design). */
const AV = "?auto=format&fit=crop&w=200&q=80";
const REVIEWS = [
  { name: "Rohit Mehra", role: "Project Lead, Amazon", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" + AV, quote: "Equator rolled out our stores across multiple cities with zero slippage. A single point of accountability made all the difference." },
  { name: "Ananya Sharma", role: "Facilities Head, HDFC Bank", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" + AV, quote: "Their housekeeping and technical teams keep 500+ branches running to one consistent standard — reliable and always audit-ready." },
  { name: "Vikram Nair", role: "Operations Director, DLF", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" + AV, quote: "Preventive maintenance and breakdown response have been faultless. Uptime across our commercial assets speaks for itself." },
  { name: "Priya Iyer", role: "Procurement, Flipkart", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" + AV, quote: "From civil work to final handover, Equator executed our warehouse fit-outs ahead of schedule and to spec." },
  { name: "Arjun Rao", role: "Site Manager, Lumina CloudInfra", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" + AV, quote: "Mission-critical data centre operations handled with the discipline and compliance we need, every single shift." },
  { name: "Neha Kapoor", role: "Estate Manager, Godrej", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" + AV, quote: "One vendor, consistent standards across our entire portfolio. They simply deliver, location after location." },
];

export default function ProduxReviews() {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const sec = secRef.current!;
    const track = trackRef.current!;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".rcard"));
    const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const ks = cards.map(() => 0.5); // smoothed focus value per card

    const progress = () => {
      const total = sec.offsetHeight - innerHeight;
      const scrolled = clamp(-sec.getBoundingClientRect().top, 0, total);
      return total > 0 ? scrolled / total : 0;
    };

    const apply = (p: number) => {
      const dist = track.scrollWidth - innerWidth;
      track.style.transform = `translate3d(${-easeIO(p) * dist}px,0,0)`;
      const mid = innerWidth / 2;
      const hovered = hoverRef.current;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cc = r.left + r.width / 2;
        let target: number;
        if (hovered !== null) {
          target = hovered === i ? 1 : 0; // hover: highlight one, dull rest
        } else {
          // gentle centre focus, but cards stay clearly visible when not hovering
          const centerK = clamp(1 - Math.abs(cc - mid) / (innerWidth * 0.6));
          target = 0.5 + 0.5 * centerK;
        }
        ks[i] += (target - ks[i]) * 0.14; // ease toward target
        const k = ks[i];
        c.style.transform = `scale(${0.95 + 0.05 * k})`; // flat horizontal row, no vertical step
        c.style.opacity = String(0.3 + 0.7 * k);
        c.style.zIndex = String(hovered === i ? 5 : 1);
      });
    };

    let raf = requestAnimationFrame(function loop() {
      apply(progress());
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="reviews2" id="reviews" ref={secRef}>
      <div className="reviews2__stage">
        <div className="wrap reviews2__head">
          <h2 className="display">
            Beyond clients.
            <br />
            Trusted partners.
          </h2>
          <a href="#" className="talk">
            READ ALL REVIEWS
          </a>
        </div>

        <div className="rwave" aria-hidden>
          {Array.from({ length: 90 }).map((_, i) => (
            // deterministic integer pattern (no Math.sin → no SSR/CSR float drift → no hydration mismatch)
            <span key={i} style={{ height: `${10 + ((i * 7 + 3) % 13) * 2}px` }} />
          ))}
        </div>

        <div className="rtrack" ref={trackRef}>
          {REVIEWS.map((r, i) => (
            <article
              className="rcard"
              key={r.name}
              onMouseEnter={() => (hoverRef.current = i)}
              onMouseLeave={() => (hoverRef.current = null)}
            >
              <div className="rcard__who">
                <span className="rcard__ava">
                  <img src={r.img} alt={r.name} loading="lazy" />
                </span>
                <div>
                  <h4>{r.name}</h4>
                  <small>{r.role}</small>
                </div>
              </div>
              <p>{r.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
