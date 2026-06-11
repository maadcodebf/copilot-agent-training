import { useNavigate } from 'react-router-dom';
import { logout, getToken, decodeToken } from '../services/auth';

const certifications = [
  {
    exam: 'AI-901',
    title: 'Azure AI Fundamentals',
    level: 'Principiante',
    description: 'Demuestra conceptos fundamentales de IA relacionados con el desarrollo de soluciones en Azure. Actualizado en abril de 2026 con nuevos objetivos de habilidades.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/',
    accentColor: 'var(--color-accent-blue)',
  },
  {
    exam: 'AZ-900',
    title: 'Azure Fundamentals',
    level: 'Principiante',
    description: 'Valida el conocimiento básico sobre servicios en la nube y cómo se proporcionan con Azure. Ideal para quienes comienzan su carrera en la nube.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
    accentColor: 'var(--color-accent-green)',
  },
  {
    exam: 'AZ-104',
    title: 'Azure Administrator Associate',
    level: 'Intermedio',
    description: 'Certifica habilidades para implementar, administrar y monitorear la infraestructura de Microsoft Azure, incluyendo redes, almacenamiento y seguridad.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/',
    accentColor: 'var(--color-accent-orange)',
  },
  {
    exam: 'AZ-204',
    title: 'Azure Developer Associate',
    level: 'Intermedio',
    description: 'Diseña, construye, prueba y mantiene aplicaciones y servicios en la nube en Microsoft Azure. Validación de habilidades para desarrolladores de soluciones.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-developer/',
    accentColor: 'var(--color-accent-orange)',
  },
  {
    exam: 'AI-102',
    title: 'Azure AI Engineer Associate',
    level: 'Intermedio',
    description: 'Diseña e implementa soluciones de IA usando Azure Cognitive Services, Machine Learning y Knowledge Mining para resolver problemas empresariales complejos.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/',
    accentColor: 'var(--color-accent-blue)',
  },
  {
    exam: 'AB-730',
    title: 'AI Business Professional',
    level: 'Principiante',
    description: 'Certifica el uso de herramientas de productividad con IA generativa, incluyendo Microsoft 365 Copilot, Researcher y Analyst para mejorar el trabajo diario.',
    url: 'https://learn.microsoft.com/credentials/certifications/ai-business-professional/',
    accentColor: 'var(--color-accent-green)',
  },
];

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '64px',
    backgroundColor: 'var(--color-canvas)',
    borderBottom: '1px solid var(--color-hairline)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-xxl)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navLogo: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    letterSpacing: '-0.3px',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  },
  navUser: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    fontWeight: 500,
  },
  logoutButton: {
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-md)',
    padding: '8px 16px',
    height: '36px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--spacing-section) var(--spacing-xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '500px',
    background: 'radial-gradient(ellipse at top, var(--color-accent-orange-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-body)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-full)',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 400,
    marginBottom: 'var(--spacing-xl)',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: 'var(--rounded-full)',
    backgroundColor: 'var(--color-accent-green)',
    flexShrink: 0,
  },
  heading: {
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-1.5px',
    color: 'var(--color-ink)',
    marginBottom: 'var(--spacing-xl)',
  },
  headingSpan: {
    color: 'var(--color-primary)',
  },
  description: {
    fontSize: '18px',
    fontWeight: 400,
    color: 'var(--color-body)',
    lineHeight: 1.5,
    marginBottom: 'var(--spacing-xxxl)',
  },
  card: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-charcoal)',
    marginBottom: 'var(--spacing-md)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardValue: {
    fontSize: '14px',
    color: 'var(--color-body)',
    fontFamily: '"Geist Mono", "Fira Code", monospace',
    wordBreak: 'break-all',
    lineHeight: 1.6,
  },
  certificationsSection: {
    width: '100%',
    maxWidth: '1100px',
    marginTop: 'var(--spacing-section)',
    position: 'relative',
    zIndex: 1,
  },
  certificationsHeading: {
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '-0.4px',
    color: 'var(--color-ink)',
    marginBottom: 'var(--spacing-md)',
    textAlign: 'center',
  },
  certificationsSubtitle: {
    fontSize: '16px',
    color: 'var(--color-body)',
    marginBottom: 'var(--spacing-xxxl)',
    textAlign: 'center',
  },
  certificationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--spacing-xl)',
  },
  certCard: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  },
  certCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  certCardExam: {
    fontSize: '12px',
    color: 'var(--color-mute)',
    fontFamily: '"Geist Mono", "Fira Code", monospace',
    letterSpacing: '0.05em',
  },
  certCardLevel: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '11px',
    color: 'var(--color-charcoal)',
    backgroundColor: 'var(--color-surface-elevated)',
    borderRadius: 'var(--rounded-full)',
    padding: '2px 10px',
    border: '1px solid var(--color-hairline)',
  },
  certCardTitle: {
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '-0.3px',
    color: 'var(--color-ink)',
  },
  certCardDescription: {
    fontSize: '14px',
    color: 'var(--color-body)',
    lineHeight: 1.6,
    flex: 1,
  },
  certCardLink: {
    fontSize: '13px',
    fontWeight: 500,
    marginTop: 'var(--spacing-sm)',
  },
};

export default function Welcome() {
  const navigate = useNavigate();

  const token = getToken();
  const payload = token ? decodeToken(token) : null;
  const username = payload?.sub || 'usuario';
  const expiresAt = payload?.exp
    ? new Date(payload.exp * 1000).toLocaleTimeString()
    : '—';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navLogo}>JWT Auth App</span>
        <div style={styles.navActions}>
          <span style={styles.navUser}>{username}</span>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.glow} aria-hidden="true" />
        <div style={styles.content}>
          <div style={styles.badge}>
            <span style={styles.statusDot} aria-hidden="true" />
            Sesión activa
          </div>

          <h1 style={styles.heading}>
            ¡Bienvenido,{' '}
            <span style={styles.headingSpan}>{username}</span>!
          </h1>

          <p style={styles.description}>
            Has iniciado sesión correctamente. Tu token JWT está almacenado en la sesión del navegador.
          </p>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Token expira a las</p>
            <p style={styles.cardValue}>{expiresAt}</p>
          </div>
        </div>

        <section style={styles.certificationsSection}>
          <h2 style={styles.certificationsHeading}>Certificaciones Microsoft 2026</h2>
          <p style={styles.certificationsSubtitle}>
            Explora las certificaciones más relevantes de Microsoft para impulsar tu carrera en la nube e IA.
          </p>
          <div style={styles.certificationsGrid}>
            {certifications.map((cert) => (
              <div key={cert.exam} style={styles.certCard}>
                <div style={styles.certCardHeader}>
                  <span style={styles.certCardExam}>{cert.exam}</span>
                  <span style={styles.certCardLevel}>{cert.level}</span>
                </div>
                <p style={styles.certCardTitle}>{cert.title}</p>
                <p style={styles.certCardDescription}>{cert.description}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.certCardLink, color: cert.accentColor }}
                >
                  Ver certificación →
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
