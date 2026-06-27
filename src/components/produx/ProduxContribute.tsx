"use client";

import { useState } from "react";

/** Where We Contribute — client-logo card row + numbered services list with hover-image preview. */
const LOGOS = ["Amazon", "Flipkart", "HDFC Bank", "DLF", "Godrej", "Swiggy", "JLL", "CBRE", "NSE", "Lodha"];

const SERVICES = [
  { n: "01", t: "Retail Turnkey Projects", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80" },
  { n: "02", t: "Technical Facility Services", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80" },
  { n: "03", t: "Housekeeping Solutions", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80" },
  { n: "04", t: "Data Centre Operations", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80" },
];

export default function ProduxContribute() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="contrib" id="lab">
      {/* horizontal logo-card row */}
      <div className="contrib__logos">
        <div className="contrib__track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div className="lcard" key={i}>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        <h2 className="contrib__head display">
          What
          <br />
          We Deliver
        </h2>

        <ul className="svcs" onMouseLeave={() => setHover(null)}>
          {SERVICES.map((s) => (
            <li
              key={s.n}
              className="svc-row"
              onMouseEnter={() => setHover(s.img)}
            >
              <h3>{s.t}</h3>
              <span className="svc-n num">{s.n}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* floating hover preview */}
      <div className={`svc-preview ${hover ? "show" : ""}`} aria-hidden>
        {hover && <img src={hover} alt="" />}
      </div>
    </section>
  );
}
