"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const posts = [
  {
    cat: "Development", date: "May 10, 2026", read: "8 min",
    title: "Why Next.js 15 Is the Future of Web Development",
    excerpt: "Server components, streaming SSR, and edge runtime have changed everything. Here's why every serious developer and business should invest in Next.js — and how it delivers 3x faster load times than traditional React apps.",
    tags: ["Next.js", "React", "SSR", "Performance"],
  },
  {
    cat: "Design", date: "May 5, 2026", read: "6 min",
    title: "The Psychology of Dark Mode UI Design",
    excerpt: "Dark interfaces reduce eye strain by 60% and signal premium quality. Learn the neuroscience behind why dark palettes convert better, how to pick the right dark shades, and the accessibility pitfalls to avoid.",
    tags: ["UI/UX", "Dark Mode", "Psychology", "Accessibility"],
  },
  {
    cat: "Business", date: "Apr 28, 2026", read: "10 min",
    title: "How a $2K Website Generates $200K in Revenue",
    excerpt: "ROI-driven web design isn't a myth. This case study breaks down exactly how strategic design decisions — CTA placement, trust signals, page speed — directly impact your bottom line and customer acquisition cost.",
    tags: ["ROI", "Conversion", "Strategy", "Case Study"],
  },
  {
    cat: "Performance", date: "Apr 20, 2026", read: "7 min",
    title: "Lighthouse Score 98: The Optimization Playbook",
    excerpt: "Every millisecond counts. Image compression, lazy loading, code splitting, font subsetting, and CDN configuration — a complete checklist to ship blazing fast sites that rank higher on Google.",
    tags: ["Lighthouse", "Core Web Vitals", "SEO", "Speed"],
  },
  {
    cat: "Animation", date: "Apr 14, 2026", read: "9 min",
    title: "Scroll-Driven Storytelling with GSAP ScrollTrigger",
    excerpt: "The most engaging websites don't just display content — they reveal it. Learn how to build cinematic scroll experiences using GSAP ScrollTrigger, from basic reveals to complex pinned timeline sequences.",
    tags: ["GSAP", "ScrollTrigger", "Animation", "UX"],
  },
  {
    cat: "Branding", date: "Apr 7, 2026", read: "5 min",
    title: "Your Website Is Your Best Salesperson — Treat It Like One",
    excerpt: "A well-designed website works 24/7, never calls in sick, and scales infinitely. Here's how to turn your digital presence into an automated client acquisition machine that builds trust before the first call.",
    tags: ["Branding", "Sales", "Trust", "Freelance"],
  },
];

export default function BlogClient() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" });
      gsap.fromTo(".blog-hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
      gsap.fromTo(".blog-post", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.3, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="blog-page">
      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-brand"><span>L</span> LUMARIX</a>
          <div className="nav-links">
            <a href="/#process">Process</a>
            <a href="/blog">Blog</a>
            <a href="/#contact" className="nav-cta">Let&apos;s Talk</a>
          </div>
        </div>
      </nav>

      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-label">THE BLOG</div>
          <h1 className="blog-hero-title">Insights on Building<br/><span style={{color:"var(--red)"}}>Premium Websites</span></h1>
          <p className="blog-hero-desc">Deep dives into web development, design strategy, performance optimization, and turning websites into revenue machines.</p>
        </div>
      </section>

      <section className="blog-list">
        <div className="container">
          <div className="blog-posts-grid">
            {posts.map((post, i) => (
              <article className="blog-post" key={i}>
                <div className="blog-post-header">
                  <span className="blog-post-cat">{post.cat}</span>
                  <span className="blog-post-meta">{post.date} · {post.read} read</span>
                </div>
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <div className="blog-post-tags">
                  {post.tags.map((t, ti) => <span key={ti} className="blog-post-tag">{t}</span>)}
                </div>
                <div className="blog-post-footer">
                  <span className="blog-post-link">Read Full Article →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Lumarix Solutions © {new Date().getFullYear()}</p>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
