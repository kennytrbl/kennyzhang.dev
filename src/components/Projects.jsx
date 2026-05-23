import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const styles = {
  section: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "clamp(1.75rem, 5vw, 3rem) var(--gap)",
    opacity: 0,
    transform: "translateY(16px)",
    transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--color-text-faint)",
    marginBottom: "1.25rem",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
  },
  cardImageWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    background: "var(--color-border)",
    overflow: "hidden",
    margin: "0 auto",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    borderRadius: 0,
  },
  cardImagePlaceholder: {
    width: "100%",
    height: "150px",
    background: "var(--color-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-text-faint)",
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  cardBody: {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.6rem",
  },
  projectName: {
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    fontWeight: 400,
    color: "var(--color-text)",
  },
  linkIcon: {
    color: "var(--color-text-faint)",
    fontSize: "0.8rem",
    textDecoration: "none",
    lineHeight: 1,
    flexShrink: 0,
    marginLeft: "0.5rem",
  },
  desc: {
    fontSize: "0.85rem",
    color: "var(--color-text-muted)",
    lineHeight: 1.7,
    fontWeight: 300,
    flex: 1,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3rem",
    marginTop: "0.875rem",
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
  loading: {
    color: "var(--color-text-faint)",
    fontSize: "0.875rem",
    padding: "0.5rem 0",
  },
};

function normalizeTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [raw];
    } catch {
      return raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
  }
  return [];
}

export default function Projects() {
  const ref = useRef();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProjects(
            data.map((p) => ({
              ...p,
              _imageUrl: p.image
                ? supabase.storage.from("kennytrbl").getPublicUrl(p.image).data
                    .publicUrl
                : null,
            })),
          );
        }
        setLoading(false);
      });
  }, []);

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

  const handleHover = (e, enter) => {
    e.currentTarget.style.borderColor = enter
      ? "var(--color-border-strong)"
      : "var(--color-border)";
    e.currentTarget.style.transform = enter
      ? "translateY(-2px)"
      : "translateY(0)";
  };

  return (
    <section id="projects" ref={ref} style={styles.section}>
      <p style={styles.sectionLabel}>Projects</p>

      {loading && <p style={styles.loading}>Loading…</p>}

      {!loading && (
        <div style={styles.grid}>
          {projects.map((p, i) => {
            const imgUrl = p._imageUrl ?? null;
            const name = p.project ?? p.name;
            const href = p.link ?? p.url;
            return (
              <div
                key={p.id ?? i}
                style={{ ...styles.card, cursor: href ? "pointer" : "default" }}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
                onClick={() =>
                  href && window.open(href, "_blank", "noreferrer")
                }
              >
                {imgUrl ? (
                  <div style={styles.cardImageWrap}>
                    <img src={imgUrl} alt={name} style={styles.cardImage} />
                  </div>
                ) : (
                  <div style={styles.cardImagePlaceholder}>No image</div>
                )}

                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <span style={styles.projectName}>{name}</span>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.linkIcon}
                        aria-label={`View ${name}`}
                      >
                        ↗
                      </a>
                    )}
                  </div>
                  <p style={styles.desc}>{p.description}</p>
                  <div style={styles.tags}>
                    {normalizeTags(p.tags).map((t) => (
                      <span key={t} style={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <hr style={styles.divider} />
    </section>
  );
}
