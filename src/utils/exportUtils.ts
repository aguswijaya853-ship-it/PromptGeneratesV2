import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface ExportMetadata {
  title: string;
  topic: string;
  subject: string;
  gradeClass: string;
  categoryTitle?: string;
  targetAI?: string;
}

/**
 * Converts markdown-like text to structured HTML for Microsoft Word export
 */
function markdownToWordHtml(markdown: string): string {
  const lines = markdown.split('\n');
  let html = '';
  let inTable = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Table detection
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        html += '<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; margin: 15px 0; border: 1px solid #059669;">';
        inTable = true;
      }

      // Check if it's separator row (e.g. | :--- | :--- |)
      if (line.match(/^\|[\s\-:]+\|/)) {
        continue;
      }

      const cells = line.split('|').slice(1, -1);
      html += '<tr>';
      const isHeader = i > 0 && lines[i + 1] && lines[i + 1].trim().match(/^\|[\s\-:]+\|/);

      cells.forEach((c) => {
        const text = c.trim().replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        if (isHeader) {
          html += `<th style="background-color: #d1fae5; color: #065f46; font-weight: bold; text-align: left; padding: 8px;">${text}</th>`;
        } else {
          html += `<td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${text}</td>`;
        }
      });
      html += '</tr>';
      continue;
    } else if (inTable) {
      html += '</table>';
      inTable = false;
    }

    // List item
    if (line.match(/^[-*]\s+/)) {
      if (!inList) {
        html += '<ul style="margin: 8px 0; padding-left: 20px;">';
        inList = true;
      }
      const itemText = line.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      html += `<li style="margin-bottom: 4px; line-height: 1.5;">${itemText}</li>`;
      continue;
    } else if (inList) {
      html += '</ul>';
      inList = false;
    }

    if (!line) {
      html += '<br/>';
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      html += `<h1 style="color: #065f46; font-size: 20pt; margin-top: 18px; margin-bottom: 8px; border-bottom: 2px solid #059669; padding-bottom: 4px;">${line.substring(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      html += `<h2 style="color: #047857; font-size: 15pt; margin-top: 14px; margin-bottom: 6px;">${line.substring(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      html += `<h3 style="color: #0f766e; font-size: 12.5pt; margin-top: 10px; margin-bottom: 4px; background-color: #f0fdf4; padding: 4px 8px; border-left: 4px solid #10b981;">${line.substring(4)}</h3>`;
    } else {
      // Formatted paragraph
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/`([^`]+)`/g, '<code style="background-color: #f1f5f9; padding: 2px 4px; border-radius: 4px;">$1</code>');

      html += `<p style="margin: 6px 0; line-height: 1.6; font-size: 11pt; color: #1e293b;">${formatted}</p>`;
    }
  }

  if (inTable) html += '</table>';
  if (inList) html += '</ul>';

  return html;
}

/**
 * 1. Export as Word Document (.doc) with complete educational layout & tables
 */
export function exportToWordDoc(
  filename: string,
  content: string,
  metadata: ExportMetadata
): void {
  const parsedContent = markdownToWordHtml(content);

  const wordDocumentHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${metadata.title}</title>
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt; /* A4 Portrait */
      margin: 1.0in 1.0in 1.0in 1.0in;
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      color: #1e293b;
      line-height: 1.5;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 3px double #059669;
      margin-bottom: 16px;
      padding-bottom: 8px;
    }
    .identity-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      margin-bottom: 18px;
    }
    .identity-table td {
      padding: 6px 10px;
      font-size: 10.5pt;
      border: 1px solid #e2e8f0;
    }
    .dotted-line {
      border-bottom: 1px dotted #94a3b8;
      display: inline-block;
      width: 100%;
      height: 14px;
    }
    .score-box {
      border: 2px dashed #059669;
      background-color: #ecfdf5;
      text-align: center;
      padding: 8px;
      font-weight: bold;
    }
    .footer-note {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #cbd5e1;
      font-size: 9pt;
      color: #64748b;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- Header -->
    <table class="header-table">
      <tr>
        <td style="width: 80%;">
          <div style="font-size: 9.5pt; font-weight: bold; color: #047857; text-transform: uppercase; letter-spacing: 1px;">
            LEMBAR KERJA PESERTA DIDIK (LKPD) • KURIKULUM MERDEKA
          </div>
          <div style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 2px;">
            ${metadata.topic || metadata.title}
          </div>
          <div style="font-size: 10.5pt; color: #334155; margin-top: 2px;">
            Mata Pelajaran: <b>${metadata.subject}</b> | Jenjang: <b>${metadata.gradeClass}</b>
          </div>
        </td>
        <td style="width: 20%; text-align: right; vertical-align: top;">
          <div style="background-color: #d1fae5; color: #065f46; font-size: 10pt; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: inline-block;">
            ${metadata.categoryTitle || 'Media Ajar'}
          </div>
        </td>
      </tr>
    </table>

    <!-- Student Identity Box -->
    <table class="identity-table">
      <tr>
        <td style="width: 20%; font-weight: bold;">Nama Siswa / Tim :</td>
        <td style="width: 50%;"><div class="dotted-line"></div></td>
        <td rowspan="3" style="width: 30%; vertical-align: middle;">
          <div class="score-box">
            <div style="font-size: 9pt; color: #047857; text-transform: uppercase;">Nilai / Paraf Guru</div>
            <div style="font-size: 18pt; color: #059669; margin: 4px 0;">___ / 100</div>
            <div style="font-size: 8pt; color: #d97706;">★★★★★</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Kelas / No. Absen :</td>
        <td><b>${metadata.gradeClass}</b> / <div class="dotted-line" style="width: 60px;"></div></td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Hari / Tanggal :</td>
        <td><div class="dotted-line"></div></td>
      </tr>
    </table>

    <!-- Main Content Generated by AI -->
    <div class="main-content">
      ${parsedContent}
    </div>

    <!-- Student & Teacher Reflection Signatures -->
    <table style="width: 100%; margin-top: 35px; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; text-align: center; font-size: 10pt;">
          Mengetahui / Guru Mata Pelajaran,
          <br/><br/><br/><br/>
          <b>( ______________________________ )</b><br/>
          NIP. ............................................
        </td>
        <td style="width: 50%; text-align: center; font-size: 10pt;">
          Peserta Didik / Ketua Regu,
          <br/><br/><br/><br/>
          <b>( ______________________________ )</b><br/>
          NISN. ............................................
        </td>
      </tr>
    </table>

    <div class="footer-note">
      Dokumen LKPD Edukatif Interaktif • Disusun Menggunakan Prompt Generator Media Ajar Kurikulum Merdeka
    </div>
  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + wordDocumentHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/[/\\?%*:|"<>]/g, '-')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 2. Export DOM element as Photo / Image (.png) with crisp high resolution (2x retina scale)
 */
export async function exportToImage(
  element: HTMLElement,
  filename: string,
  format: 'png' | 'jpeg' = 'png'
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2, // 2x resolution for ultra-sharp text and images
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    scrollX: 0,
    scrollY: 0,
  });

  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, 0.95);

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename.replace(/[/\\?%*:|"<>]/g, '-')}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 3. Export DOM element as standard PDF (.pdf) formatted for A4 Portrait printing
 */
export async function exportToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = (canvas.height * contentWidth) / canvas.width;

  // Single page fit if height is within A4 bounds with padding
  if (contentHeight <= pageHeight - margin * 2) {
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);
  } else {
    // Multi-page handling
    let heightLeft = contentHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - contentHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(`${filename.replace(/[/\\?%*:|"<>]/g, '-')}.pdf`);
}
