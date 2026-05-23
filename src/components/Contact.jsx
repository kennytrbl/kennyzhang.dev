import { useEffect, useRef, useState, useCallback } from "react";

const RATE_LIMIT_MS = 60_000;
const STORAGE_KEY = "contact_last_submit";

const styles = {
  section: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "clamp(2rem, 6vw, 4rem) var(--gap) clamp(3rem, 8vw, 6rem)",
    opacity: 0,
    transform: "translateY(16px)",
    transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--color-text-faint)",
    marginBottom: "1rem",
    fontWeight: 500,
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
    fontWeight: 500,
    marginBottom: "0.75rem",
    letterSpacing: "-0.02em",
  },
  sub: {
    fontSize: "0.95rem",
    color: "var(--color-text-muted)",
    marginBottom: "2rem",
    fontWeight: 300,
    lineHeight: 1.7,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    marginBottom: "2.5rem",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.85rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.15s",
  },
  textarea: {
    width: "100%",
    padding: "0.65rem 0.85rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
    transition: "border-color 0.15s",
  },
  btn: {
    alignSelf: "flex-start",
    background: "var(--color-text)",
    color: "var(--color-bg)",
    border: "none",
    padding: "0.65rem 1.4rem",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 400,
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "opacity 0.15s",
  },
  linksRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.5rem 0.85rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    color: "var(--color-text-muted)",
    fontSize: "0.825rem",
    fontWeight: 400,
    background: "var(--color-surface)",
    transition: "border-color 0.15s, color 0.15s",
  },
};

const socials = [
  {
    label: "Email",
    href: "mailto:kennyzhang418@gmail.com?subject=Professional%20Inquiry",
  },
  { label: "GitHub", href: "https://github.com/kennytrbl" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kennyzhang5/" },
  { label: "Twitter", href: "https://twitter.com/_kennyzhang" },
];

export default function Contact() {
  const ref = useRef();
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(() => {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return 0;
    const remaining = Math.ceil(
      (RATE_LIMIT_MS - (Date.now() - Number(last))) / 1000,
    );
    return remaining > 0 ? remaining : 0;
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(
      () => setCooldown((c) => (c <= 1 ? 0 : c - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [cooldown]);

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

  const focusStyle = (e) =>
    (e.target.style.borderColor = "var(--color-accent)");
  const blurStyle = (e) => (e.target.style.borderColor = "var(--color-border)");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (submitting || cooldown > 0) return;
      setSubmitting(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(formRef.current),
        });
        if (res.ok) {
          setSent(true);
          localStorage.setItem(STORAGE_KEY, Date.now().toString());
          setCooldown(Math.ceil(RATE_LIMIT_MS / 1000));
          formRef.current?.reset();
        } else {
          alert("Failed to send. Please try again.");
        }
      } catch {
        alert("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, cooldown],
  );

  const btnDisabled = submitting || cooldown > 0;
  const btnLabel = submitting
    ? "Sending…"
    : cooldown > 0
      ? `Wait ${cooldown}s`
      : "Send message";

  return (
    <section id="contact" ref={ref} style={styles.section}>
      <p style={styles.sectionLabel}>Contact</p>
      <h2 style={styles.heading}>Let's talk.</h2>
      <p style={styles.sub}>
        Open to software engineering opportunities, collaborations, and
        conversations about community tech. Reach out — I read every message.
      </p>

      {sent ? (
        <p
          style={{
            color: "var(--color-accent)",
            fontSize: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          Thanks — I'll be in touch soon.
        </p>
      ) : (
        <form ref={formRef} style={styles.form} onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="access_key"
            value={import.meta.env.VITE_WEB3FORM_KEY}
          />
          <div style={styles.row}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              style={styles.input}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              style={styles.input}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            required
            style={styles.textarea}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <button
            type="submit"
            style={{
              ...styles.btn,
              opacity: btnDisabled ? 0.5 : 1,
              cursor: btnDisabled ? "not-allowed" : "pointer",
            }}
            disabled={btnDisabled}
            onMouseEnter={(e) => {
              if (!btnDisabled) e.target.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              if (!btnDisabled) e.target.style.opacity = "1";
            }}
          >
            {btnLabel}
          </button>
        </form>
      )}

      <div style={styles.linksRow}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
