"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    num: "01", label: "DISCOVERY & PLANNING", title: "Discovery &\nPlanning",
    desc: "Before a single pixel is designed, I deep-dive into your brand, audience, competitors, and goals. Every decision from this point forward is intentional.",
    tags: ["Client Goals", "Sitemap", "User Research", "Color Palette", "Content Strategy"],
  },
  {
    num: "02", label: "VISUAL DESIGN", title: "Visual\nDesign",
    desc: "Crafting the visual identity — layout, typography, colors, and micro-interactions that make your brand unforgettable and impossible to ignore.",
    tags: ["UI/UX", "Figma", "Typography", "Color System"],
    palette: ["#FF2020", "#FF6B35", "#0A0A0A", "#FFFFFF", "#999999"],
  },
  {
    num: "03", label: "CODE & BUILD", title: "Code &\nBuild",
    desc: "Clean code, blazing speed, responsive layouts, SEO structure, scroll animations — pixel-perfect from IDE to browser. Every line of code matters.",
    tags: ["React / Next.js", "GSAP", "CMS", "Performance"],
    hasProgress: true,
  },
  {
    num: "04", label: "LIVE & LAUNCHED", title: "Live &\nLaunched",
    desc: "Your site goes live — fast, polished, and built to convert. Delivered on time, every time.",
    tags: [],
    stats: [
      { value: 14, suffix: " days", label: "Avg. Delivery" },
      { value: 98, suffix: "", label: "Performance" },
      { value: 100, suffix: "%", label: "Satisfaction" },
    ],
    hasCTA: true,
  },
];

const terminalLines = [
  { prefix: "$", text: "npx create-next-app@latest lumarix", cls: "white" },
  { prefix: "→", text: "Installing dependencies...", cls: "" },
  { prefix: "$", text: "npm install gsap framer-motion", cls: "white" },
  { prefix: "→", text: "Creating components...", cls: "" },
  { prefix: "→", text: "Building scroll animations...", cls: "" },
  { prefix: "→", text: "Running lighthouse audit...", cls: "" },
  { prefix: "✓", text: "Performance: 98/100", cls: "white", accent: true },
  { prefix: "✓", text: "SEO: 100/100", cls: "white", accent: true },
  { prefix: "✓", text: "Build complete in 4.2s 🚀", cls: "white", accent: true },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section || window.innerWidth <= 768) {
        // Mobile: simple reveal animations
        const mobilePhases = section?.querySelectorAll(".proc-phase");
        mobilePhases?.forEach((phase) => {
          const els = phase.querySelectorAll(".proc-reveal");
          gsap.set(els, { y: 40, opacity: 0 });
          ScrollTrigger.create({
            trigger: phase,
            start: "top 75%",
            once: true,
            onEnter: () => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" }),
          });
        });
        return;
      }

      // Pin the right column
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: ".proc-right",
        pinSpacing: false,
      });

      // Phase animations
      const mockups = section.querySelectorAll(".proc-mockup");
      const leftPanels = section.querySelectorAll(".proc-phase");

      // Hide all mockups except first
      gsap.set(mockups, { opacity: 0, scale: 0.9 });
      gsap.set(mockups[0], { opacity: 1, scale: 1 });

      // Animate left panels reveal
      leftPanels.forEach((panel) => {
        const els = panel.querySelectorAll(".proc-reveal");
        gsap.set(els, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: panel,
          start: "top 60%",
          once: true,
          onEnter: () => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" }),
        });
      });

      // Phase 1 — Wireframe draw-in
      ScrollTrigger.create({
        trigger: leftPanels[0],
        start: "top 70%",
        once: true,
        onEnter: () => {
          const wf = section.querySelector(".wf-wrap");
          if (!wf) return;
          gsap.timeline()
            .fromTo(wf.querySelector(".wf-nav"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" })
            .fromTo(wf.querySelector(".wf-hero"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.2")
            .fromTo(wf.querySelectorAll(".wf-col"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.4 }, "-=0.2")
            .fromTo(wf.querySelector(".wf-footer"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.1")
            .fromTo(wf.querySelectorAll(".wf-annotation"), { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 0.3 }, "-=0.2");
        },
      });

      // Mockup transitions on scroll
      for (let i = 1; i < 4; i++) {
        ScrollTrigger.create({
          trigger: leftPanels[i],
          start: "top 55%",
          onEnter: () => {
            gsap.to(mockups[i - 1], { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.in" });
            gsap.fromTo(mockups[i], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.15 });

            // Phase 2 — Design fill
            if (i === 1) {
              const dm = section.querySelector(".dm-wrap");
              if (dm) {
                gsap.timeline({ delay: 0.3 })
                  .fromTo(dm.querySelector(".dm-nav"), { opacity: 0 }, { opacity: 1, duration: 0.4 })
                  .fromTo(dm.querySelector(".dm-hero-gradient"), { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
                  .fromTo(dm.querySelector(".dm-headline"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
                  .fromTo(dm.querySelector(".dm-btn"), { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.1")
                  .fromTo(dm.querySelector(".dm-underline"), { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, "-=0.1")
                  .fromTo(dm.querySelectorAll(".dm-card"), { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, "-=0.2")
                  .fromTo(dm.querySelectorAll(".dm-swatch"), { scale: 0 }, { scale: 1, stagger: 0.08, duration: 0.3, ease: "back.out(2)" }, "-=0.2");
              }
            }

            // Phase 3 — Terminal lines
            if (i === 2) {
              const tm = section.querySelector(".tm-wrap");
              if (tm) {
                const lines = tm.querySelectorAll(".tm-line");
                const cursor = tm.querySelector(".tm-cursor");
                gsap.set(lines, { opacity: 0 });
                gsap.timeline({ delay: 0.3 })
                  .to(lines, { opacity: 1, stagger: 0.25, duration: 0.15, onUpdate: function() {
                    if (cursor) {
                      const visible = [...lines].filter(l => parseFloat(getComputedStyle(l).opacity) > 0.5);
                      if (visible.length) {
                        const last = visible[visible.length - 1];
                        cursor.style.top = last.offsetTop + "px";
                      }
                    }
                  }});
                // Progress bar
                const fill = tm.querySelector(".tm-progress-fill");
                if (fill) gsap.to(fill, { width: "100%", duration: 2.5, delay: 0.3, ease: "power1.inOut" });
              }
              // Left side progress counter
              const counter = section.querySelector(".proc-progress-num");
              if (counter) {
                const obj = { v: 0 };
                gsap.to(obj, { v: 100, duration: 2.5, delay: 0.3, ease: "power1.inOut", onUpdate: () => { counter.textContent = Math.round(obj.v) + "%"; } });
              }
            }

            // Phase 4 — Browser reveal
            if (i === 3) {
              const bm = section.querySelector(".bm-wrap");
              if (bm) {
                gsap.timeline({ delay: 0.2 })
                  .fromTo(bm, { y: -40 }, { y: 0, duration: 0.6, ease: "power3.out" })
                  .fromTo(bm.querySelector(".bm-url-text"), { width: 0 }, { width: "100%", duration: 0.6 }, "-=0.2")
                  .fromTo(bm.querySelector(".bm-site-content"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
                  .fromTo(bm.querySelector(".bm-burst"), { scale: 0, opacity: 1 }, { scale: 3, opacity: 0, duration: 0.6 }, "-=0.3");
              }
              // Stats counter
              section.querySelectorAll("[data-proc-count]").forEach((el) => {
                const target = +el.dataset.procCount;
                const obj = { v: 0 };
                gsap.to(obj, { v: target, duration: 1.5, delay: 0.5, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.v); } });
              });
            }
          },
          onLeaveBack: () => {
            gsap.to(mockups[i], { opacity: 0, scale: 0.9, duration: 0.3 });
            gsap.to(mockups[i - 1], { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="proc-section" id="process" ref={sectionRef}>
      {/* LEFT COLUMN */}
      <div className="proc-left">
        {phases.map((p, i) => (
          <div className="proc-phase" key={i}>
            <div className="proc-phase-inner">
              <div className="proc-num proc-reveal">{p.num}</div>
              <div className="proc-label proc-reveal">{p.label}</div>
              <h2 className="proc-title proc-reveal">{p.title.split("\n").map((line, li) => (
                <span key={li}>{line}{li === 0 && <br />}</span>
              ))}</h2>
              <p className="proc-desc proc-reveal">{p.desc}</p>
              {p.tags.length > 0 && (
                <div className="proc-tags proc-reveal">
                  {p.tags.map((t, ti) => <span className="proc-tag" key={ti}>{t}</span>)}
                </div>
              )}
              {p.palette && (
                <div className="proc-palette proc-reveal">
                  {p.palette.map((c, ci) => (
                    <div key={ci} className="proc-palette-dot" style={{ background: c, border: c === "#FFFFFF" ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}
              {p.hasProgress && (
                <div className="proc-progress-counter proc-reveal">
                  <span className="proc-progress-num">0%</span>
                  <span className="proc-progress-label">Build Progress</span>
                </div>
              )}
              {p.stats && (
                <div className="proc-stats proc-reveal">
                  {p.stats.map((s, si) => (
                    <div key={si}>
                      <div className="proc-stat-val"><span data-proc-count={s.value}>0</span>{s.suffix}</div>
                      <div className="proc-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {p.hasCTA && (
                <div className="proc-reveal" style={{ marginTop: 24 }}>
                  <a className="btn btn-primary" href="#contact">Start Your Project →</a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN — PINNED */}
      <div className="proc-right">
        <div className="proc-mockup-container">
          {/* Mockup 1 — Wireframe */}
          <div className="proc-mockup proc-mockup-1">
            <div className="wf-wrap">
              <div className="wf-nav" style={{ transformOrigin: "left" }}></div>
              <div className="wf-hero">
                <span>HERO SECTION</span>
                <div className="wf-hero-dots"></div>
              </div>
              <div className="wf-cols">
                <div className="wf-col"></div>
                <div className="wf-col"></div>
                <div className="wf-col"></div>
              </div>
              <div className="wf-footer"></div>
              <div className="wf-annotation" style={{ top: "2%", right: "-14%" }}>NAV</div>
              <div className="wf-annotation" style={{ top: "22%", right: "-16%" }}>HERO</div>
              <div className="wf-annotation" style={{ top: "62%", right: "-24%" }}>FEATURES</div>
            </div>
          </div>

          {/* Mockup 2 — Design */}
          <div className="proc-mockup proc-mockup-2">
            <div className="dm-wrap">
              <div className="dm-nav">
                <span className="dm-logo">LUMARIX</span>
                <div className="dm-nav-links"><span></span><span></span><span></span></div>
              </div>
              <div className="dm-hero">
                <div className="dm-hero-gradient"></div>
                <div className="dm-headline">Premium<br/>Websites</div>
                <div className="dm-underline" style={{ transformOrigin: "left" }}></div>
                <div className="dm-btn">Get Started</div>
              </div>
              <div className="dm-cards">
                <div className="dm-card"><div className="dm-card-icon"></div><div className="dm-card-lines"><span></span><span></span></div></div>
                <div className="dm-card"><div className="dm-card-icon"></div><div className="dm-card-lines"><span></span><span></span></div></div>
                <div className="dm-card"><div className="dm-card-icon"></div><div className="dm-card-lines"><span></span><span></span></div></div>
              </div>
              <div className="dm-swatches">
                {["#FF2020","#FF6B35","#0A0A0A","#FFF","#999"].map((c,i) => (
                  <div key={i} className="dm-swatch" style={{ background: c, border: c==="#FFF" ? "1px solid rgba(255,255,255,0.2)" : "none" }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Mockup 3 — Terminal */}
          <div className="proc-mockup proc-mockup-3">
            <div className="tm-wrap">
              <div className="tm-bar"><span className="tm-dot tm-dot-r"></span><span className="tm-dot tm-dot-y"></span><span className="tm-dot tm-dot-g"></span></div>
              <div className="tm-body">
                {terminalLines.map((l, i) => (
                  <div className="tm-line" key={i}>
                    <span className={l.accent ? "tm-accent" : "tm-dim"}>{l.prefix}</span>{" "}
                    <span className={l.cls}>{l.text}</span>
                  </div>
                ))}
                <div className="tm-cursor">_</div>
              </div>
              <div className="tm-progress"><div className="tm-progress-fill"></div></div>
            </div>
          </div>

          {/* Mockup 4 — Browser */}
          <div className="proc-mockup proc-mockup-4">
            <div className="bm-wrap">
              <div className="bm-chrome">
                <div className="bm-dots"><span></span><span></span><span></span></div>
                <div className="bm-url"><div className="bm-url-text">lumarixsolutions.com</div></div>
              </div>
              <div className="bm-site-content">
                <div className="bm-site-nav"><span className="bm-site-logo">L</span><div className="bm-site-cta">Contact</div></div>
                <div className="bm-site-hero"><div className="bm-site-h1">Build Something Great</div><div className="bm-site-accent"></div></div>
                <div className="bm-site-cards"><i></i><i></i><i></i></div>
              </div>
              <div className="bm-burst"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
