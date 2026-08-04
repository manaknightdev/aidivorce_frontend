const INITIAL_CONTENT = {
  terms: {
    modalTitle: 'Terms & Agreement',
    points: [
      'Confidential and secure consultation',
      'Personalized guidance for your situation',
      'Educational information, not legal advice',
    ],
    acceptanceText:
      'I accept the Terms of Service and understand that this service provides general guidance and educational information only, not professional legal advice.',
    actionButtonText: 'Start Your Free Consultation',
    previewCaption: '1 message included in your free session.',
  },
  chat: {
    welcomeText:
      "Welcome to your Free Consultation! I'm here to guide you through your divorce process. Please share your Question or Topic in up to 250 words. The more specific you are, the more accurate my response will be.",
    videoFileName: 'coach-intro-video.mp4',
    videoTitle: 'Welcome video - Guidelines for your consultation.',
    videoUrl: '',
    responseTimeMain:
      "Coach Sam will get back to you as he's online— always within 14 hours.",
    responseTimeSub: 'Thanks for your patience!',
    categories: ['Parenting', 'Finance', 'Property', 'Legal'],
    composerPlaceholder: 'Type your question (up to 250 words)...',
  },
  feedback: {
    title: 'Enjoying Your Free Consultation?',
    body: "You've reached your free question(s) limit. Share your feedback by leaving a quick review, and we'll gift you 1 more question — absolutely free!",
    rewardMessages: 1,
    rateLabel: 'Rate your experience:',
    placeholder: 'Tell us about your experience...',
    submitText: 'Submit Review & Unlock Question',
    dismissText: 'Maybe Later',
  },
  intake: {
    formTitle: 'Pre Assessment Form',
    formDescription:
      'Help us prepare for your coaching session. This takes about 3 minutes.',
    sections: [
      {
        id: 'sec-personal',
        title: 'Personal Information',
        fields: [
          {
            id: 'f-fullname',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Jane Doe',
            helpText: '',
            required: true,
            conditional: false,
          },
          {
            id: 'f-email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'jane@email.com',
            helpText: '',
            required: true,
            conditional: false,
          },
          {
            id: 'f-age',
            type: 'dropdown',
            label: 'Age Range',
            placeholder: 'Select age range',
            helpText: '',
            required: false,
            conditional: false,
            options: ['18–24', '25–34', '35–44', '45–54', '55+'],
          },
        ],
      },
      {
        id: 'sec-relationship',
        title: 'Relationship Status',
        fields: [
          {
            id: 'f-status',
            type: 'radio',
            label: 'Current Marital Status',
            placeholder: '',
            helpText: '',
            required: true,
            conditional: false,
            options: [
              'Separated',
              'Divorced',
              'Considering separation',
              'Married / living together',
            ],
          },
          {
            id: 'f-length',
            type: 'number',
            label: 'Length of Marriage',
            placeholder: 'Years',
            helpText: '',
            required: false,
            conditional: false,
          },
        ],
      },
      {
        id: 'sec-children',
        title: 'Children Information',
        fields: [
          {
            id: 'f-has-children',
            type: 'radio',
            label: 'Do you have children?',
            placeholder: '',
            helpText: '',
            required: true,
            conditional: false,
            options: ['Yes', 'No'],
          },
          {
            id: 'f-num-children',
            type: 'number',
            label: 'Number of Children',
            placeholder: '0',
            helpText: "Shows if 'Yes'",
            required: false,
            conditional: true,
          },
        ],
      },
    ],
  },
  assessment: {
    paginationMode: 'one',
    questionsPerPage: 1,
    questions: [
      {
        id: 'q-marital',
        type: 'radio',
        text: 'What is your current marital status?',
        options: [
          'Married, considering divorce',
          'Separated',
          'In the process of divorce',
        ],
      },
      {
        id: 'q-concerns',
        type: 'checkbox',
        text: 'What are your primary concerns? (Select all that apply)',
        options: ['Child Custody', 'Financial Division'],
      },
      {
        id: 'q-situation',
        type: 'long',
        text: 'Briefly describe your situation:',
        options: [],
      },
    ],
  },
  tools: {
    heading: 'Tools & Checklists',
    instructionsTitle: 'How to Use These Tools',
    instructions: [
      'Each link opens a Google Sheet with detailed checklists and calculators',
      'Make a copy to your Google Drive to edit and customize for your situation',
      'Use these tools alongside your consultations with Coach Sam',
    ],
    items: [
      {
        id: 't1',
        title: 'Document checklist',
        description: 'IDs, financial statements, parenting schedules',
        link: 'https://docs.google.com/spreadsheets/',
        enabled: true,
      },
      {
        id: 't2',
        title: 'Separation timeline planner',
        description: 'Key dates and milestones for your case',
        link: 'https://docs.google.com/spreadsheets/',
        enabled: true,
      },
      {
        id: 't3',
        title: 'Budget starter worksheet',
        description: 'Income, expenses, and support estimates',
        link: 'https://docs.google.com/spreadsheets/',
        enabled: true,
      },
    ],
  },
}

function cloneContent() {
  return structuredClone(INITIAL_CONTENT)
}

let content = cloneContent()
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn())
}

export function getAdminContent() {
  return content
}

/** Merge saved content with defaults so builder tabs always have expected shape. */
export function normalizeAdminContent(raw) {
  const base = cloneContent()
  if (!raw || typeof raw !== 'object') return base
  return {
    ...base,
    ...raw,
    terms: { ...base.terms, ...(raw.terms || {}) },
    chat: { ...base.chat, ...(raw.chat || {}) },
    feedback: { ...base.feedback, ...(raw.feedback || {}) },
    intake: {
      ...base.intake,
      ...(raw.intake || {}),
      sections:
        raw.intake?.sections?.length > 0
          ? raw.intake.sections
          : base.intake.sections,
    },
    assessment: {
      ...base.assessment,
      ...(raw.assessment || {}),
      questions:
        raw.assessment?.questions?.length > 0 &&
        raw.assessment.questions[0]?.text !== undefined
          ? raw.assessment.questions
          : base.assessment.questions,
    },
    tools: {
      ...base.tools,
      ...(raw.tools || {}),
      instructions:
        raw.tools?.instructions?.length > 0
          ? raw.tools.instructions
          : base.tools.instructions,
      items: (raw.tools?.items?.length ? raw.tools.items : base.tools.items).map(
        (item, i) => ({
          ...base.tools.items[i % base.tools.items.length],
          ...item,
          link: item.link ?? '',
        }),
      ),
    },
  }
}

export function subscribeAdminContent(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setAdminContent(next) {
  content = structuredClone(next)
  emit()
  return content
}

export function updateAdminContentSection(sectionId, patch) {
  content = {
    ...content,
    [sectionId]: { ...content[sectionId], ...patch },
  }
  emit()
  return content
}

export function resetAdminContent() {
  content = cloneContent()
  emit()
  return content
}

export const CONTENT_TABS = [
  { id: 'terms', label: 'Terms and Conditions' },
  { id: 'chat', label: 'Chat Screen' },
  { id: 'feedback', label: 'Feedback Modal' },
  { id: 'intake', label: 'Session intake' },
  { id: 'assessment', label: 'Free Assessment Form' },
  { id: 'tools', label: 'Tools and Checklists' },
]
