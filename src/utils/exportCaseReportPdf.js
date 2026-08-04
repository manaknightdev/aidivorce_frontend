import { jsPDF } from 'jspdf'
import {
  REPORT_META,
  REPORT_SECTIONS,
  REPORT_SOURCES,
  REPORT_OVERVIEW,
  REPORT_TIMELINE,
  REPORT_OBSERVATIONS,
  REPORT_NEXT_STEPS,
  REPORT_DISCLAIMER,
} from '../data/caseReport'

const BRAND = {
  primary: [139, 195, 74],
  dark: [15, 23, 42],
  muted: [100, 116, 139],
  line: [226, 232, 240],
  soft: [245, 250, 238],
  sky: [224, 242, 254],
  violet: [237, 233, 254],
  white: [255, 255, 255],
}

function kindColors(kind) {
  if (kind === 'interactive') return { chip: [14, 165, 233], soft: BRAND.sky }
  if (kind === 'coach') return { chip: [139, 92, 246], soft: BRAND.violet }
  return { chip: BRAND.primary, soft: BRAND.soft }
}

function ensureSpace(doc, y, needed, margin) {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + needed > pageHeight - margin) {
    doc.addPage()
    return margin
  }
  return y
}

function drawWrappedText(doc, text, x, y, maxWidth, lineHeight = 5.2) {
  const lines = doc.splitTextToSize(text, maxWidth)
  doc.text(lines, x, y)
  return y + lines.length * lineHeight
}

export function exportCaseReportPdf() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 16
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Header bar
  doc.setFillColor(...BRAND.primary)
  doc.rect(0, 0, pageWidth, 28, 'F')
  doc.setTextColor(...BRAND.white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Sam', margin, 12)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(REPORT_META.title, margin, 20)
  doc.setFontSize(9)
  doc.text(`Generated ${REPORT_META.generatedOn}`, pageWidth - margin, 20, {
    align: 'right',
  })

  y = 38
  doc.setTextColor(...BRAND.dark)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(`${REPORT_META.title} — ${REPORT_META.preparedFor}`, margin, y)

  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...BRAND.muted)
  y = drawWrappedText(
    doc,
    'This report combines your intake information, interactive responses, notes, and coaching conversations into one structured case view.',
    margin,
    y,
    contentWidth,
    5,
  )

  // Sections included
  y += 6
  y = ensureSpace(doc, y, 18, margin)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...BRAND.dark)
  doc.text('Includes Sections', margin, y)
  y += 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  let chipX = margin
  REPORT_SECTIONS.forEach((label) => {
    const w = doc.getTextWidth(label) + 6
    if (chipX + w > pageWidth - margin) {
      chipX = margin
      y += 8
    }
    doc.setFillColor(...BRAND.soft)
    doc.roundedRect(chipX, y - 3.5, w, 6, 1.5, 1.5, 'F')
    doc.setTextColor(...BRAND.dark)
    doc.text(label, chipX + 3, y)
    chipX += w + 3
  })
  y += 10

  // Sources
  y = ensureSpace(doc, y, 28, margin)
  doc.setFillColor(...BRAND.soft)
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...BRAND.dark)
  doc.text('Report Sources', margin + 4, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  let sourceY = y + 13
  REPORT_SOURCES.forEach((source) => {
    doc.setFillColor(...BRAND.primary)
    doc.circle(margin + 6, sourceY - 1.2, 1.1, 'F')
    doc.setTextColor(...BRAND.dark)
    doc.text(source, margin + 10, sourceY)
    sourceY += 5
  })
  y += 32

  // Overview
  y = ensureSpace(doc, y, 30, margin)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...BRAND.dark)
  doc.text('Case Overview', margin, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...BRAND.muted)
  REPORT_OVERVIEW.forEach((para) => {
    y = ensureSpace(doc, y, 14, margin)
    y = drawWrappedText(doc, para, margin, y, contentWidth, 5)
    y += 3
  })

  // Timeline
  y += 4
  y = ensureSpace(doc, y, 12, margin)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...BRAND.dark)
  doc.text('Case Timeline', margin, y)
  y += 10

  REPORT_TIMELINE.forEach((group) => {
    y = ensureSpace(doc, y, 16, margin)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...BRAND.primary)
    doc.text(group.date.toUpperCase(), margin, y)
    y += 6

    group.entries.forEach((entry) => {
      const colors = kindColors(entry.kind)
      const boxPad = 4
      const textWidth = contentWidth - boxPad * 2
      const nestedWidth = textWidth - 6

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)

      let contentHeight
      if (entry.kind === 'note') {
        const lines = doc.splitTextToSize(entry.text, textWidth)
        // chip(8) + gap + text + bottom pad
        contentHeight = 10 + lines.length * 4.8 + 4
      } else {
        const qLines = doc.splitTextToSize(entry.question, nestedWidth)
        const rLines = doc.splitTextToSize(entry.response, nestedWidth)
        // chip + labels + question + response + paddings
        contentHeight =
          10 + 6 + qLines.length * 4.8 + 8 + rLines.length * 4.8 + 8
      }

      y = ensureSpace(doc, y, contentHeight + 6, margin)
      const boxTop = y

      doc.setDrawColor(...BRAND.line)
      doc.setFillColor(...BRAND.white)
      doc.roundedRect(margin, boxTop, contentWidth, contentHeight, 2, 2, 'FD')

      // chip
      doc.setFillColor(...colors.chip)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      const chipW = doc.getTextWidth(entry.label) + 6
      doc.roundedRect(margin + boxPad, boxTop + 3, chipW, 5, 1.2, 1.2, 'F')
      doc.setTextColor(...BRAND.white)
      doc.text(entry.label, margin + boxPad + 3, boxTop + 6.5)

      let innerY = boxTop + 12

      if (entry.kind === 'note') {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...BRAND.dark)
        innerY = drawWrappedText(
          doc,
          entry.text,
          margin + boxPad,
          innerY,
          textWidth,
          4.8,
        )
      } else {
        const nestedTop = innerY - 1
        const nestedHeight = contentHeight - 14
        doc.setFillColor(...colors.soft)
        doc.roundedRect(
          margin + boxPad,
          nestedTop,
          textWidth,
          nestedHeight,
          1.5,
          1.5,
          'F',
        )

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(...BRAND.muted)
        doc.text(
          entry.kind === 'coach' ? 'COACH QUESTION' : 'QUESTION',
          margin + boxPad + 3,
          innerY + 3,
        )
        innerY += 7
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...BRAND.dark)
        innerY = drawWrappedText(
          doc,
          entry.question,
          margin + boxPad + 3,
          innerY,
          nestedWidth,
          4.8,
        )
        innerY += 4
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(...BRAND.muted)
        doc.text(
          entry.kind === 'coach' ? 'COACH RESPONSE' : 'RESPONSE',
          margin + boxPad + 3,
          innerY,
        )
        innerY += 5
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...BRAND.dark)
        innerY = drawWrappedText(
          doc,
          entry.response,
          margin + boxPad + 3,
          innerY,
          nestedWidth,
          4.8,
        )
      }

      // Advance past the box + room for the next date label's glyph ascent
      y = Math.max(boxTop + contentHeight, innerY) + 10
    })

    y += 2
  })

  // Observations
  y += 4
  y = ensureSpace(doc, y, 24, margin)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...BRAND.dark)
  doc.text('Observations', margin, y)
  y += 7
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  REPORT_OBSERVATIONS.forEach((item) => {
    y = ensureSpace(doc, y, 10, margin)
    doc.setFillColor(...BRAND.primary)
    doc.circle(margin + 2, y - 1.5, 1.2, 'F')
    doc.setTextColor(...BRAND.muted)
    y = drawWrappedText(doc, item, margin + 7, y, contentWidth - 7, 5)
    y += 3
  })

  // Next steps
  y += 4
  y = ensureSpace(doc, y, 24, margin)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...BRAND.dark)
  doc.text('Suggested Next Steps', margin, y)
  y += 7
  REPORT_NEXT_STEPS.forEach((item, index) => {
    y = ensureSpace(doc, y, 12, margin)
    doc.setFillColor(...BRAND.primary)
    doc.circle(margin + 3.5, y - 1.5, 3, 'F')
    doc.setTextColor(...BRAND.white)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(String(index + 1), margin + 3.5, y - 0.2, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...BRAND.muted)
    y = drawWrappedText(doc, item, margin + 10, y, contentWidth - 10, 5)
    y += 3.5
  })

  // Disclaimer
  y += 6
  y = ensureSpace(doc, y, 14, margin)
  doc.setDrawColor(...BRAND.line)
  doc.line(margin, y, pageWidth - margin, y)
  y += 6
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(...BRAND.muted)
  drawWrappedText(doc, REPORT_DISCLAIMER, margin, y, contentWidth, 4.2)

  doc.save(REPORT_META.fileName)
}
