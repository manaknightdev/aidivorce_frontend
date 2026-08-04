export const REPORT_META = {
  title: 'Full Case Report',
  preparedFor: 'Prepared for you',
  generatedOn: 'March 18, 2024',
  latestLabel: 'Latest: March 16, 2024',
  lastUpdated: 'March 16, 2024',
  reportsSaved: 7,
  fileName: 'Sam-Full-Case-Report.pdf',
}

export const REPORT_SECTIONS = [
  'Parenting',
  'Finance',
  'Property & Assets',
  'Legal',
  'General / Not Sure',
]

export const REPORT_SOURCES = [
  '12 User Notes',
  '8 Interactive Case Responses',
  '3 Coaching Conversations',
]

export const REPORT_OVERVIEW = [
  'Your case currently centers on parenting schedule reliability, with finance and documentation work underway. Coaching guidance points toward clearer written agreements and organized supporting documents.',
  'This overview updates as you add notes, answer guided questions, and complete coaching sessions.',
]

export const REPORT_TIMELINE = [
  {
    date: 'March 19',
    entries: [
      {
        id: 't1',
        kind: 'note',
        label: 'Practice Note',
        text: 'Documented a missed pickup and follow-up message sent the same evening.',
      },
      {
        id: 't2',
        kind: 'interactive',
        label: 'Interactive Question',
        question: 'Was this the first time this happened?',
        response:
          'No — similar schedule changes happened twice in the past month without notice.',
      },
    ],
  },
  {
    date: 'March 17',
    entries: [
      {
        id: 't3',
        kind: 'coach',
        label: 'Coach Question',
        question: 'What outcome are you hoping for with parenting time?',
        response:
          'A predictable weekly schedule with written notice requirements for any changes.',
      },
    ],
  },
  {
    date: 'March 15',
    entries: [
      {
        id: 't4',
        kind: 'note',
        label: 'Practice Note',
        text: 'Initial assessment completed and parenting concerns captured in the case file.',
      },
    ],
  },
]

export const REPORT_OBSERVATIONS = [
  'Parenting schedule reliability is the most urgent friction point.',
  'Finance documentation is underway and will support clearer support estimates.',
  'Coach conversations reinforce a written-communication approach for exchanges.',
]

export const REPORT_NEXT_STEPS = [
  'Confirm a written parenting schedule with notice rules for changes.',
  'Gather the last 3 months of income documents.',
  'List major assets and approximate values.',
  'Save coach recommendations into your case timeline.',
  'Preview and export this report before your next session.',
  'Book a follow-up if custody enforcement becomes urgent.',
]

export const REPORT_DISCLAIMER =
  'This report is for guidance and organization only. It does not constitute legal advice.'

export const LATEST_REPORT_CARD = {
  id: 'r1',
  date: 'Saturday, March 16',
  meta: '2:45 PM · 4.1 MB',
  summary:
    'Updated parenting schedule, added new finance notes and coaching responses from latest session.',
}
