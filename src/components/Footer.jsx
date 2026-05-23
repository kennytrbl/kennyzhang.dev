const styles = {
  footer: {
    borderTop: "1px solid var(--color-border)",
    padding: "1.5rem var(--gap)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
    maxWidth: "var(--max-w)",
    margin: "0 auto",
  },
  text: {
    fontSize: "0.78rem",
    color: "var(--color-text-faint)",
    fontWeight: 300,
  },
  link: {
    fontSize: "0.78rem",
    color: "var(--color-text-faint)",
    textDecoration: "none",
    transition: "color 0.15s",
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <span style={styles.text}>© {new Date().getFullYear()} Kenny Zhang</span>
      <a
        href="https://drive.google.com/file/d/1br1CkeR1LAKvVavwHvzdjrBExILcaOPs/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
        style={styles.link}
        onMouseEnter={(e) => (e.target.style.color = "var(--color-text)")}
        onMouseLeave={(e) => (e.target.style.color = "var(--color-text-faint)")}
      >
        Résumé ↗
      </a>
    </footer>
  );
}
