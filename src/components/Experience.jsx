import { useEffect, useRef } from "react";

const styles = {
  section: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "clamp(1.75rem, 5vw, 3rem) var(--gap)",
    opacity: 0,
    transform: "translateY(16px)",
    transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--color-text-faint)",
    marginBottom: "1.5rem",
    fontWeight: 500,
  },
  item: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "0 1.5rem",
    paddingBottom: "2rem",
    marginBottom: "2rem",
    borderBottom: "1px solid var(--color-border)",
  },
  dateRange: {
    fontSize: "0.78rem",
    color: "var(--color-text-faint)",
    paddingTop: "0.2rem",
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  role: {
    fontFamily: "var(--font-display)",
    fontSize: "1.05rem",
    fontWeight: 500,
    marginBottom: "0.25rem",
    color: "var(--color-text)",
  },
  company: {
    fontSize: "0.85rem",
    color: "var(--color-accent)",
    marginBottom: "0.6rem",
    fontWeight: 400,
    textDecoration: "none",
  },
  desc: {
    fontSize: "0.9rem",
    color: "var(--color-text-muted)",
    lineHeight: 1.75,
    fontWeight: 300,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    marginTop: "0.75rem",
  },
  tag: {
    fontSize: "0.68rem",
    color: "var(--color-text-faint)",
    border: "1px solid var(--color-border)",
    borderRadius: "100px",
    padding: "0.15rem 0.5rem",
    letterSpacing: "0.02em",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--color-border)",
    margin: "2rem 0 0",
  },
};

const itemResponsive = `
  @media (max-width: 500px) {
    .exp-item { grid-template-columns: 1fr !important; }
    .exp-date { margin-bottom: 0.25rem; }
  }
`;

const items = [
  {
    date: "Aug 2025 – Present",
    role: "Specialist",
    company: "Apple",
    href: "https://apple.com",
    desc: "Deliver personalized technical consultations to 50+ customers weekly at the SF flagship, consistently achieving top sales performance through solution-based selling. Leverage Cantonese fluency to support non-English speaking customers.",
    tags: ["iOS", "macOS", "Apple Services", "Sales", "Customer Experience"],
  },
  {
    date: "Jun – Sep 2023",
    role: "Software Engineering Intern — Cloud",
    company: "Quicken",
    href: "https://quicken.com",
    desc: "Integrated a third-party Java library for automated JSON reporting, reduced cloud deployment time 25% via optimized Docker and CI/CD pipelines, and authored RESTful API documentation to improve cross-team collaboration.",
    tags: ["Java", "Docker", "CI/CD", "REST APIs", "Microservices"],
  },
  {
    date: "May – Aug 2022",
    role: "Software Engineering Intern — QA",
    company: "Quicken",
    href: "https://quicken.com",
    desc: "Improved test execution speed 50% and coverage 40% by refactoring Selenium automation with modular page objects and async execution. Reduced issue resolution time 50% through cross-functional debugging with JIRA.",
    tags: ["Selenium", "Python", "JIRA", "Test Automation", "CI/CD"],
  },
  {
    date: "Mar – Oct 2018",
    role: "Research Intern",
    company: "Podkeeper",
    href: null,
    desc: "Expanded market reach in North Carolina through competitive analysis and code refinement for an educational communication platform.",
    tags: ["Research", "Competitive Analysis"],
  },
];

export default function Experience() {
  const ref = useRef();

  useEffect(() => {
    if (!document.getElementById("exp-responsive")) {
      const s = document.createElement("style");
      s.id = "exp-responsive";
      s.textContent = itemResponsive;
      document.head.appendChild(s);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.style.opacity = 1;
          ref.current.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} style={styles.section}>
      <p style={styles.sectionLabel}>Experience</p>

      {items.map((e, i) => {
        const isLast = i === items.length - 1;
        return (
          <div
            key={i}
            className="exp-item"
            style={{
              ...styles.item,
              ...(isLast ? { border: "none", marginBottom: 0, paddingBottom: 0 } : {}),
            }}
          >
            <div className="exp-date" style={styles.dateRange}>{e.date}</div>
            <div>
              <div style={styles.role}>{e.role}</div>
              {e.href ? (
                <a href={e.href} target="_blank" rel="noreferrer" style={styles.company}>{e.company}</a>
              ) : (
                <div style={styles.company}>{e.company}</div>
              )}
              <p style={styles.desc}>{e.desc}</p>
              <div style={styles.tags}>
                {e.tags.map((t) => (
                  <span key={t} style={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <hr style={styles.divider} />
    </section>
  );
}
