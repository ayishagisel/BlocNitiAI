import jsPDF from 'jspdf';
import { RepairIssue } from '@shared/schema';

export async function generateRepairPDF(repairIssues: RepairIssue[]): Promise<void> {
  if (repairIssues.length === 0) {
    throw new Error("No repair issues to generate PDF");
  }

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with automatic page breaks
  const addText = (text: string, x: number, y: number, options?: any) => {
    if (y > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(text, x, y, options);
    return y;
  };

  // Helper function to get status color
  const getStatusColor = (status: string): [number, number, number] => {
    switch (status) {
      case 'urgent':
        return [220, 38, 38]; // Red
      case 'priority':
        return [217, 119, 6]; // Orange
      case 'non-urgent':
        return [107, 114, 128]; // Gray
      default:
        return [0, 0, 0];
    }
  };

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('BlocNiti AI - Tenant Repair Report', margin, yPosition);
  yPosition += 10;

  // Date
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 15;

  // Summary
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Repair Issues Summary', margin, yPosition);
  yPosition += 10;

  // Count by status
  const urgent = repairIssues.filter(issue => issue.status === 'urgent').length;
  const priority = repairIssues.filter(issue => issue.status === 'priority').length;
  const nonUrgent = repairIssues.filter(issue => issue.status === 'non-urgent').length;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(`Total Issues: ${repairIssues.length}`, margin, yPosition);
  yPosition += 5;

  pdf.setTextColor(...getStatusColor('urgent'));
  yPosition = addText(`Urgent: ${urgent}`, margin, yPosition);
  yPosition += 5;

  pdf.setTextColor(...getStatusColor('priority'));
  yPosition = addText(`Priority: ${priority}`, margin, yPosition);
  yPosition += 5;

  pdf.setTextColor(...getStatusColor('non-urgent'));
  yPosition = addText(`Non-Urgent: ${nonUrgent}`, margin, yPosition);
  yPosition += 15;

  // Reset color
  pdf.setTextColor(0, 0, 0);

  // Individual Issues
  repairIssues.forEach((issue, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    // Issue header with colored status
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(`${index + 1}. Room ${issue.roomNumber} - ${issue.roomName} (${issue.area})`, margin, yPosition);
    yPosition += 7;

    // Status badge
    pdf.setTextColor(...getStatusColor(issue.status));
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(`STATUS: ${issue.status.toUpperCase()}`, margin, yPosition);
    yPosition += 10;

    // Reset color and font
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    // Issue details
    if (issue.firstRequestDate) {
      yPosition = addText(`First Request Date: ${issue.firstRequestDate}`, margin, yPosition);
      yPosition += 5;
    }

    yPosition = addText('Issue Description:', margin, yPosition);
    yPosition += 5;

    // Split long text into multiple lines
    const descriptionLines = pdf.splitTextToSize(issue.issueDescription, pageWidth - 2 * margin);
    descriptionLines.forEach((line: string) => {
      yPosition = addText(line, margin + 5, yPosition);
      yPosition += 4;
    });
    yPosition += 3;

    if (issue.proposedRemediation) {
      yPosition = addText('Proposed Remediation:', margin, yPosition);
      yPosition += 5;

      const remediationLines = pdf.splitTextToSize(issue.proposedRemediation, pageWidth - 2 * margin);
      remediationLines.forEach((line: string) => {
        yPosition = addText(line, margin + 5, yPosition);
        yPosition += 4;
      });
      yPosition += 3;
    }

    // AI Analysis if available
    if (issue.hpdViolationClass || issue.aiAnalysis) {
      yPosition = addText('AI Analysis (Alma):', margin, yPosition);
      yPosition += 5;

      if (issue.hpdViolationClass) {
        yPosition = addText(`HPD Violation Class: ${issue.hpdViolationClass}`, margin + 5, yPosition);
        yPosition += 4;
      }

      if (issue.correctionDeadline) {
        yPosition = addText(`Correction Deadline: ${issue.correctionDeadline}`, margin + 5, yPosition);
        yPosition += 4;
      }

      if (issue.aiAnalysis) {
        const analysisLines = pdf.splitTextToSize(issue.aiAnalysis, pageWidth - 2 * margin);
        analysisLines.forEach((line: string) => {
          yPosition = addText(line, margin + 5, yPosition);
          yPosition += 4;
        });
      }
      yPosition += 5;
    }

    // Add separator line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  });

  // Footer on last page
  if (yPosition < pageHeight - 40) {
    yPosition = pageHeight - 40;
  } else {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100, 100, 100);
  yPosition = addText('This report was generated by BlocNiti AI to document housing repair issues.', margin, yPosition);
  yPosition += 4;
  yPosition = addText('For legal advice, contact a qualified attorney or legal aid organization.', margin, yPosition);
  yPosition += 4;
  yPosition = addText('Emergency: 911 | City Services: 311 | Legal Aid: (212) 577-3300', margin, yPosition);

  // Generate filename with current date
  const filename = `BlocNiti_Repair_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  pdf.save(filename);
}
