"use client";

import { useLayoutEffect, useRef } from "react";

/** Philosophy band — a lime "wipe" sweeps the heading word-by-word as you scroll (produx.design). */
const HEADING =
  "Where every store, system and surface is executed and maintained by one accountable team.";

export default function ProduxBand() {
  const secRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const head = headRef.current!;
    const words = Array.from(head.querySelectorAll<HTMLElement>(".bw"));
    const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

    // progress keyed to the heading itself: 0 when it enters from the bottom, 1 once it has
    // risen to ~18% from the top — so the lime wipe is fully done by the time the text sits up top.
    const progress = () => {
      const top = head.getBoundingClientRect().top;
      const start = innerHeight; // heading entering at viewport bottom
      const end = innerHeight * 0.18; // heading near the top → animation complete
      return clamp((start - top) / (start - end));
    };

    const apply = (p: number) => {
      const head = p * (words.length + 4) - 2; // wave position across the words
      words.forEach((w, i) => {
        const d = head - i; // <0 not reached, 0..1 lighting up, >1 settled
        let color: string;
        if (d <= 0) color = "var(--ink-faint)";
        else if (d < 1) color = "var(--lime)"; // the moving lime edge
        else color = "var(--ink)";
        w.style.color = color;
      });
    };

    let raf = requestAnimationFrame(function loop() {
      apply(progress());
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="band2" id="about" ref={secRef}>
      <div className="wrap">
        <h2 className="band2__head" ref={headRef}>
          {HEADING.split(" ").map((w, i) => (
            <span className="bw" key={i}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div className="band2__foot">
          <p>
            Deployable across India&apos;s metro and tier-2 markets. Single vendor, consistent
            standards, and full ownership of the work — anywhere.
          </p>
          <a href="#contact" className="talk">
            GET A QUOTE
          </a>
        </div>
      </div>
    </section>
  );
}
