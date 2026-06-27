"use client";

import { useEffect } from "react";
import ProduxProjects from "./ProduxProjects";
import ProduxBand from "./ProduxBand";
import ProduxContribute from "./ProduxContribute";
import ProduxReviews from "./ProduxReviews";

export default function ProduxSections() {
  useEffect(() => {
    // scroll-reveal for the journal cards
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* B — Featured work (asymmetric editorial grid) */}
      <ProduxProjects />

      {/* C — Philosophy band (lime word sweep) */}
      <ProduxBand />

      {/* D — Where We Contribute (logo row + services list) */}
      <ProduxContribute />

      {/* E — Beyond clients / testimonials (center-focus slider) */}
      <ProduxReviews />

      {/* ===================== JOURNAL ===================== */}
      <section className="block journal" id="journal">
        <div className="wrap">
          <div className="sec-head reveal"><h2>News &amp; Insights</h2><a href="#" className="arrow-link">All entries<span className="circ"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span></a></div>
          <div className="jgrid">
            <article className="jcard reveal"><span className="cat">Retail</span><div className="img"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80" alt="Retail rollout" loading="lazy" /></div><h3>Retail Rollout Playbook</h3><p>Complete store execution from planning and civil work to fixtures, lighting, branding, and final handover.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Technical</span><div className="img"><img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80" alt="Technical facility services" loading="lazy" /></div><h3>Zero-Downtime Facilities</h3><p>Preventive maintenance, HVAC, electrical and breakdown response that keep spaces running without interruption.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Housekeeping</span><div className="img"><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80" alt="Housekeeping solutions" loading="lazy" /></div><h3>Standards at Scale</h3><p>Trained teams, structured cleaning schedules, and quality checks for retail, data centre, and hospitality.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Milestone</span><div className="img"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80" alt="1 million square feet executed" loading="lazy" /></div><h3>1 Million Sq. Ft. and Counting</h3><p>Executed across India&apos;s metro and tier-2 markets — single vendor, consistent standards, anywhere.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Data Centre</span><div className="img"><img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80" alt="Data centre operations" loading="lazy" /></div><h3>Mission-Critical Uptime</h3><p>Facility management built for high-availability data centre operations and strict compliance.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer id="contact">
        <div className="wrap">
          <div className="fgrid">
            <div className="fcol"><h5>Menu /</h5><nav className="fmenu display"><a href="#work">Services</a><a href="#about">About</a><a href="#journal">Projects</a><a href="#lab">Clients</a><a href="#contact">Contact</a></nav></div>
            <div className="fcol"><h5>Reach us /</h5><p>contact@equator.in</p><p>+91 12345 67890</p><p>PAN India · Gurugram HQ</p></div>
            <div className="fcol"><h5>Newsletter /</h5><p>Occasional updates on facility operations and project execution.</p><form className="news" onSubmit={(e)=>e.preventDefault()}><input type="email" placeholder="you@email.com" aria-label="Email" /><button type="submit">Join</button></form></div>
            <div className="fcol"><h5>Socials /</h5><a className="line-link" href="#">LinkedIn →</a><a className="line-link" href="#">Instagram →</a><a className="line-link" href="#">Twitter / X →</a></div>
          </div>
          <div className="fbottom"><div className="mark display">EQUATOR®</div><div className="legal"><div><a href="#">Privacy policy</a> · <a href="#">Support</a></div><div>© 2026 Equator Facility Services. All rights reserved.</div></div></div>
        </div>
      </footer>
    </>
  );
}
