import { useEffect, useRef } from "react";
import profilePhoto from "../assets/pfp.webp";

const styles = {
  section: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "clamp(2.5rem, 7vw, 4rem) var(--gap) clamp(1.75rem, 5vw, 3rem)",
    opacity: 0,
    transform: "translateY(16px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },
  sectionVisible: {
    opacity: 1,
    transform: "translateY(0)",
  },
  greeting: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2rem, 5vw, 2.8rem)",
    fontWeight: 600,
    color: "var(--color-text)",
    marginBottom: "1.75rem",
    letterSpacing: "-0.03em",
  },
  accent: {
    color: "var(--color-accent)",
  },
  body: {
    fontSize: "1rem",
    color: "var(--color-text-muted)",
    maxWidth: "560px",
    marginBottom: "1.1rem",
    lineHeight: "1.85",
    fontWeight: 300,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "2rem",
  },
  tag: {
    background: "var(--color-surface)",
    color: "var(--color-text-muted)",
    fontSize: "0.78rem",
    padding: "0.3rem 0.75rem",
    borderRadius: "100px",
    border: "1px solid var(--color-border)",
    letterSpacing: "0.03em",
    fontWeight: 400,
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--color-border)",
    margin: "2rem 0 0",
  },
  photoRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "1.75rem",
  },
  photoWrap: {
    width: "96px",
    height: "96px",
    borderRadius: "12px",
    overflow: "hidden",
    flexShrink: 0,
    border: "2px solid var(--color-border-strong)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 10%",
    transform: "scale(1.15)",
    transformOrigin: "center 20%",
    display: "block",
    borderRadius: 0,
  },
};

const tags = [
  "Full-Stack Engineering",
  "Cloud Infrastructure",
  "QA Automation",
  "AAPI Community",
  "UC San Diego",
  "San Francisco",
];

export default function About() {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.style.opacity = 1;
          ref.current.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={styles.section}>
      <div style={styles.photoRow}>
        <div style={styles.photoWrap}>
          <img src={profilePhoto} alt="Kenny Zhang" style={styles.photo} />
        </div>
        <h1 style={{ ...styles.greeting, marginBottom: 0 }}>
          Hi, I'm <span style={styles.accent}>Kenny.</span>
        </h1>
      </div>

      <p style={styles.body}>
        I'm a UC San Diego Math &amp; CS graduate, Apple Specialist in San
        Francisco, and Chief of Systems and Operations at the{" "}
        <a
          href="https://www.instagram.com/p/DKf1CGKyjL1/"
          target="_blank"
          rel="noreferrer"
        >
          Chinatown Volunteer Coalition
        </a>
        .
      </p>

      <p style={styles.body}>
        I've worked across software engineering, cloud infrastructure, and QA
        automation through internships at Quicken, and led technical operations
        supporting 60+ small businesses in San Francisco's Chinatown.
      </p>

      <p style={styles.body}>
        I'm seeking software engineering roles where I can build scalable
        systems, collaborate with strong teams, and keep growing. Check out my{" "}
        <a
          href="https://drive.google.com/file/d/1br1CkeR1LAKvVavwHvzdjrBExILcaOPs/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          résumé
        </a>{" "}
        if you're hiring.
      </p>

      <p style={{ ...styles.body, marginBottom: 0 }}>
        Outside of work, I enjoy{" "}
        <a href="https://www.youtube.com/watch?v=2RBafWAGJ2Q" target="_blank" rel="noreferrer">Korean music</a>,{" "}
        <a href="https://www.netflix.com/title/81681535" target="_blank" rel="noreferrer">K-dramas</a>,{" "}
        <a href="https://www.youtube.com/watch?v=xf-zV1uTkW0&t=203s" target="_blank" rel="noreferrer">basketball</a>,{" "}
        <a href="https://www.instagram.com/p/DKf1CGKyjL1/" target="_blank" rel="noreferrer">volunteering with AAPI organizations</a>,
        and staying up to date on{" "}
        <a href="https://www.youtube.com/@t3dotgg" target="_blank" rel="noreferrer">AI</a>{" "}
        and{" "}
        <a href="https://www.youtube.com/@mkbhd" target="_blank" rel="noreferrer">emerging tech</a>.
      </p>

      <div style={styles.tagRow}>
        {tags.map((t) => (
          <span key={t} style={styles.tag}>
            {t}
          </span>
        ))}
      </div>

      <hr style={styles.divider} />
    </section>
  );
}
