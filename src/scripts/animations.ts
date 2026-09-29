import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const hero = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  hero
    .fromTo(
      "[data-hero='greeting']",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6 },
    )
    .fromTo(
      "[data-hero='line']",
      { opacity: 0, yPercent: 110 },
      { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.12 },
      "-=0.3",
    )
    .fromTo(
      "[data-hero='tagline']",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5",
    )
    .fromTo(
      "[data-hero='social']",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      "-=0.4",
    );

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          overwrite: true,
        },
      ),
  });

  gsap.to("[data-progress]", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });
});
