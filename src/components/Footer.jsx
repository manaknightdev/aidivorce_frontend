import BrandLogo from './BrandLogo'

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  )
}

const columns = [
  {
    heading: 'Product',
    links: ['How It Works', 'Features', 'Pricing', 'Reviews'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Contact', 'Blog', 'FAQ'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <BrandLogo
              size={44}
              withText
              textClassName="text-base text-white"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Clear, calm, and confidential support for every step of your
              divorce — powered by AI, guided by experts.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-brand-400"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
            <form
              className="mt-4 flex overflow-hidden rounded-lg bg-slate-800/80"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-brand-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Join
              </button>
            </form>

            <h4 className="mt-6 text-sm font-semibold text-white">Follow Us</h4>
            <div className="mt-3 flex gap-2.5">
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800/80 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Sam. All rights reserved.</p>
          <p>
            Not a law firm. We do not provide legal advice.{' '}
            <a href="#" className="underline transition-colors hover:text-brand-400">
              Privacy
            </a>{' '}
            ·{' '}
            <a href="#" className="underline transition-colors hover:text-brand-400">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
