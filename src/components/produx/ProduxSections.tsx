"use client";

import { useEffect } from "react";
import ProduxProjects from "./ProduxProjects";

export default function ProduxSections() {
  useEffect(() => {
    // scroll-reveal
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

    // testimonial slider
    const track = document.getElementById("track");
    const cards = track ? track.children.length : 0;
    let idx = 0;
    const perView = () => (innerWidth <= 760 ? 1 : innerWidth <= 1024 ? 2 : 3);
    const maxIdx = () => Math.max(0, cards - perView());
    const go = () => {
      if (!track) return;
      idx = Math.min(idx, maxIdx());
      const step = (track.children[0] as HTMLElement).getBoundingClientRect().width + 24;
      (track as HTMLElement).style.transform = `translateX(${-idx * step}px)`;
    };
    const next = () => {
      idx = idx >= maxIdx() ? 0 : idx + 1;
      go();
    };
    const prev = () => {
      idx = idx <= 0 ? maxIdx() : idx - 1;
      go();
    };
    document.getElementById("next")?.addEventListener("click", next);
    document.getElementById("prev")?.addEventListener("click", prev);
    addEventListener("resize", go);

    return () => {
      io.disconnect();
      document.getElementById("next")?.removeEventListener("click", next);
      document.getElementById("prev")?.removeEventListener("click", prev);
      removeEventListener("resize", go);
    };
  }, []);

  return (
    <>
      {/* ===================== TRUSTED BY ===================== */}
      <section className="block trusted">
        <span className="eyebrow">Trusted by</span>
        <div className="trusted-row">
          <div className="marquee" id="trustMarquee">
            <span>Acquisition</span><span>Geviti</span><span>Google</span><span>Healwell</span>
            <span>Nolana</span><span>Virgin</span><span>Aqua</span><span>Gather</span>
            <span>RepAI</span><span>Fanmaker</span><span>Parker</span><span>Niamato</span>
            {/* Duplicated for seamless loop */}
            <span>Acquisition</span><span>Geviti</span><span>Google</span><span>Healwell</span>
            <span>Nolana</span><span>Virgin</span><span>Aqua</span><span>Gather</span>
            <span>RepAI</span><span>Fanmaker</span><span>Parker</span><span>Niamato</span>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS (pinned horizontal) ===================== */}
      <ProduxProjects />

      {/* ===================== LET'S TALK CTA ===================== */}
      <section className="block cta-block" id="lets-talk">
        <div className="wrap reveal">
          <span className="eyebrow">Have a project in mind?</span>
          <br/>
          <a href="#contact" className="cta-big display">LET'S TALK</a>
          <p>Tell us where you want the brand to go. We'll shape how it gets felt.</p>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="block services sec-pad" id="studio">
        <div className="wrap">
          <div className="sec-head reveal"><h2>What we do</h2><span className="eyebrow">Capabilities</span></div>
          <div className="svc-list">
            <div className="svc reveal"><span className="idx num">01</span><h3>Brand Strategy &amp; Identity</h3><span className="plus"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg></span></div>
            <div className="svc reveal"><span className="idx num">02</span><h3>Web Design &amp; Development</h3><span className="plus"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg></span></div>
            <div className="svc reveal"><span className="idx num">03</span><h3>Product UX / UI Design</h3><span className="plus"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg></span></div>
            <div className="svc reveal"><span className="idx num">04</span><h3>Motion Design &amp; Content</h3><span className="plus"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 5v14M5 12h14"/></svg></span></div>
          </div>
        </div>
      </section>

      {/* ===================== 14-DAY BAND ===================== */}
      <section className="block band">
        <div className="wrap"><h2 className="reveal display">In 14 days, we shape a complete brand identity that <em>moves with confidence.</em></h2></div>
        <div className="band-marquee"><b>Stand out and earn trust</b><b>Brand identity in 14 days</b><b>Launch faster &amp; save capital</b><b>Stand out and earn trust</b><b>Brand identity in 14 days</b><b>Launch faster &amp; save capital</b><b>Stand out and earn trust</b><b>Brand identity in 14 days</b><b>Launch faster &amp; save capital</b></div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="block reviews" id="lab">
        <div className="wrap">
          <div className="reviews__head reveal"><h2>What our partners say about <em>working with Produx.</em></h2><a href="#" className="arrow-link">Read all reviews<span className="circ"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span></a></div>
          <div className="slider reveal">
            <div className="track" id="track">
              <div className="card"><span className="stars">★★★★★</span><p>"A real artist who loves the craft. The brief was simple: don't do what every other company does — make it unmistakable."</p><div className="who"><span className="ava"><img src="/produx/www.produx.design/images/ClientHeadshots/JimmySlage.webp" alt="Jimmy Slage" loading="lazy" /></span><div><h4>Jimmy Slage</h4><small>Parker AI</small></div></div></div>
              <div className="card"><span className="stars">★★★★★</span><p>"Outstanding work on our identity — responsive, fully dedicated, and went above and beyond to land exactly the right result."</p><div className="who"><span className="ava"><img src="/produx/www.produx.design/images/ClientHeadshots/TyZamkow.webp" alt="Ty Zamkow" loading="lazy" /></span><div><h4>Ty Zamkow</h4><small>Nolana AI</small></div></div></div>
              <div className="card"><span className="stars">★★★★★</span><p>"Amazing so far. Produx plays a very active role across web, UI/UX and our wider marketing. The pace and taste are rare."</p><div className="who"><span className="ava"><img src="/produx/www.produx.design/images/ClientHeadshots/Nathan.webp" alt="Nathan Graville" loading="lazy" /></span><div><h4>Nathan Graville</h4><small>Geviti</small></div></div></div>
              <div className="card"><span className="stars">★★★★★</span><p>"Great experience start to finish — strong thinking, real taste, and attention to detail at every stage."</p><div className="who"><span className="ava"><img src="/produx/www.produx.design/images/ClientHeadshots/DelbertTy.webp" alt="Delbert Ty" loading="lazy" /></span><div><h4>Delbert Ty</h4><small>Gather AI</small></div></div></div>
            </div>
            <div className="slider__nav"><button id="prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6"/></svg></button><button id="next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6"/></svg></button></div>
          </div>
        </div>
      </section>

      {/* ===================== JOURNAL ===================== */}
      <section className="block journal" id="journal">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Journal &amp; press</h2><a href="#" className="arrow-link">All entries<span className="circ"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span></a></div>
          <div className="jgrid">
            <article className="jcard reveal"><span className="cat">Branding</span><div className="img"><img src="/produx/www.produx.design/images/JournalImages/1.webp" alt="Strategy Matters" loading="lazy" /></div><h3>Strategy Matters</h3><p>Why brand strategy comes first — and how to build one that holds.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Press</span><div className="img"><img src="/produx/www.produx.design/images/JournalImages/2.webp" alt="Alex Socoloff interview" loading="lazy" /></div><h3>Alex Socoloff</h3><p>A long conversation with our founder and creative director.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Branding</span><div className="img"><img src="/produx/www.produx.design/images/JournalImages/3.webp" alt="Creative Development" loading="lazy" /></div><h3>Creative Development</h3><p>Setting a new standard for interactive storytelling on the web.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Branding</span><div className="img"><img src="/produx/www.produx.design/images/JournalImages/4.webp" alt="Digital Flow" loading="lazy" /></div><h3>Digital Flow</h3><p>How motion is quietly defining the user experience of tomorrow.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
            <article className="jcard reveal"><span className="cat">Branding</span><div className="img"><img src="/produx/www.produx.design/images/JournalImages/5.webp" alt="Future Proof" loading="lazy" /></div><h3>Future Proof</h3><p>Staying relevant in a landscape that never stops shifting.</p><span className="more">Read more <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></article>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer id="contact">
        <div className="wrap">
          <div className="fgrid">
            <div className="fcol"><h5>Menu /</h5><nav className="fmenu display"><a href="#work">Work</a><a href="#studio">Studio</a><a href="#journal">Journal</a><a href="#lab">Lab</a><a href="#contact">Contact</a></nav></div>
            <div className="fcol"><h5>Headquarters /</h5><p>Barcelona, Spain</p><p>Wyoming, USA</p></div>
            <div className="fcol"><h5>Newsletter /</h5><p>Receive occasional insights on brand identity and taste.</p><form className="news" onSubmit={(e)=>e.preventDefault()}><input type="email" placeholder="you@email.com" aria-label="Email" /><button type="submit">Join</button></form></div>
            <div className="fcol"><h5>Socials /</h5><a className="line-link" href="#">Twitter / X →</a><a className="line-link" href="#">LinkedIn →</a><a className="line-link" href="#">YouTube →</a></div>
          </div>
          <div className="fbottom"><div className="mark display">PRØDUX®</div><div className="legal"><div><a href="#">Privacy policy</a> · <a href="#">Support</a></div><div>© 2026 PRØDUX STUDIOS LLC. All rights reserved.</div></div></div>
        </div>
      </footer>
    </>
  );
}
