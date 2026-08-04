import InfoPageShell from '../components/InfoPageShell'

const sections = [
  {
    title: '1. Who we are',
    body: [
      'Sam (“we”, “us”) provides AI-assisted divorce organization tools and optional coaching sessions. Sam is not a law firm and does not provide legal advice, legal representation, or financial advice that replaces a licensed professional.',
    ],
  },
  {
    title: '2. Your account',
    body: [
      'You are responsible for keeping your login credentials secure and for activity under your account. Provide accurate information so guidance and coaching sessions can be tailored to your location and situation.',
      'You may request account deletion by contacting support. Some records may be retained where required for billing, security, or legal obligations.',
    ],
  },
  {
    title: '3. Information you share',
    body: [
      'Case notes, assessment answers, documents, and coaching messages are used to power your dashboard, reports, and sessions. We treat this information as confidential and do not sell your personal data.',
      'By using Sam, you consent to storing and processing this information to deliver the service. You can update notification preferences in Settings.',
    ],
  },
  {
    title: '4. How we use AI',
    body: [
      'Sam uses AI to organize information, suggest next steps, and draft overviews. AI outputs can be incomplete or incorrect. Always verify important decisions with a qualified professional in your province or state.',
      'Coach sessions with Coach Sam or other professionals are separate from automated AI responses and may be summarized into your case file with your consent.',
    ],
  },
  {
    title: '5. Subscriptions & payments',
    body: [
      'Memberships renew automatically until cancelled. Cancel anytime; access continues through the end of the current billing period. One-time professional services are billed separately and may require a screening assessment.',
      'Free trial features may be limited. Pricing shown in Settings is in CAD unless otherwise noted.',
    ],
  },
  {
    title: '6. Acceptable use',
    body: [
      'Do not misuse Sam, attempt to access another user’s data, upload unlawful content, or use the platform to harass others. We may suspend accounts that violate these terms.',
    ],
  },
  {
    title: '7. Privacy practices',
    body: [
      'We collect account details (name, email, location), usage data, and content you enter. We use cookies or similar technology for authentication and product improvement.',
      'We may share data with processors who help us run the product (hosting, email, payments) under confidentiality obligations. We may disclose information if required by law.',
    ],
  },
  {
    title: '8. Disclaimer',
    body: [
      'Sam is for guidance and organization only. It does not create an attorney–client relationship. Outcomes depend on your circumstances and applicable law. Use of Sam is at your own risk to the fullest extent permitted by law.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      'Questions about these Terms & Privacy practices: support@sam.ai. We may update this page from time to time; continued use means you accept the revised terms.',
    ],
  },
]

export default function TermsPrivacy() {
  return (
    <InfoPageShell
      title="Terms & Privacy"
      subtitle="How Sam works, what we collect, and the limits of our guidance. Last updated March 2026."
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-sm leading-relaxed text-slate-600">
          By creating an account or using Sam, you agree to these terms and our
          privacy practices below. If you do not agree, please do not use the
          service.
        </p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-bold text-slate-900">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-relaxed text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </InfoPageShell>
  )
}
