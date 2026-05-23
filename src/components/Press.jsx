import { useEffect, useRef } from "react";

const styles = {
  section: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "clamp(1.75rem, 5vw, 3rem) var(--gap)",
    opacity: 0,
    transform: "translateY(16px)",
    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--color-text-faint)",
    marginBottom: "1.5rem",
    fontWeight: 500,
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  videoWrap: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: "10px",
    overflow: "hidden",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
  linkGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  pressLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.85rem 0",
    borderBottom: "1px solid var(--color-border)",
    textDecoration: "none",
    transition: "opacity 0.15s",
  },
  pressSource: {
    fontSize: "0.72rem",
    color: "var(--color-text-faint)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "0.15rem",
    fontWeight: 500,
  },
  pressTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    color: "var(--color-text)",
    fontWeight: 400,
  },
  arrow: {
    color: "var(--color-text-faint)",
    fontSize: "0.85rem",
    flexShrink: 0,
    marginLeft: "1rem",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--color-border)",
    margin: "2rem 0 0",
  },
};

const videos = [
  "https://www.youtube.com/embed/2NWVuugbcYs",
  "https://www.youtube.com/embed/svMwJHic-X0",
  "https://www.youtube.com/embed/77zeZc1OvxE",
  "https://www.youtube.com/embed/LfIaujE0-m4",
];

const pressLinks = [
  {
    source: "USA TODAY",
    title: "10 best night markets in the United States",
    href: "https://10best.usatoday.com/awards/best-night-market/",
  },
  {
    source: "Compassion in Oakland",
    title: "AAPI Community Nomination",
    href: "https://www.instagram.com/p/CdO5-kjhh-W/",
  },
];

export default function Press() {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.style.opacity = 1;
          ref.current.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="press" ref={ref} style={styles.section}>
      <p style={styles.sectionLabel}>Press</p>

      <div style={styles.videoGrid}>
        {videos.map((src) => (
          <div key={src} style={styles.videoWrap}>
            <iframe
              style={styles.iframe}
              src={src}
              title="Press video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      <div style={styles.linkGrid}>
        {pressLinks.map((p) => (
          <a
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            style={styles.pressLink}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div>
              <div style={styles.pressSource}>{p.source}</div>
              <div style={styles.pressTitle}>{p.title}</div>
            </div>
            <span style={styles.arrow}>↗</span>
          </a>
        ))}
      </div>

      <hr style={styles.divider} />
    </section>
  );
}
