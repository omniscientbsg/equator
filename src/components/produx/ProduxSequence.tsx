"use client";

import { useLayoutEffect } from "react";

/**
 * EQUATOR wordmark — 7 geometric letter paths.
 * E, A, T are newly constructed; Q (Ø-style), U, R reuse the exact Produx letter paths
 * translated to new x-positions for consistent weight/feel.
 * Filled via CSS (.logo-mark path).
 */
function EquatorMark({ className }: { className?: string }) {
  return (
    <svg
      className={`logo-mark ${className ?? ""}`}
      viewBox="0 0 1450 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EQUATOR"
    >
      {/* E */}
      <path d="M0 8.44H120V28.23H24V86.39H108V106.18H24V162.54H120V182.33H0V8.44Z" />
      {/* Q (standard geometric, tailored for Equator) */}
      <path d="M 263,10 A 106,90 0 1,1 263,190 A 106,90 0 1,1 263,10 Z M 263,29 A 87,71 0 1,0 263,171 A 87,71 0 1,0 263,29 Z M 305,145 L 360,195 L 375,180 L 320,130 Z" />
      {/* U (from Produx, translated x-464) */}
      <path d="M396.67 104.94C396.67 156 430.14 185.04 472.26 185.04C521.08 185.04 550.42 160.47 566.05 129.83V182.17H592.52V8.23H566.05V97.28C566.05 112.28 544.69 167.81 478.64 167.81C441.94 167.81 422.18 140.04 422.18 104.94V8.23H396.67V104.94Z" />
      {/* A */}
      <path d="M632 182.33L714.5 8.44H738.5L821 182.33H795.5L773 132.5H679L656.5 182.33H632ZM688 112.71H764L726.5 32L688 112.71Z" />
      {/* T */}
      <path d="M852 8.44H1016V28.23H946V182.33H922V28.23H852V8.44Z" />
      {/* O (Ø-style, from Produx, translated x+637) */}
      <path d="M1246.55 9.98L1225.36 31.18C1244.5 47.34 1254.35 71.49 1249.59 100.05C1240.86 152.36 1187.78 190.62 1128.94 190.62C1109.52 190.62 1092.02 186.41 1077.61 178.92L1055.93 200.6L1045.94 190.62L1065.36 171.2C1044.1 155.1 1032.94 130.19 1037.8 101.09C1046.27 50.34 1099.78 9.48 1159.68 9.48C1180.27 9.48 1198.76 14.31 1213.62 22.94L1236.56 0L1246.55 9.98ZM1093.38 163.15C1104.13 168.83 1117.19 171.88 1131.54 171.88C1174.54 171.88 1215.43 145.07 1222.94 100.05C1226.63 77.94 1220.88 60.04 1208.83 47.71L1093.38 163.15ZM1157.52 28.73C1112.18 28.47 1071.79 58.67 1064.63 101.61C1060.81 124.47 1067.8 142.8 1081.55 155.01L1197.66 38.91C1186.71 32.29 1172.94 28.73 1157.52 28.73Z" />
      {/* R (from Produx, translated x+1076) */}
      <path d="M1300.01 182.33V106.6H1345.4L1410.83 182.33H1439.33L1372.05 106.6H1390.78C1417.43 106.07 1440.12 88.39 1440.12 55.67C1440.12 21.9 1414.26 8.44 1382.6 8.44H1276V182.33H1300.01ZM1300.01 91.56V28.23H1382.34C1401.6 28.23 1416.64 37.73 1416.64 59.89C1416.64 80.48 1401.07 91.56 1382.34 91.56H1300.01Z" />
    </svg>
  );
}

export default function ProduxSequence() {
  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const $ = (id: string) => document.getElementById(id);
    const scene = $("scene")!;
    const stage = $("stage")!;
    const header = $("header")!;
    const logoFly = $("logoFly")!;
    const logoMark = logoFly.querySelector(".logo-mark") as HTMLElement;
    const heroLayer = $("heroLayer")!;
    const heroSub = $("heroSub")!;
    const sceneCue = $("sceneCue");
    const rail = $("rail")!;
    const showLayer = $("showLayer")!;
    const showFrame = $("showFrame")!;
    const showVideo = $("showVideo") as HTMLVideoElement;
    const navBrand = $("navBrand")!;
    const contentTrack = $("contentTrack")!;
    const mediaWrap = $("mediaWrap")!;
    const puzzle = $("puzzle")!;
    const pgrid = $("puzzleGrid")!;

    // ----- build puzzle tiles -----
    puzzle.innerHTML = ""; // guard against StrictMode double-invoke
    const isNarrow = innerWidth <= 760;
    const COLS = isNarrow ? 4 : 7,
      ROWS = 4; // 28 large pieces
    pgrid.style.backgroundSize = 100 / COLS + "% " + 100 / ROWS + "%";
    const tiles: HTMLElement[] = [];
    const order = [...Array(COLS * ROWS).keys()];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        const t = document.createElement("div");
        t.className = "tile";
        t.style.left = (c * 100) / COLS + "%";
        t.style.top = (r * 100) / ROWS + "%";
        t.style.width = 100 / COLS + "%";
        t.style.height = 100 / ROWS + "%";
        // straight slide (no rotation), deep z so back pieces start invisible/blurred
        const ang = Math.random() * Math.PI * 2;
        const dist = 1.2 + Math.random() * 1.5;
        t.dataset.sx = String(Math.cos(ang) * innerWidth * 0.25 * dist);
        t.dataset.sy = String(Math.sin(ang) * innerHeight * 0.15 * dist);
        t.dataset.sz = String(-(1000 + Math.random() * 5000));
        t.dataset.ord = String(order.indexOf(i) / (order.length - 1));
        t.dataset.col = String(c);
        t.dataset.row = String(r);
        puzzle.appendChild(t);
        tiles.push(t);
      }
    }
    const sizeTiles = () => {
      const w = puzzle.clientWidth,
        h = puzzle.clientHeight,
        tw = w / COLS,
        th = h / ROWS;
      tiles.forEach((t) => {
        t.style.backgroundSize = w + "px " + h + "px";
        t.style.backgroundPosition = -Number(t.dataset.col) * tw + "px " + -Number(t.dataset.row) * th + "px";
      });
    };

    const END_SCALE = 0.11;
    let lwNat = 0, // logo mark natural width (measured at scale 1)
      puzzleBaseW = 0,
      puzzleBaseH = 0;
    const measure = () => {
      const w = stage.clientWidth || innerWidth;
      lwNat = logoMark.getBoundingClientRect().width || w * 0.86;
      sizeTiles();
      puzzleBaseW = puzzle.clientWidth || Math.min(620, w * 0.694);
      puzzleBaseH = puzzle.clientHeight || puzzleBaseW / 1.784;
    };

    const apply = (p: number) => {
      rail.style.width = p * 100 + "%";

      const open = easeOut(seg(p, 0.0, 0.25)); // logo + track move
      const showIn = easeOut(seg(p, 0.64, 0.72)); // video fades in over solved frame
      const grow = easeIO(seg(p, 0.72, 0.82)); // grows to full-bleed, then plateaus 0.82→1.0

      // logo travels to the nav brand and shrinks. Target computed live from the
      // (unscaled) navBrand rect every frame so it never goes stale on HMR/resize/font-load.
      const w = stage.clientWidth || innerWidth,
        h = stage.clientHeight || innerHeight;
      const br = navBrand.getBoundingClientRect();
      const cornerX = br.left - w / 2 + (lwNat * END_SCALE) / 2;
      const cornerY = br.top + br.height / 2 - h * 0.35; // logo starts at top:35vh
      const s = lerp(1.0, END_SCALE, open);
      const dx = lerp(0, cornerX, open),
        dy = lerp(0, cornerY, open);
      logoFly.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px) scale(${s})`;
      const headerOn = easeOut(seg(p, 0.15, 0.25));
      // logoFly IS the brand: shrinks, parks at corner, persists until the video covers it.
      logoFly.style.opacity = String(1 - showIn);
      header.style.opacity = String(headerOn);
      header.style.pointerEvents = headerOn > 0.5 ? "auto" : "none";
      if (sceneCue) sceneCue.style.opacity = String(1 - seg(p, 0, 0.03));

      // hero text fades away from the top while the puzzle solves
      const textFadeOut = easeOut(seg(p, 0.25, 0.55));
      heroSub.style.opacity = String(1 - textFadeOut);
      heroLayer.style.opacity = String(1 - textFadeOut);

      // whole track (text + media below) drifts up as one — media inherently follows the text
      const trackDrift = easeOut(seg(p, 0.0, 0.65));
      contentTrack.style.transform = `translateY(${-trackDrift * innerHeight * 0.65}px)`;

      // text has fully faded by ~0.55, so lift the media frame to center it in the viewport
      // (the tall frame otherwise overflows the bottom). Release the lift before the video
      // goes full-bleed so the full-bleed showreel stays centered.
      const solveLift = easeOut(seg(p, 0.4, 0.65));
      const unlift = easeIO(seg(p, 0.72, 0.82));
      mediaWrap.style.transform = `translateY(${-solveLift * (1 - unlift) * innerHeight * 0.28}px)`;

      // puzzle solve (0.15 → 0.65): pieces come forward from deep z, deep = blurred/invisible
      puzzle.style.opacity = String(1 - showIn);
      const build = seg(p, 0.15, 0.65),
        STAG = 0.8;
      tiles.forEach((t) => {
        const local = clamp(build * (1 + STAG) - Number(t.dataset.ord) * STAG);
        const tt = easeOut(local),
          inv = 1 - tt;
        const sx = Number(t.dataset.sx) * inv;
        const sy = Number(t.dataset.sy) * inv;
        const sz = Number(t.dataset.sz) * inv;
        const sc = lerp(0.8, 1, tt);
        t.style.transform = `translate3d(${sx}px,${sy}px,${sz}px) scale(${sc})`;
        const depth = Math.min(1, -sz / 1200);
        t.style.filter = `blur(${inv * (2 + depth * 20)}px)`;
        t.style.opacity = String(clamp(1 + sz / 3500));
      });

      // showreel: fades in over the solved frame then grows full-bleed. As it grows, slide the
      // show-layer so the frame's center reaches the viewport center (it otherwise stays wherever
      // the drifted media-wrap sat, leaving the full-bleed video off-center / cut at the bottom).
      showLayer.style.opacity = String(showIn);
      const frameH = lerp(puzzleBaseH, innerHeight, grow);
      showFrame.style.maxWidth = "none"; // CSS caps at 1200px; allow true full-bleed width
      showFrame.style.width = lerp(puzzleBaseW, innerWidth, grow) + "px";
      showFrame.style.height = frameH + "px";
      showFrame.style.borderRadius = lerp(14, 0, grow) + "px";
      // The frame is top-aligned inside show-layer (grid row grows to the frame height), so its
      // center is mw.top + frameH/2 — slide show-layer to bring that to the viewport center.
      const mw = mediaWrap.getBoundingClientRect();
      showLayer.style.transform = `translateY(${(innerHeight / 2 - frameH / 2 - mw.top) * grow}px)`;

      // Let the showreel autoplay (looped) while it's pinned full-bleed — smooth real-time
      // playback, not scrubbed (scrubbing stutters). The wide full-bleed plateau (grow done at
      // ~0.82 → scene releases at 1.0) keeps it on screen for a long scroll span.
      if (showVideo && showIn > 0.02 && showVideo.paused) showVideo.play().catch(() => {});
    };

    const progress = () => {
      const total = scene.offsetHeight - innerHeight;
      const scrolled = clamp(-scene.getBoundingClientRect().top, 0, total);
      return total > 0 ? scrolled / total : 0;
    };

    const onResize = () => measure();

    if (reduce) {
      document.documentElement.classList.add("reduced");
      header.style.opacity = "1";
      header.style.pointerEvents = "auto";
      sizeTiles();
      return;
    }

    measure();
    apply(0);

    // Drive the scene every frame off the live scroll position. This is source-agnostic:
    // it works whether scroll is native or driven by Lenis (which doesn't fire reliable
    // native 'scroll' events), so the logo actually shrinks/morphs as you scroll.
    let raf = requestAnimationFrame(function loop() {
      apply(progress());
      raf = requestAnimationFrame(loop);
    });
    addEventListener("resize", onResize);
    // re-measure once layout/fonts have settled (logo width, puzzle box, nav brand position)
    const settle = setTimeout(measure, 300);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      clearTimeout(settle);
    };
  }, []);

  return (
    <>
      <div className="rail" id="rail" />

      {/* Transparent header — the menu floats; the shrunk logo serves as the brand */}
      <header id="header">
        <div className="wrap nav">
          {/* Anchor only — supplies the corner rect the logoFly parks into. Mark hidden so there's only ONE EQUATOR. */}
          <a href="#" className="brand" id="navBrand" style={{ display: "inline-block", width: 150, height: 24, overflow: "hidden", visibility: "hidden" }}>
            <EquatorMark className="w-full" />
          </a>
          <nav className="menu">
            <a href="#work">Services</a>
            <a href="#studio">About</a>
            <a href="#lab">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="burger" id="burger">
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* ===================== HERO SCROLL SCENE ===================== */}
      <div className="scene" id="scene">
        <div className="stage" id="stage">
          <div className="stage__bg" />

          <div className="logo-fly" id="logoFly">
            <EquatorMark />
          </div>

          <div className="content-track" id="contentTrack">
            <div className="layer hero-layer" id="heroLayer">
              <div className="wrap" id="heroSub">
                <h1>
                <span className="line">
                  <span>Every Space. Every System.</span>
                </span>
                <span className="line">
                  <span>
                    Every Day.<sup className="reg">®</sup>
                  </span>
                </span>
              </h1>
              </div>
            </div>

            {/* media sits below the text inside the same track */}
            <div className="layer media-wrap" id="mediaWrap">
              <div className="puzzle-frame" id="puzzleWrap">
                <div className="puzzle-grid" id="puzzleGrid" />
                <div id="puzzle" style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }} />
              </div>

              <div className="show-layer" id="showLayer">
                <div className="show-frame" id="showFrame">
                  <video
                    id="showVideo"
                    src="/produx/www.produx.design/videos/video_1782463205925.mp4"
                    playsInline
                    muted
                    loop
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="scene-cue" id="sceneCue">
            <span>[ Scroll down ]</span>
            <span className="bar" />
          </div>
        </div>
      </div>
    </>
  );
}
