import Papa from "papaparse";
import jsPDF from "jspdf";

/**
 * Export results to CSV
 * @param {Object} data
 */
export function exportToCsv(data) {
  const formattedData = Object.keys(data).map((key) => ({
    field: key.replace(/_/g, " ").toUpperCase(),
    value: data[key] ? "Valid" : "Invalid",
  }));

  const csv = Papa.unparse(formattedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "diagnostic-report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export results to PDF
 * @param {Object} data
 */
export function exportToPdf(data) {
  const doc = new jsPDF();
  let y = 10;

  doc.text("Website Diagnostic Report", 10, y);
  y += 10;

  Object.keys(data).forEach((key) => {
    doc.text(
      `${key.replace(/_/g, " ")}: ${data[key] ? "Valid" : "Invalid"}`,
      10,
      y
    );
    y += 10;
  });

  doc.save("diagnostic-report.pdf");
}
