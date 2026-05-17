"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: "discovery",
    num: "01",
    kicker: "Discovery & Architecture",
    title: "Discovery &\nArchitecture",
    quote: "The blueprint nobody sees but everyone feels.",
    chunks: [
      {
        eyebrow: "Phase 01",
        heading: "Most freelancers jump straight into design. I do not.",
        body: [
          "Before I write a single line of code, I map the business behind the website.",
          "This is where we define what the site must do, who it is speaking to, and what a successful launch actually means.",
        ],
      },
      {
        heading: "The first thing I build is not a design. It is a map.",
        list: ["Your business goals", "Your target customer", "Your competitors", "Your content and offers", "Your timeline and budget"],
        body: ["This conversation saves weeks of revisions later because the project starts with decisions, not guesses."],
      },
      {
        heading: "Then the hidden architecture takes shape.",
        body: [
          "Sitemap: every page, link, and user journey mapped out.",
          "Content structure: what goes where, what size it needs, and what should get priority.",
          "Technical decisions: CMS, hosting, analytics, performance targets, and the stack.",
        ],
      },
      {
        heading: "The blueprint gets approved before the build begins.",
        meta: ["Time spent: Day 1-2", "Tools: Notion, FigJam, calls", "Deliverable: Project brief", "Why it matters: one clear hour here saves five messy hours later"],
      },
    ],
  },
  {
    id: "wireframe",
    num: "02",
    kicker: "Wireframing",
    title: "Wireframing",
    quote: "Structure first, style second, confidence always.",
    chunks: [
      {
        eyebrow: "Phase 02",
        heading: "Design without structure is decoration.",
        body: ["I wireframe before I design. Always.", "No color, no fonts, no images. Just the bones of a site that can actually convert."],
      },
      {
        heading: "A wireframe is the skeleton of your website.",
        list: ["Navigation placement", "Hero height and content priority", "Column grids", "CTA placement", "Mobile content flow"],
        body: ["You approve this before visual design starts, so we avoid the painful move-everything conversation at the end."],
      },
      {
        heading: "What you are seeing on the right is the layout logic.",
        body: [
          "Grey blocks are images. Thin lines are copy. Solid rectangles are buttons.",
          "Margins, section gaps, and grid columns are marked so every pixel has a job.",
        ],
      },
      {
        heading: "Once the structure is right, we lock it.",
        meta: ["Time spent: Day 2-3", "Tools: Figma", "Deliverable: Wireframe PDF", "Client sign-off required before design"],
      },
    ],
  },
  {
    id: "design",
    num: "03",
    kicker: "Visual Design",
    title: "Visual\nDesign",
    quote: "The brand becomes visible, but the strategy stays underneath.",
    chunks: [
      {
        eyebrow: "Phase 03",
        heading: "This is where your brand comes alive.",
        body: ["Not just pretty. Strategic.", "Every color has a reason, every font tells a story, and every spacing choice is intentional."],
      },
      {
        heading: "Typography creates visual hierarchy.",
        body: [
          "Display font: Bebas Neue for headlines, impact, and a commanding first impression.",
          "Body font: Inter for paragraphs, forms, and interface text that stays clean and readable.",
          "The contrast tells users where to look first.",
        ],
      },
      {
        heading: "The palette stays sharp and restrained.",
        body: [
          "#FF2020 brings energy and action.",
          "#0A0A0A gives the site a premium foundation.",
          "#FFFFFF creates clarity. #999999 supports hierarchy.",
          "Four colors. That restraint is what makes the brand feel expensive.",
        ],
      },
      {
        heading: "Everything snaps to an 8px grid.",
        body: ["Margins, padding, gaps, cards, buttons, and section rhythm all follow the same spacing system."],
        meta: ["Time spent: Day 3-6", "Tools: Figma", "Deliverable: Full UI design"],
      },
    ],
  },
  {
    id: "development",
    num: "04",
    kicker: "Development",
    title: "Development",
    quote: "The static design turns into a fast, living product.",
    chunks: [
      {
        eyebrow: "Phase 04",
        heading: "The design is perfect. Now I make it real.",
        body: ["This is where a static mockup becomes a living, responsive, animated website."],
      },
      {
        heading: "The stack is chosen for speed and maintainability.",
        list: ["Next.js for fast rendering and SEO", "TypeScript-minded structure for fewer runtime surprises", "Tailwind-style spacing discipline", "GSAP and ScrollTrigger for smooth storytelling"],
      },
      {
        heading: "The build moves in clear production passes.",
        body: ["Project setup, header, hero, content sections, animations, responsive behavior, SEO, performance, and testing all happen in sequence."],
      },
      {
        heading: "Clean code means the site can outlive the launch.",
        list: ["Reusable components", "Accessible markup", "Organized styles", "No unused dependencies", "Clear handoff documentation"],
        meta: ["Time spent: Day 5-12", "Tools: VS Code, GitHub, Vercel"],
      },
    ],
  },
  {
    id: "launch",
    num: "05",
    kicker: "Launch & Handoff",
    title: "Launch &\nHandoff",
    quote: "The site leaves the studio and starts doing business.",
    chunks: [
      {
        eyebrow: "Phase 05",
        heading: "Fourteen days from brief to live.",
        body: ["This is the moment the project stops being a file and starts becoming part of your business."],
      },
      {
        heading: "Before launch, every important path is checked.",
        list: ["Browser and device testing", "Lighthouse performance audit", "SEO metadata and sitemap", "Forms and validations", "Analytics and Search Console", "Domain, hosting, and SSL"],
      },
      {
        heading: "You receive the full project package.",
        list: ["Source code", "Figma design file", "CMS access and training", "Hosting credentials", "Analytics access", "Documentation and 30-day support"],
      },
      {
        heading: "The result is a site that earns trust fast.",
        body: ["It loads quickly, works on every screen, ranks cleanly, and gives visitors the confidence to contact you."],
        cta: "Start your project",
      },
    ],
  },
];

function Chunk({ phaseIndex, chunkIndex, chunk }) {
  return (
    <article className="doc-chunk" data-phase={phaseIndex} data-chunk={chunkIndex}>
      {chunk.eyebrow && <div className="doc-eyebrow">{chunk.eyebrow}</div>}
      <h3>{chunk.heading}</h3>
      {chunk.body?.map((line, index) => <p key={index}>{line}</p>)}
      {chunk.list && (
        <ul>
          {chunk.list.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
      {chunk.meta && (
        <div className="doc-meta-grid">
          {chunk.meta.map((item) => <span key={item}>{item}</span>)}
        </div>
      )}
      {chunk.cta && <a className="doc-cta" href="#contact">{chunk.cta} -&gt;</a>}
    </article>
  );
}

function getPhasePoints(phase) {
  return phase.chunks.slice(0, 3).map((chunk) => {
    if (chunk.body?.[0]) return chunk.body[0];
    if (chunk.list?.length) return chunk.list.slice(0, 3).join(", ");
    return chunk.heading;
  });
}

function getPhaseMeta(phase) {
  const meta = phase.chunks.find((chunk) => chunk.meta)?.meta || [];
  return meta.slice(0, 4).map((item) => {
    const [label, ...valueParts] = item.split(":");
    const value = valueParts.join(":").trim();
    return {
      label: value ? label.trim() : "Detail",
      value: value || item,
    };
  });
}

const phaseIcons = [
  // Discovery
  <svg key="d" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  // Wireframe
  <svg key="w" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  // Design
  <svg key="des" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  // Dev
  <svg key="dev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  // Launch
  <svg key="l" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
];

function CinematicPhaseLeft({ phase, phaseIndex }) {
  const points = getPhasePoints(phase);
  const meta = getPhaseMeta(phase);
  const icon = phaseIcons[phaseIndex] || phaseIcons[0];

  return (
    <div className="cinema-left-inner">
      {/* Phase badge */}
      <div className="cl-badge">
        <div className="cl-badge-icon">{icon}</div>
        <div className="cl-badge-text">
          <span className="cl-badge-num">Phase {phase.num}</span>
          <span className="cl-badge-kicker">{phase.kicker}</span>
        </div>
      </div>

      {/* Big title */}
      <h2 className="cinema-title">
        {phase.title.split("\n").map((line, index) => (
          <span key={line}>{line}{index < phase.title.split("\n").length - 1 && <br />}</span>
        ))}
      </h2>

      {/* Animated rule */}
      <div className="cinema-rule"></div>

      {/* Quote strip */}
      <blockquote className="cl-quote">
        <span className="cl-quote-mark">&#8220;</span>
        {phase.quote}
      </blockquote>

      {/* Numbered point cards */}
      <div className="cl-points">
        {points.map((point, index) => (
          <div className="cl-point-card cinema-point" key={`${phase.id}-point-${index}`}>
            <div className="cl-point-num">{String(index + 1).padStart(2, "0")}</div>
            <p className="cl-point-text">{point}</p>
          </div>
        ))}
      </div>

      {/* Meta grid */}
      {meta.length > 0 && (
        <div className="cl-meta">
          {meta.map((item, index) => (
            <div className="cinema-meta-card cl-meta-card" key={`${phase.id}-meta-${index}`}>
              <div className="cl-meta-label">{item.label}</div>
              <div className="cl-meta-value">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiscoveryAnim({ step }) {
  return (
    <div className="doc-stage discovery-stage">
      {/* Always-on animated background */}
      <div className="disc-grid-bg"></div>
      <div className="disc-ambient-glow"></div>
      <div className="disc-scan-beam"></div>

      {/* Scene HUD */}
      <div className="scene-hud">
        <span className="disc-hud-label">research matrix</span>
        <b className="disc-hud-step">{step + 1}/4</b>
      </div>

      {/* ── STEP 0: Init — Radar + signals ── */}
      <div className={`disc-layer disc-layer-0 ${step === 0 ? "is-active" : step > 0 ? "is-past" : ""}`}>
        {/* Outer orbital rings */}
        <div className="disc-orbit disc-orbit-1"></div>
        <div className="disc-orbit disc-orbit-2"></div>
        <div className="disc-orbit disc-orbit-3"></div>
        {/* Center crosshair */}
        <div className="disc-crosshair">
          <div className="disc-crosshair-h"></div>
          <div className="disc-crosshair-v"></div>
          <div className="disc-crosshair-dot"></div>
        </div>

        {/* Data signals orbiting */}
        {["GOALS", "OFFER", "AUDIENCE", "BUDGET"].map((item, i) => (
          <div key={item} className="disc-signal" style={{ "--si": i }}>
            <span>{item}</span>
          </div>
        ))}
        {/* Terminal readout */}
        <div className="disc-terminal-init">
          <span className="disc-t-cursor">█</span>
          <span className="disc-t-text">INITIALIZING PROJECT_</span>
        </div>
        {/* Floating data chips */}
        {["goals", "offer", "audience"].map((item, i) => (
          <div key={item} className="disc-chip" style={{ "--ci": i }}>{item}</div>
        ))}
      </div>

      {/* ── STEP 1: Questions — floating bubbles + data rain ── */}
      <div className={`disc-layer disc-layer-1 ${step === 1 ? "is-active" : step > 1 ? "is-past" : ""}`}>
        <div className="disc-data-rain">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="disc-rain-col" style={{ "--ri": i }}>
              {Array.from({ length: 8 }).map((_, j) => (
                <span key={j} style={{ "--rj": j }}>{Math.random() > 0.5 ? "1" : "0"}</span>
              ))}
            </div>
          ))}
        </div>
        {["Goals?", "Audience?", "Budget?", "Timeline?", "Success?"].map((q, i) => (
          <div key={q} className="disc-bubble" style={{ "--bi": i }}>{q}</div>
        ))}
        <div className="disc-pulse-ring"></div>
        <div className="disc-pulse-ring disc-pulse-ring-2"></div>
      </div>

      {/* ── STEP 2: Sitemap — animated nodes ── */}
      <div className={`disc-layer disc-layer-2 ${step === 2 ? "is-active" : step > 2 ? "is-past" : ""}`}>
        <svg className="disc-sitemap" viewBox="0 0 520 320" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="disc-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g className="disc-map-lines" filter="url(#disc-glow)">
            <path className="disc-path" style={{ "--pi": 0 }} d="M260 82 L140 150" />
            <path className="disc-path" style={{ "--pi": 1 }} d="M140 150 L94 222" />
            <path className="disc-path" style={{ "--pi": 2 }} d="M140 150 L186 222" />
            <path className="disc-path" style={{ "--pi": 3 }} d="M260 82 L260 150" />
            <path className="disc-path" style={{ "--pi": 4 }} d="M260 150 L226 222" />
            <path className="disc-path" style={{ "--pi": 5 }} d="M260 150 L294 222" />
            <path className="disc-path" style={{ "--pi": 6 }} d="M260 82 L380 150" />
            <path className="disc-path" style={{ "--pi": 7 }} d="M380 150 L338 222" />
            <path className="disc-path" style={{ "--pi": 8 }} d="M380 150 L426 222" />
          </g>
          {/* Traveling data packets on lines */}
          <circle className="disc-packet disc-packet-a" r="3" fill="#FF2020">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath xlinkHref="#disc-path-main" />
            </animateMotion>
          </circle>
          {["HOME", "ABOUT", "SERVICES", "CONTACT", "DESIGN", "ECOM", "LANDING"].map((n, i) => {
            const pos = [[220,50],[96,132],[218,132],[336,132],[48,208],[162,208],[364,208]][i];
            return (
              <g className="disc-map-node" key={n} style={{ "--ni": i }}>
                <rect x={pos[0]} y={pos[1]} width="82" height="34" rx="7" className="disc-node-rect" />
                <text x={pos[0] + 41} y={pos[1] + 22} className="disc-node-text">{n}</text>
                {/* Pulse dot */}
                <circle cx={pos[0] + 82} cy={pos[1]} r="4" className="disc-node-pulse" />
              </g>
            );
          })}
        </svg>
        {/* Floating labels */}
        <div className="disc-map-label disc-map-label-a">7 pages mapped</div>
        <div className="disc-map-label disc-map-label-b">Navigation flow</div>
      </div>

      {/* ── STEP 3: Brief card — 3D flip reveal ── */}
      <div className={`disc-layer disc-layer-3 ${step === 3 ? "is-active" : ""}`}>
        <div className="disc-brief">
          <div className="disc-brief-inner">
            <div className="disc-brief-header">
              <span className="disc-brief-tag">PROJECT BRIEF</span>
              <div className="disc-brief-approved">APPROVED</div>
            </div>
            <div className="disc-brief-title">LUMARIX.COM</div>
            <small className="disc-brief-sub">scope / pages / copy / stack</small>
            <div className="disc-brief-bars">
              {[100, 72, 88, 60].map((w, i) => (
                <div key={i} className="disc-brief-bar" style={{ "--bw": `${w}%`, "--bi": i }}></div>
              ))}
            </div>
            <div className="disc-brief-stats">
              <div><b>5</b><small>Pages</small></div>
              <div><b>14d</b><small>Timeline</small></div>
              <div><b>100%</b><small>Custom</small></div>
            </div>
          </div>
          {/* Confetti / celebration dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="disc-confetti" style={{ "--cfi": i }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WireframeAnim({ step }) {
  return (
    <div className="doc-stage wire-stage">
      <div className="scene-hud"><span>layout blueprint</span><b>{step + 1}/4</b></div>
      <div className={`site-shell ${step === 0 ? "is-live" : ""}`}><span>THIS IS YOUR WEBSITE</span></div>
      <div className={`wire-grid ${step >= 1 ? "is-live" : ""}`}>{Array.from({ length: 12 }).map((_, i) => <i key={i}></i>)}</div>
      <div className={`wire-rulers ${step >= 1 ? "is-live" : ""}`}><span>48px margin</span><b>12 column grid</b><em>80px section gap</em></div>
      <div className={`wire-layout ${step >= 2 ? "is-live" : ""}`}>
        <div className="wire-nav"><b></b><span></span><span></span><span></span><em></em></div>
        <div className="wire-hero-doc"><main></main><aside></aside><button></button></div>
        <div className="wire-cards">{[0, 1, 2].map((i) => <section key={i}></section>)}</div>
        <footer></footer>
      </div>
      <div className={`wire-notes ${step >= 2 ? "is-live" : ""}`}><span>12 columns</span><span>80px gap</span><span>48px margin</span></div>
      <div className={`approved-stamp ${step === 3 ? "is-live" : ""}`}>CLIENT APPROVED</div>
    </div>
  );
}

function DesignAnim({ step }) {
  return (
    <div className="doc-stage design-stage">
      <div className="scene-hud"><span>brand system</span><b>{step + 1}/4</b></div>
      <div className={`faded-wire ${step === 0 ? "is-live" : ""}`}></div>
      <div className={`design-cursor ${step === 0 ? "is-live" : ""}`}>SELECT LAYOUT</div>
      <div className={`font-specimen ${step === 1 ? "is-live" : ""}`}>
        <strong>BEBAS NEUE</strong>
        <span>Inter Regular builds the readable interface layer.</span>
        <em>96px / 16px</em>
      </div>
      <div className={`swatch-board ${step === 2 ? "is-live" : ""}`}>
        {[
          ["#FF2020", "Energy"],
          ["#0A0A0A", "Premium"],
          ["#FFFFFF", "Clarity"],
          ["#999999", "Support"],
        ].map(([hex, label], i) => <div key={hex} style={{ "--c": hex, "--i": i }}><b></b><span>{hex}</span><small>{label}</small></div>)}
      </div>
      <div className={`palette-links ${step === 2 ? "is-live" : ""}`}><i></i><i></i><i></i></div>
      <div className={`snap-grid ${step === 3 ? "is-live" : ""}`}><span>8px</span><b></b><em>24px</em><i>48px</i></div>
    </div>
  );
}

function DevelopmentAnim({ step }) {
  return (
    <div className="doc-stage dev-stage">
      <div className="scene-hud"><span>production build</span><b>{step + 1}/4</b></div>
      <div className={`split-editor ${step === 0 ? "is-live" : ""}`}><section></section><code><small>app/page.js</small>&lt;Hero /&gt;<br />&lt;Process /&gt;<br />&lt;Contact /&gt;</code></div>
      <div className={`terminal-install ${step === 1 ? "is-live" : ""}`}>
        {["$ npx create-next-app@latest", "✓ TypeScript: Yes", "✓ Tailwind: Yes", "$ npm install gsap", "✓ Ready in 4.2s"].map((line, i) => <span key={line} style={{ "--i": i }}>{line}</span>)}
      </div>
      <div className={`gantt ${step === 2 ? "is-live" : ""}`}>
        <b>DAY 5 -&gt; DAY 12</b>
        {["Setup", "Hero", "Sections", "Animations", "Mobile", "SEO", "Testing"].map((task, i) => <span key={task} style={{ "--i": i, "--w": `${38 + i * 7}%` }}>{task}</span>)}
      </div>
      <div className={`lighthouse ${step === 3 ? "is-live" : ""}`}>
        {["98", "100", "97", "100"].map((score, i) => <div key={i}><b>{score}</b><span>{["Performance", "Accessibility", "Best Practices", "SEO"][i]}</span></div>)}
      </div>
    </div>
  );
}

function LaunchAnim({ step }) {
  return (
    <div className="doc-stage launch-stage">
      <div className="scene-hud"><span>launch control</span><b>{step + 1}/4</b></div>
      <div className={`rocket-scene ${step === 0 ? "is-live" : ""}`}><b>3 2 1</b><i></i><span>lumarix.com LIVE</span></div>
      <div className={`launch-list ${step === 1 ? "is-live" : ""}`}>{["Browsers", "Devices", "Performance", "SEO", "Forms", "SSL"].map((item, i) => <span key={item} style={{ "--i": i }}>{item}</span>)}</div>
      <div className={`handoff-box ${step === 2 ? "is-live" : ""}`}>{["GitHub", "Figma", "CMS", "PDF", "Video"].map((item, i) => <span key={item} style={{ "--i": i }}>{item}</span>)}<b>YOUR PROJECT PACKAGE</b></div>
      <div className={`device-finale ${step === 3 ? "is-live" : ""}`}><main></main><aside></aside><section></section><button>START YOUR PROJECT</button></div>
    </div>
  );
}

function AnimationPanel({ phase, step }) {
  const activeChunk = phase.chunks[step];
  return (
    <div className="anim-canvas">
      <div className="panel-grid-lines"></div>
      <div className="panel-corner-accent panel-corner-accent--tl"></div>
      <div className="panel-corner-accent panel-corner-accent--br"></div>
      <div className="panel-particles" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => <i key={index} style={{ "--i": index }}></i>)}
      </div>
      <div className="anim-chrome">
        <span></span><span></span><span></span>
        <p>{phase.kicker}</p>
        <em>{step + 1}/4</em>
      </div>
      <div className="anim-caption">
        <b>{phase.num}.{step + 1}</b>
        <span>{activeChunk?.heading}</span>
      </div>
      {phase.id === "discovery" && <DiscoveryAnim step={step} />}
      {phase.id === "wireframe" && <WireframeAnim step={step} />}
      {phase.id === "design" && <DesignAnim step={step} />}
      {phase.id === "development" && <DevelopmentAnim step={step} />}
      {phase.id === "launch" && <LaunchAnim step={step} />}
    </div>
  );
}

export default function BuildSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState({ phase: 0, chunk: 0 });
  const mobilePairs = useMemo(() => phases.flatMap((phase, phaseIndex) => phase.chunks.map((chunk, chunkIndex) => ({ phase, phaseIndex, chunk, chunkIndex }))), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.set(".cinema-title, .cinema-point, .cinema-meta-card", { y: 34, opacity: 0 });
        gsap.set(".cinema-rule", { scaleX: 0, transformOrigin: "left center" });

        gsap.utils.toArray(".doc-phase").forEach((phaseEl) => {
          const phaseIndex = Number(phaseEl.dataset.phase);
          const title = phaseEl.querySelector(".cinema-title");
          const rule = phaseEl.querySelector(".cinema-rule");
          const points = phaseEl.querySelectorAll(".cinema-point");
          const metaCards = phaseEl.querySelectorAll(".cinema-meta-card");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: phaseEl,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1.35,
              anticipatePin: 1,
              onUpdate: (self) => {
                const chunk = Math.min(3, Math.floor(self.progress * 4));
                setActive((current) => (
                  current.phase === phaseIndex && current.chunk === chunk
                    ? current
                    : { phase: phaseIndex, chunk }
                ));
              },
            },
          });

          tl.to(title, { y: 0, opacity: 1, duration: 0.18, ease: "power4.out" }, 0)
            .to(rule, { scaleX: 1, duration: 0.12, ease: "power3.out" }, 0.14)
            .to(points[0], { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" }, 0.22)
            .to(points[1], { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" }, 0.40)
            .to(points[2], { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" }, 0.58)
            .to(metaCards, { y: 0, opacity: 1, stagger: 0.04, duration: 0.16, ease: "power3.out" }, 0.74)
            .fromTo(phaseEl.querySelector(".anim-canvas"), { rotateY: -3, scale: 0.975 }, { rotateY: 0, scale: 1, duration: 0.35, ease: "power2.out" }, 0)
            .to(phaseEl.querySelector(".anim-canvas"), { boxShadow: "0 34px 90px rgba(0,0,0,.55),0 0 110px rgba(255,32,32,.16)", duration: 0.2, ease: "sine.inOut" }, 0.56)
            .to(phaseEl.querySelector(".panel-corner-accent--tl"), { x: 8, y: 8, opacity: 0.9, duration: 0.18, yoyo: true, repeat: 1 }, 0.32)
            .to(phaseEl.querySelector(".panel-corner-accent--br"), { x: -8, y: -8, opacity: 0.9, duration: 0.18, yoyo: true, repeat: 1 }, 0.64);
        });

        return () => {};
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(".doc-mobile-pair .doc-chunk, .doc-mobile-pair .anim-canvas", { opacity: 0, y: 36 });
        gsap.utils.toArray(".doc-mobile-pair").forEach((pair) => {
          gsap.to(pair.querySelectorAll(".anim-canvas, .doc-chunk"), {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pair,
              start: "top 78%",
              once: true,
            },
          });
        });

        return () => {};
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="doc-section" id="process" ref={sectionRef}>
      <div className="doc-mobile-flow">
        {mobilePairs.map(({ phase, phaseIndex, chunk, chunkIndex }) => (
          <div className="doc-mobile-pair" key={`${phase.id}-${chunkIndex}`}>
            <AnimationPanel phase={phase} step={chunkIndex} />
            <Chunk phaseIndex={phaseIndex} chunkIndex={chunkIndex} chunk={chunk} />
          </div>
        ))}
      </div>

      <div className="doc-timeline" aria-hidden="true">
        {phases.map((phase, index) => (
          <div className={`doc-timeline-step ${index === active.phase ? "active" : index < active.phase ? "done" : ""}`} key={phase.id}>
            <span>{phase.num}</span>
          </div>
        ))}
      </div>

      <div className="doc-desktop-flow">
        {phases.map((phase, phaseIndex) => (
          <div className="doc-phase phase-cinema" key={phase.id} data-phase={phaseIndex}>
            <div className="doc-left">
              <CinematicPhaseLeft phase={phase} phaseIndex={phaseIndex} />
            </div>
            <div className="doc-right">
              <div className="doc-live-label"><span>Live build feed</span><b>{phase.num}.{active.phase === phaseIndex ? active.chunk + 1 : 1}</b></div>
              <AnimationPanel phase={phase} step={active.phase === phaseIndex ? active.chunk : 0} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
