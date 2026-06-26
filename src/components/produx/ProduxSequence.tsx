"use client";

import { useLayoutEffect } from "react";

/** PRØDUX wordmark — the 6 real produx logo letter paths. Filled via CSS (.logo-mark path). */
function ProduxMark({ className }: { className?: string }) {
  return (
    <svg
      className={`logo-mark ${className ?? ""}`}
      viewBox="0 0 1290 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PRODUX"
    >
      <path d="M24.0112 182.325V106.861L113.46 106.598C141.956 106.598 164.12 87.5996 164.12 55.4088C164.12 22.4264 138.526 8.44183 107.918 8.44183H0V182.325H24.0112ZM24.0112 91.5575V28.2313H106.335C125.597 28.2313 140.637 37.7302 140.637 59.8944C140.637 80.4754 125.069 91.5575 106.335 91.5575H24.0112Z" />
      <path d="M224.011 182.325V106.598H269.395L334.832 182.325H363.329L296.045 106.598H314.779C341.429 106.07 364.12 88.3912 364.12 55.6727C364.12 21.8987 338.262 8.44183 306.599 8.44183H200V182.325H224.011ZM224.011 91.5575V28.2313H306.335C325.597 28.2313 340.637 37.7302 340.637 59.8944C340.637 80.4754 325.069 91.5575 306.335 91.5575H224.011Z" />
      <path d="M609.547 9.98438L588.355 31.1758C607.5 47.3371 617.352 71.4855 612.588 100.047C603.862 152.36 550.778 190.619 491.937 190.619C472.517 190.619 455.017 186.412 440.609 178.922L418.927 200.604L408.943 190.62L428.358 171.204C407.095 155.104 395.944 130.193 400.799 101.088C409.265 50.3366 462.784 9.47559 522.68 9.47559C543.267 9.47563 561.762 14.3099 576.623 22.9395L599.563 0L609.547 9.98438ZM456.379 163.151C467.133 168.832 480.193 171.88 494.535 171.88C537.544 171.88 578.428 145.072 585.938 100.047C589.625 77.9406 583.88 60.0426 571.825 47.7061L456.379 163.151ZM520.523 28.7344C475.183 28.4741 434.79 58.665 427.626 101.608C423.814 124.465 430.799 142.804 444.552 155.01L560.657 38.9053C549.707 32.2927 535.944 28.7344 520.523 28.7344Z" />
      <path d="M651.774 182.325H723.543C782.912 182.325 818.533 143.274 818.533 91.2937C818.533 37.4664 785.287 8.9696 728.293 8.9696H651.774V182.325ZM678.423 26.3843H718.794C766.552 26.3843 792.938 46.1738 792.938 91.8214C792.938 137.733 764.178 164.91 715.628 164.91H678.423V26.3843Z" />
      <path d="M860.665 104.936C860.665 156.001 894.137 185.044 936.256 185.044C985.076 185.044 1014.42 160.469 1030.05 129.83V182.172H1056.52V8.23138H1030.05V97.2762C1030.05 112.277 1008.69 167.81 942.638 167.81C905.943 167.81 886.176 140.043 886.176 104.936V8.23138H860.665V104.936Z" />
      <path d="M1095.65 182.222C1093.61 182.222 1092.59 180.855 1093.95 178.803L1173.16 92.9914V91.9658L1128.97 12.3077C1127.95 10.2564 1128.97 8.88885 1131.01 8.88885H1155.82C1157.18 8.88885 1158.2 9.23074 1158.88 10.9401L1191.52 72.4786H1192.54L1246.93 10.5983C1247.61 9.57264 1248.63 8.88885 1249.99 8.88885H1277.53C1279.57 8.88885 1280.93 10.2564 1279.23 12.3077L1206.14 91.9658V93.3333L1254.07 178.803C1255.09 180.855 1254.07 182.222 1252.03 182.222H1227.22C1225.86 182.222 1224.84 181.88 1224.16 180.513L1188.12 112.137H1187.1L1126.59 180.513C1125.57 181.538 1124.55 182.222 1123.19 182.222H1095.65Z" />
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
    let cornerX = 0,
      cornerY = 0,
      puzzleBaseW = 0,
      puzzleBaseH = 0;
    const measure = () => {
      const w = stage.clientWidth || innerWidth,
        h = stage.clientHeight || innerHeight;
      const lw = logoMark.getBoundingClientRect().width || w * 0.86;
      const brandRect = navBrand.getBoundingClientRect();
      cornerX = brandRect.left - w / 2 + (lw * END_SCALE) / 2;
      cornerY = brandRect.top + brandRect.height / 2 - h * 0.35; // logo starts at top:35vh
      sizeTiles();
      puzzleBaseW = puzzle.clientWidth || Math.min(620, w * 0.694);
      puzzleBaseH = puzzle.clientHeight || puzzleBaseW / 1.784;
    };

    const apply = (p: number) => {
      rail.style.width = p * 100 + "%";

      const open = easeOut(seg(p, 0.0, 0.25)); // logo + track move
      const showIn = easeOut(seg(p, 0.7, 0.78)); // video takeover
      const grow = easeIO(seg(p, 0.78, 0.92));

      // logo travels to the nav brand and shrinks
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

      // showreel: fades in over the solved frame then grows full-bleed
      showLayer.style.opacity = String(showIn);
      showFrame.style.width = lerp(puzzleBaseW, innerWidth, grow) + "px";
      showFrame.style.height = lerp(puzzleBaseH, innerHeight, grow) + "px";
      showFrame.style.borderRadius = lerp(14, 0, grow) + "px";
      if (showIn > 0.02 && showVideo && showVideo.paused) showVideo.play().catch(() => {});
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
          {/* Anchor only — supplies the corner rect the logoFly parks into. Mark hidden so there's only ONE PRØDUX. */}
          <a href="#" className="brand" id="navBrand" style={{ display: "inline-block", width: 150, height: 24, overflow: "hidden", visibility: "hidden" }}>
            <ProduxMark className="w-full" />
          </a>
          <nav className="menu">
            <a href="#work">Work</a>
            <a href="#studio">Studio</a>
            <a href="#lab">Lab</a>
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
            <ProduxMark />
          </div>

          <div className="content-track" id="contentTrack">
            <div className="layer hero-layer" id="heroLayer">
              <div className="wrap" id="heroSub">
                <h1>
                  <span className="line">
                    <span>You feel the brand</span>
                  </span>
                  <span className="line">
                    <span>
                      before it speaks<sup className="reg">®</sup>
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
