// =============================================================================
// SKIP TO CONTENT - accessible skip-link, appears on keyboard focus
// =============================================================================

export default function SkipToContent() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const main = document.getElementById('main-content')
    if (main) {
      main.scrollIntoView({ behavior: 'smooth' })
      main.setAttribute('tabindex', '-1')
      main.focus()
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="skip-to-content"
      style={{
        position: 'fixed',
        top: '-100%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: '#000',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '9999px',
        fontWeight: 500,
        fontSize: '0.875rem',
        textDecoration: 'none',
        transition: 'top 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '24px'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100%'
      }}
    >
      Skip to main content
    </a>
  )
}
