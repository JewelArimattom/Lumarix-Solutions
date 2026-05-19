"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BuildSection from "./components/BuildSection";
import { initLenis, destroyLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ClientPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── PRELOADER ── */
      const fill = document.querySelector(".preloader-fill");
      const preloader = document.querySelector(".preloader");
      if (fill && preloader) {
        gsap.to(fill, { width: "100%", duration: 1.8, ease: "power2.inOut", onComplete: () => {
          gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => { preloader.style.display = "none"; initAnimations(); } });
        }});
        gsap.to(".preloader-text", { opacity: 1, duration: 0.5 });
      } else { initAnimations(); }

      function initAnimations() {
        if (window.innerWidth > 768) {
          initLenis();
        }

        /* ── CURSOR PIXEL SCATTER ── */
        const dot = document.querySelector(".cursor-dot");
        if (dot && window.matchMedia("(pointer:fine)").matches) {
          let mx=0, my=0;
          window.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; dot.style.opacity="1"; });
          gsap.ticker.add(() => gsap.set(dot, { x: mx, y: my }));
          // Spawn pixel particles on move
          let lastSpawn = 0;
          window.addEventListener("mousemove", e => {
            const now = Date.now();
            if (now - lastSpawn < 50) return;
            lastSpawn = now;
            for (let i = 0; i < 3; i++) {
              const px = document.createElement("div");
              px.className = "cursor-pixel";
              px.style.left = e.clientX + "px";
              px.style.top = e.clientY + "px";
              document.body.appendChild(px);
              gsap.fromTo(px,
                { opacity: 0.6, scale: 1 },
                { x: (Math.random()-0.5)*40, y: (Math.random()-0.5)*40, opacity: 0, scale: 0, duration: 0.5 + Math.random()*0.3, ease: "power2.out",
                  onComplete: () => px.remove()
                }
              );
            }
          });
        }

        /* ── VR PARALLAX ON SCROLL ── */
        const vrOverlay = document.querySelector(".vr-overlay");
        const vrVignette = document.querySelector(".vr-vignette");
        let scrollTimeout;
        if (vrOverlay) {
          window.addEventListener("scroll", () => {
            vrOverlay.classList.add("active");
            vrVignette && vrVignette.classList.add("active");
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              vrOverlay.classList.remove("active");
              vrVignette && vrVignette.classList.remove("active");
            }, 150);
          }, { passive: true });
        }

        /* ── HERO CANVAS PARTICLES ── */
        const canvas = document.querySelector(".hero-canvas");
        if (canvas) {
          const ctx = canvas.getContext("2d");
          let w, h;
          const resize = () => { w = canvas.width = canvas.parentElement.offsetWidth; h = canvas.height = canvas.parentElement.offsetHeight; };
          resize(); window.addEventListener("resize", resize);
          const pts = Array.from({length:60},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+0.5,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4,o:Math.random()*0.5+0.1}));
          function drawParticles(){
            ctx.clearRect(0,0,w,h);
            pts.forEach(p=>{
              p.x+=p.dx; p.y+=p.dy;
              if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;
              ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
              ctx.fillStyle=`rgba(255,32,32,${p.o})`; ctx.fill();
            });
            for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){
              const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,dist=Math.sqrt(dx*dx+dy*dy);
              if(dist<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,32,32,${0.06*(1-dist/120)})`;ctx.stroke();}
            }}
            requestAnimationFrame(drawParticles);
          }
          drawParticles();
        }

        /* ── NAV SCROLL ── */
        const nav = document.querySelector(".nav");
        if (nav) {
          window.addEventListener("scroll", () => { nav.classList.toggle("scrolled", window.scrollY > 50); }, { passive: true });
        }

        /* ── SCROLL PROGRESS ── */
        const prog = document.querySelector(".scroll-progress");
        if (prog) {
          window.addEventListener("scroll", () => {
            const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            prog.style.transform = `scaleX(${p})`;
          }, { passive: true });
        }

        /* ── HERO ENTRANCE ── */
        const chars = document.querySelectorAll(".hero-name .char");
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(chars, { opacity: 1, y: 0, stagger: 0.04, duration: 0.8 })
          .to(".hero-line", { scaleX: 1, duration: 0.6 }, "-=0.3")
          .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(".hero-btns", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(".hero-stats", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

        /* ── TICKER ── */
        const ticker = document.querySelector(".ticker");
        if (ticker) {
          gsap.to(ticker, { xPercent: -50, duration: 20, ease: "none", repeat: -1 });
        }

        /* ── COUNTERS ── */
        document.querySelectorAll("[data-count]").forEach(el => {
          const target = +el.dataset.count;
          const obj = { v: 0 };
          ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => {
            gsap.to(obj, { v: target, duration: 2, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(obj.v); } });
          }});
        });

        /* ── SPLIT REVEAL ── */
        if (window.innerWidth > 768) {
          const splitTL = gsap.timeline({
            scrollTrigger: { trigger: ".split-section", start: "top top", end: "bottom bottom", scrub: 1 }
          });
          splitTL.to(".split-left", { xPercent: -100, ease: "none" }, 0)
                 .to(".split-right", { xPercent: 100, ease: "none" }, 0)
                 .to(".layer-reveal", { opacity: 1, ease: "none" }, 0);
        }

        /* ── CTA BG TRANSITION ── */
        gsap.to(".cta-bg", {
          opacity: 1,
          scrollTrigger: { trigger: ".cta-section", start: "top 70%", end: "top 30%", scrub: true }
        });
        gsap.fromTo(".cta-header > *, .cta-card, .cta-form",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.8,
            scrollTrigger: { trigger: ".cta-section", start: "top 60%", once: true }
          }
        );

        /* ── MAGNETIC BUTTONS ── */
        document.querySelectorAll(".btn").forEach(btn => {
          btn.addEventListener("mousemove", e => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, { x: (e.clientX-r.left-r.width/2)*0.2, y: (e.clientY-r.top-r.height/2)*0.2, duration: 0.3 });
          });
          btn.addEventListener("mouseleave", () => { gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }); });
        });
      }
    }, mainRef);
    return () => {
      destroyLenis();
      ctx.revert();
    };
  }, []);

  /* ── Split hero name into chars ── */
  const brandName = "LUMARIX";
  const originalChars = brandName.split("");
  const heroChars = originalChars.map((c, i) => (
    <span className="char" key={i} data-char={c} style={{ transform: "translateY(100px)" }}>{c}</span>
  ));

  /* ── Decode effect on hover ── */
  const glitchChars = "!@#$%^&*01";
  const handleHeroHover = useCallback(() => {
    const el = document.querySelector(".hero-name");
    if (!el || el.dataset.animating === "true") return;
    el.dataset.animating = "true";
    el.classList.add("decoding");
    const spans = el.querySelectorAll(".char");
    let iteration = 0;
    const interval = setInterval(() => {
      spans.forEach((s, i) => {
        if (i < iteration) { s.textContent = originalChars[i]; }
        else { s.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)]; }
      });
      if (iteration >= spans.length) { clearInterval(interval); el.classList.remove("decoding"); el.dataset.animating = "false"; }
      iteration += 1/3;
    }, 40);
  }, []);

  const tickerItems = ["AI Workflows", "Next.js Architectures", "Automated Systems", "Custom AI Solutions", "SEO Engineering", "GSAP Animations", "Premium Web Design", "High-Performance Software", "Business Automation", "UI/UX Engineering"];
  const tickerContent = tickerItems.map((t, i) => (
    <span key={i}>{t} <span className="sep">✦</span> </span>
  ));

  return (
    <div ref={mainRef}>
      {/* Preloader */}
      <div className="preloader">
        <div className="preloader-text">{heroChars}</div>
        <div className="preloader-bar"><div className="preloader-fill"></div></div>
      </div>

      <div className="noise"></div>
      <div className="scroll-progress"></div>
      <div className="cursor-dot"></div>
      <div className="vr-overlay">{[20,40,60,80].map(p=>(<div key={`h${p}`} className="vr-line vr-line--h" style={{top:`${p}%`}}></div>))}{[20,40,60,80].map(p=>(<div key={`v${p}`} className="vr-line vr-line--v" style={{left:`${p}%`}}></div>))}</div>
      <div className="vr-vignette"></div>

      {/* Nav */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="nav-brand"><span>L</span> LUMARIX</a>
          <button className="menu-toggle" onClick={e => {
            const links = e.currentTarget.nextElementSibling;
            links.classList.toggle("active");
          }}><span></span><span></span><span></span></button>
          <div className="nav-links">
            <a href="#process">Process</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="/blog">Blog</a>
            <a href="#contact" className="nav-cta">Let&apos;s Talk</a>
          </div>
        </div>
      </nav>

      {/* SECTION 1 — Hero */}
      <section className="hero" id="hero">
        <div className="hero-grid"></div>
        <div className="hero-particles">
          <div className="hero-orb hero-orb--1"></div>
          <div className="hero-orb hero-orb--2"></div>
          <div className="hero-orb hero-orb--3"></div>
        </div>
        <div className="hero-scan-line"></div>
        <canvas className="hero-canvas" style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none'}}></canvas>
        <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div className="hero-sub" style={{ transform: "translateY(20px)" }}>AI Automation Architect & Freelance Web Developer</div>
          <h1 className="hero-name" onMouseEnter={handleHeroHover}>{heroChars}</h1>
          <div className="hero-line"></div>
          <p className="hero-desc" style={{ transform: "translateY(20px)" }}>I build premium, scroll-stopping websites and custom AI workflows that turn visits into inquiries. Share your goal and timeline, and I will send a clear plan and quote within 24 hours.</p>
          <div className="hero-btns" style={{ transform: "translateY(20px)" }}>
            <a className="btn btn-primary" href="#contact">Start a Project</a>
            <a className="btn btn-ghost" href="#process">See My Process</a>
          </div>
          <div className="hero-stats" style={{ transform: "translateY(20px)" }}>
            <div>
              <div className="hero-stat-num"><span data-count="50">0</span>+</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div>
              <div className="hero-stat-num"><span data-count="14">0</span> days</div>
              <div className="hero-stat-label">Avg. Launch</div>
            </div>
            <div>
              <div className="hero-stat-num"><span data-count="100">0</span>%</div>
              <div className="hero-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="ticker-wrap">
          <div className="ticker">{tickerContent}{tickerContent}</div>
        </div>
      </section>

      {/* SPLIT REVEAL — "The Process Begins" */}
      <section className="split-section">
        <div className="split-pin">
          <div className="split-left">
            <div className="split-mock">
              <div className="split-mock-bar"><span></span><span></span><span></span></div>
              <div className="split-mock-body">
                <div className="split-mock-block"></div>
                <div className="split-mock-lines"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
          <div className="split-right">
            <div className="split-mock">
              <div className="split-mock-bar"><span></span><span></span><span></span></div>
              <div className="split-mock-body">
                <div className="split-mock-lines"><span></span><span></span></div>
                <div className="split-mock-cta"></div>
              </div>
            </div>
          </div>
          <div className="layer-reveal">
            <div className="layer-bg"></div>
            <h2>THE PROCESS<br /><span style={{ color: "var(--red)" }}>BEGINS</span></h2>
          </div>
        </div>
      </section>

      {/* BUILDING CONSTRUCTION — 7-stage scroll experience */}
      <BuildSection />

      {/* SECTION 7 — CTA / Contact */}
      <section className="cta-section" id="contact">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <div className="cta-header">
            <h2 className="cta-title">LET&apos;S BUILD<br />THE FUTURE</h2>
            <p className="cta-desc">Tell me your goal and timeline. I will reply within 24 hours with a clear plan, scope, and quote.</p>
          </div>
          <div className="cta-body">
            <div className="cta-info">
              <a href="tel:+919188126174" className="cta-card">
                <div className="cta-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="cta-card-text">
                  <span className="cta-card-label">Call / WhatsApp</span>
                  <span className="cta-card-value">+91 91881 26174</span>
                </div>
              </a>
              <a href="mailto:hello@lumarix.com" className="cta-card">
                <div className="cta-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div className="cta-card-text">
                  <span className="cta-card-label">Email</span>
                  <span className="cta-card-value">hello@lumarix.com</span>
                </div>
              </a>
              <div className="cta-card">
                <div className="cta-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="cta-card-text">
                  <span className="cta-card-label">Location</span>
                  <span className="cta-card-value">Pala, Kottayam, Kerala</span>
                </div>
              </div>
              <div className="cta-card">
                <div className="cta-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="cta-card-text">
                  <span className="cta-card-label">Response Time</span>
                  <span className="cta-card-value">Within 24 hours</span>
                </div>
              </div>
            </div>
            <form className="cta-form" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const btn = form.querySelector("button");
              const origText = btn.textContent;
              btn.textContent = "Sending...";
              btn.disabled = true;
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: form.name.value,
                    contact: form.contact.value,
                    projectType: form.type.value,
                    message: form.message.value,
                  }),
                });
                if (res.ok) {
                  btn.textContent = "✓ Message Sent!";
                  btn.style.background = "rgba(0,180,80,0.4)";
                  form.reset();
                  setTimeout(() => { btn.textContent = origText; btn.style.background = ""; btn.disabled = false; }, 3000);
                } else {
                  throw new Error("Failed");
                }
              } catch {
                btn.textContent = "✗ Error — Try Again";
                btn.style.background = "rgba(255,0,0,0.4)";
                setTimeout(() => { btn.textContent = origText; btn.style.background = ""; btn.disabled = false; }, 3000);
              }
            }}>
              <label className="color-white">Name<input type="text" name="name" placeholder="Your name" required /></label>
              <label>Email / Phone<input type="text" name="contact" placeholder="Email or WhatsApp" required /></label>
              <label className="full">Project Type
                <select name="type" required>
                  <option value="">Choose one</option>
                  <option>Business Website</option>
                  <option>Landing Page</option>
                  <option>E-Commerce</option>
                  <option>Portfolio</option>
                  <option>Custom Web App</option>
                </select>
              </label>
              <label className="full">Details<textarea name="message" rows="3" placeholder="What do you need, and when?" required></textarea></label>
              <button className="btn" type="submit">Send Project Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="blog-teaser" id="blog">
        <div className="container blog-teaser-inner">
          <div className="blog-teaser-label">From the Blog</div>
          <h2 className="blog-teaser-title">Insights on Building<br/><span>Premium Websites</span></h2>
          <p className="blog-teaser-desc">Deep dives into web development, design, performance, and turning websites into revenue machines.</p>
          <a className="btn btn-primary" href="/blog">Read the Blog</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>Lumarix Solutions © {new Date().getFullYear()}</p>
          <div className="footer-links">
            <a href="#process">Process</a>
            <a href="/blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
