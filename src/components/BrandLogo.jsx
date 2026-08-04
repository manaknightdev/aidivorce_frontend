import { Link } from 'react-router-dom'
import samLogo from '../assets/SamAI.png'

/**
 * @param {{ size?: number, withText?: boolean, to?: string | null, className?: string, textClassName?: string, alt?: string }} props
 */
export default function BrandLogo({
  size = 40,
  withText = false,
  to = '/',
  className = '',
  textClassName = 'text-lg font-bold text-slate-900',
  alt = 'Sam — Your Divorce Expert',
}) {
  const mark = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={samLogo}
        alt={alt}
        width={size}
        height={size}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span
          className={`font-script text-lg font-[700] leading-none tracking-normal text-slate-900 [text-shadow:0_0_0.6px_currentColor] ${textClassName}`}
        >
          Sam
        </span>
      )}
    </span>
  )

  if (!to) return mark

  return (
    <Link to={to} className="inline-flex w-fit items-center">
      {mark}
    </Link>
  )
}
