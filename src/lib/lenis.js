import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis;
let rafHandler;

export function initLenis() {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.82,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  rafHandler = (time) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;
  return lenis;
}

export function destroyLenis() {
  if (rafHandler) {
    gsap.ticker.remove(rafHandler);
    rafHandler = null;
  }
  lenis?.destroy();
  lenis = null;
  if (typeof window !== "undefined") {
    delete window.__lenis;
  }
}

export function getLenis() {
  return lenis;
}
