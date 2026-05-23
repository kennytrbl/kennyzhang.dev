import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "var(--color-bg)",
    borderBottom: "1px solid var(--color-border)",
    transition: "box-shadow 0.2s",
  },
  navScrolled: {
    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
  },
  inner: {
    maxWidth: "var(--max-w)",
    margin: "0 auto",
    padding: "0 var(--gap)",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--color-text)",
    textDecoration: "none",
    letterSpacing: "-0.02em",
  },
  links: {
    display: "flex",
    gap: "1.25rem",
    listStyle: "none",
  },
  link: {
    fontSize: "0.825rem",
    color: "var(--color-text-muted)",
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "color 0.15s",
  },
  burger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px",
  },
  burgerLine: {
    display: "block",
    width: "20px",
    height: "1.5px",
    background: "var(--color-text)",
    borderRadius: "1px",
    transition: "all 0.2s",
  },
  mobileMenu: {
    background: "var(--color-bg)",
    borderBottom: "1px solid var(--color-border)",
    padding: "0.5rem 0",
  },
  mobileLink: {
    display: "block",
    padding: "0.7rem var(--gap)",
    color: "var(--color-text-muted)",
    textDecoration: "none",
    fontSize: "0.9rem",
    borderBottom: "1px solid var(--color-border)",
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.inner}>
          <a href="#about" style={styles.logo}>Kenny Zhang</a>

          {!isMobile && (
            <ul style={styles.links}>
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={styles.link}
                    onMouseEnter={e => e.target.style.color = "var(--color-text)"}
                    onMouseLeave={e => e.target.style.color = "var(--color-text-muted)"}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {isMobile && (
            <button
              style={styles.burger}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span style={styles.burgerLine} />
              <span style={styles.burgerLine} />
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
