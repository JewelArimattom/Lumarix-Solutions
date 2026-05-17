import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function animatePhaseHeader(phaseEl) {
  if (!phaseEl) return null;

  const eyebrowNum = phaseEl.querySelector(".phase-eyebrow-num");
  const eyebrowLine = phaseEl.querySelector(".phase-eyebrow-line");
  const title = phaseEl.querySelector(".phase-title");
  const quote = phaseEl.querySelector(".phase-quote");
  if (!eyebrowNum || !eyebrowLine || !title || !quote) return null;

  const split = new SplitType(title, { types: "chars" });
  gsap.set(split.chars, {
    y: 62,
    opacity: 0,
    rotateX: -45,
    transformOrigin: "center bottom",
  });
  gsap.set([eyebrowNum, quote], { opacity: 0 });
  gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: "left center" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: phaseEl,
      start: "top 72%",
      once: true,
    },
  });

  tl.fromTo(eyebrowNum, { x: -18 }, { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" })
    .to(eyebrowLine, { scaleX: 1, duration: 0.85, ease: "power3.inOut" }, "<")
    .to(split.chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.55,
      stagger: 0.022,
      ease: "back.out(1.7)",
    }, "-=0.28")
    .fromTo(quote, { y: 22 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.18");

  return split;
}

export function prepareRevealLines(selector, root = document) {
  const elements = typeof selector === "string"
    ? Array.from(root.querySelectorAll(selector))
    : selector instanceof Element
      ? [selector]
      : Array.from(selector || []);
  const splits = [];

  elements.forEach((el) => {
    if (!el || el.dataset.splitReady === "true") return;
    const split = new SplitType(el, { types: "lines" });
    split.lines.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.className = "line-mask";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    gsap.set(split.lines, { y: "110%", opacity: 0 });
    el.dataset.splitReady = "true";
    splits.push(split);
  });

  return splits;
}

export function revealChunkText(chunk) {
  if (!chunk) return;
  const plainItems = chunk.querySelectorAll(".doc-eyebrow, .doc-meta-grid span, .doc-cta");
  const lineItems = chunk.querySelectorAll("h3, p, li");

  prepareRevealLines(lineItems);
  gsap.killTweensOf(chunk.querySelectorAll(".line, .doc-eyebrow, .doc-meta-grid span, .doc-cta"));
  gsap.set(plainItems, { y: 18, opacity: 0 });
  gsap.set(chunk.querySelectorAll(".line"), { y: "110%", opacity: 0 });

  const lines = chunk.querySelectorAll(".line");
  const tl = gsap.timeline();
  tl.to(plainItems, { y: 0, opacity: 1, stagger: 0.045, duration: 0.35, ease: "power2.out" })
    .to(lines, {
      y: "0%",
      opacity: 1,
      stagger: 0.055,
      duration: 0.7,
      ease: "power3.out",
    }, plainItems.length ? "-=0.12" : 0);

  return tl;
}
