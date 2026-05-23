import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

const PHOTO_URLS = [
  "volunteering.webp",
  "volunteering2.webp",
  "volunteering3.webp",
  "volunteering4.webp",
  "volunteering5.webp",
  "volunteering6.webp",
  "volunteering7.webp",
  "volunteering8.webp",
  "volunteering9.webp",
  "volunteering10.webp",
].map((name) => supabase.storage.from("kennytrbl").getPublicUrl(name).data.publicUrl);

const INTERVAL_MS = 4000;

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
    marginBottom: "1.25rem",
    fontWeight: 500,
  },
  carouselWrap: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    aspectRatio: "4 / 3",
  },
  slide: {
    position: "absolute",
    inset: 0,
    transition: "opacity 0.65s ease",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 0,
    display: "block",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.875rem",
  },
  dots: {
    display: "flex",
    gap: "0.375rem",
    alignItems: "center",
  },
  dotBtn: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--color-border-strong)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, transform 0.2s",
    flexShrink: 0,
  },
  dotBtnActive: {
    background: "var(--color-accent)",
    transform: "scale(1.35)",
  },
  navRow: {
    display: "flex",
    gap: "0.4rem",
  },
  navBtn: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--color-text-muted)",
    fontSize: "0.8rem",
    transition: "border-color 0.15s, color 0.15s",
    flexShrink: 0,
    lineHeight: 1,
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--color-border)",
    margin: "2rem 0 0",
  },
};

export default function Gallery() {
  const ref = useRef();
  const timerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % PHOTO_URLS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + PHOTO_URLS.length) % PHOTO_URLS.length);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL_MS);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [next]);

  useEffect(() => {
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

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (i) => { setCurrent(i); resetTimer(); };

  return (
    <section id="gallery" ref={ref} style={styles.section}>
      <p style={styles.sectionLabel}>Gallery</p>

      <div style={styles.carouselWrap}>
        {PHOTO_URLS.map((url, i) => (
          <div
            key={i}
            style={{
              ...styles.slide,
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <img
              src={url}
              alt={`Gallery photo ${i + 1}`}
              style={styles.image}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div style={styles.controls}>
        <div style={styles.dots}>
          {PHOTO_URLS.map((_, i) => (
            <button
              key={i}
              style={{ ...styles.dotBtn, ...(i === current ? styles.dotBtnActive : {}) }}
              onClick={() => handleDot(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>

        <div style={styles.navRow}>
          <button
            style={styles.navBtn}
            onClick={handlePrev}
            aria-label="Previous photo"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            ←
          </button>
          <button
            style={styles.navBtn}
            onClick={handleNext}
            aria-label="Next photo"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            →
          </button>
        </div>
      </div>

      <hr style={styles.divider} />
    </section>
  );
}
