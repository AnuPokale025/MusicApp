// Footer.jsx — Spotify-style footer with React + Tailwind CSS

const LINKS = {
  Company: ['About', 'Jobs', 'For the Record'],
  Communities: ['For Artists', 'Developers', 'Advertising', 'Investors', 'Vendors'],
  'Useful Links': ['Support', 'Free Mobile App', 'Premium Plans', 'Gift Cards'],
}

const LEGAL = [
  'Legal',
  'Safety & Privacy Center',
  'Privacy Policy',
  'Cookies',
  'About Ads',
  'Accessibility',
]

// ── Social icons as inline SVGs (no extra deps) ─────────────────────────────

function IconInstagram() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function SpotifyLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill="#1DB954"
        d="M248 8C111.1 8 8 111.1 8 248s103.1 240 240 240 240-103.1 240-240S384.9 8 248 8zm110.7 348.2c-4.3 7-13.5 9.2-20.5 4.9-56.3-34.4-127.1-42.1-210.6-23-8.1 1.9-16.1-3.1-18-11.2-1.9-8.1 3-16.1 11.1-18 91.3-20.8 169.7-11.8 233.1 26.5 7 4.3 9.2 13.5 4.9 20.8zm29.5-65.7c-5.4 8.7-16.9 11.5-25.7 6.1-64.4-39.6-162.5-51-238.5-27.9-9.9 3-20.3-2.5-23.3-12.3-3-9.9 2.5-20.3 12.4-23.3 86.9-26.4 194.8-13.6 268.5 32.1 8.8 5.5 11.6 17 6.6 25.3zm2.5-68.1c-77-45.7-204-49.9-277.5-27.6-11.8 3.6-24.3-3.1-27.9-14.9-3.6-11.8 3-24.3 14.9-27.9 84.5-25.7 224.7-20.7 313.2 32 10.6 6.3 14.1 20 7.8 30.6-6.4 10.5-20.2 14.1-30.5 7.8z"
      />
    </svg>
  )
}

// ── Social button ────────────────────────────────────────────────────────────

function SocialBtn({ icon, label, href = '#' }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828] text-[#b3b3b3] transition hover:bg-[#1DB954] hover:text-white hover:scale-105 active:scale-95"
    >
      {icon}
    </a>
  )
}

// ── Link column ──────────────────────────────────────────────────────────────

function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map(link => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-[#b3b3b3] transition hover:text-white hover:underline underline-offset-2"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#121212] text-white">

      {/* ── Premium CTA banner ── */}
      <div className="border-b border-white/[0.08] bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center lg:px-12">
          <div>
            <p className="text-base font-bold text-white">Preview of MusicApp</p>
            <p className="text-sm text-[#b3b3b3]">
              Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
            </p>
          </div>
          <a
            href="/register"
            className="flex-shrink-0 rounded-full border-2 border-white px-7 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-white hover:text-black active:scale-95"
          >
            Sign up free
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand + socials */}
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:col-span-1">
            <a href="#" aria-label="Spotify" className="flex items-center gap-2 no-underline w-fit">
              {/* <SpotifyLogo /> */}
              <span className="text-xl font-black tracking-tight text-white">Music</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-[#b3b3b3]">
              Music for everyone. Millions of songs, podcasts, and audiobooks — free and premium.
            </p>
            <div className="flex items-center gap-3">
              <SocialBtn icon={<IconInstagram />} label="Instagram" />
              <SocialBtn icon={<IconTwitter />}   label="Twitter / X" />
              <SocialBtn icon={<IconFacebook />}  label="Facebook" />
              <SocialBtn icon={<IconYoutube />}   label="YouTube" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <LinkColumn key={title} title={title} links={links} />
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="my-10 border-t border-white/[0.08]" />

        {/* ── Bottom row ── */}
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

          {/* Legal links */}
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL.map(item => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#b3b3b3] transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Country + copyright */}
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {/* Country selector pill */}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              {/* Globe icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              India
            </a>
            <p className="text-xs text-[#6a6a6a]">
              &copy; {year} Music AB
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}