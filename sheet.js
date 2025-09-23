const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const workbook = XLSX.readFile(
  path.join(__dirname, "./src/RUIRU CAMPUS DRAFT SEPTEMBER - DECEMBER 2025 TEACHING TIMETABLE (1).xlsx")
);

// Strong cleaner for any cell
function cleanCell(cell) {
  if (typeof cell !== "string") return cell;
  return cell
    .replace(/\r?\n+/g, " ")       // replace newlines with space
    .replace(/\s+/g, " ")          // collapse multiple spaces
    .replace(/[\u00A0\u200B\u202F]/g, " ") // remove non-breaking/zero-width spaces
    .trim();                       // trim final result
}

function Sheet() {
  const result = workbook.SheetNames.map(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, {  defval: "" });

    // 1. Remove completely empty rows
    const filtered = rows.filter(row => row.some(cell => cell && cell.toString().trim() !== ""));

    // 2. Clean each cell
    const cleaned = filtered.map(row =>
  row.map(cell =>
    typeof cell === "string"
      ? cell
          .replace(/\s+/g, " ")        // collapse all whitespace (tabs, newlines, NBSP, multiple spaces) into a single space
          .replace(/\u00A0/g, " ")     // replace non-breaking spaces explicitly
          .trim()                      // remove leading/trailing
      : cell
  )
);

    // Save cleaned JSON
    fs.writeFileSync(
      `output.json`,
      JSON.stringify(cleaned, null, 2)
    );

    return { name: sheetName, rows: cleaned };
  });

   console.log(JSON.stringify(result, null, 2));
}

Sheet();
