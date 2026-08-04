import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Info,
  Scale,
  Shield,
  Zap,
} from 'lucide-react'
import AuthLayout, { AuthTimeline } from '../components/AuthLayout'
import BrandLogo from '../components/BrandLogo'
import { countries, provinces } from '../data/locations'
import familyBg from '../assets/onboard-family.png'

const leftItems = [
  {
    icon: Scale,
    title: 'Localized Divorce Guidance',
    text: "Get advice tailored to your province or state's specific divorce laws and procedures.",
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    text: 'Your location data is secure and only used for providing relevant legal information.',
  },
  {
    icon: Zap,
    title: 'Quick One-Time Setup',
    text: 'Set once and all future consultations will be location-appropriate automatically.',
  },
]

export default function Location() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('CA')
  const [region, setRegion] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [error, setError] = useState('')

  const selectedCountry = countries.find((c) => c.code === country)
  const regionOptions = useMemo(() => provinces[country] || [], [country])
  const regionLabel = country === 'CA' ? 'Province' : 'State'
  const regionPlaceholder =
    country === 'CA' ? 'Select Province' : 'Select State'

  function handleCountryChange(code) {
    setCountry(code)
    setRegion('')
    setCountryOpen(false)
    setError('')
  }

  function handleContinue(e) {
    e.preventDefault()
    if (!region) {
      setError(`Please select your ${regionLabel.toLowerCase()}.`)
      return
    }
    navigate('/assessment')
  }

  return (
    <AuthLayout
      background={familyBg}
      imageClass="opacity-40 brightness-[1.05] contrast-[0.95] object-[center_30%]"
      title="Guidance Where You Live"
      subtitle="Family law differs by region. Tell us where you are so we can give accurate, local support."
      form={
        <>
          <div className="text-center">
            <div className="mx-auto flex justify-center">
              <BrandLogo size={72} to={null} />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              Select Your Province or State
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              To provide accurate guidance based on the family laws and resources
              where you reside.
            </p>
          </div>

          <form onSubmit={handleContinue} className="mt-8 space-y-4 text-left">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-500">
                Country
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCountryOpen((v) => !v)
                    setRegionOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-900 transition-all duration-200 hover:border-slate-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base leading-none">
                      {selectedCountry?.flag}
                    </span>
                    {selectedCountry?.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      countryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {countryOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                    >
                      {countries.map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => handleCountryChange(c.code)}
                            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-brand-50 ${
                              c.code === country
                                ? 'font-semibold text-brand-600'
                                : 'text-slate-700'
                            }`}
                          >
                            <span>{c.flag}</span>
                            {c.name}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-500">
                {regionLabel}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setRegionOpen((v) => !v)
                    setCountryOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm transition-all duration-200 hover:border-slate-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none"
                >
                  <span className={region ? 'text-slate-900' : 'text-slate-400'}>
                    {region || regionPlaceholder}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      regionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {regionOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                    >
                      {regionOptions.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            onClick={() => {
                              setRegion(r)
                              setRegionOpen(false)
                              setError('')
                            }}
                            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-brand-50 ${
                              r === region
                                ? 'font-semibold text-brand-600'
                                : 'text-slate-700'
                            }`}
                          >
                            {r}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-xs leading-relaxed text-slate-600">
                Your location is only used to match responses to your
                region&apos;s family law. It will never be shared.
              </p>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 active:translate-y-0"
            >
              Continue →
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need help selecting your location?{' '}
            <a
              href="#"
              className="font-semibold text-brand-500 underline underline-offset-2 transition-colors hover:text-brand-600"
            >
              Contact Support
            </a>
          </p>

          <p className="mt-4 text-center text-xs text-slate-400">
            <Link to="/signup" className="hover:text-brand-500">
              ← Back to account details
            </Link>
          </p>
        </>
      }
    >
      <AuthTimeline items={leftItems} />
    </AuthLayout>
  )
}
