const xlsx = require("xlsx");
const fs = require("fs");

function excelJson(file) {
  const wb = xlsx.readFile(file);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  function parseTimetable(rows) {
    const data = [];
    let currentCourse = null;
    let currentTimes = [];

    rows.forEach((row, i) => {
      const firstCell = row[0]?.toString().trim();

      // Detect course header (heuristic: contains "Y" and "S")
      if (firstCell && /Y\d+S\d+/i.test(firstCell)) {
        currentCourse = { course: firstCell, timetable: [] };
        data.push(currentCourse);

        // Assume next row is time slots
        currentTimes = rows[i + 1] || [];
      }

      // Detect day rows (Monday–Sunday)
      if (firstCell && /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i.test(firstCell)) {
        const dayEntry = { day: firstCell, slots: [] };

        for (let j = 1; j < row.length; j++) {
          dayEntry.slots.push({
            time: currentTimes[j] || "",
            value: row[j] || ""
          });
        }

        currentCourse?.timetable.push(dayEntry);
      }
    });

    return data;
  }

  const structured = parseTimetable(rows);

  // optional: still save for debugging
  fs.writeFileSync("./structured.json", JSON.stringify(structured, null, 2), "utf8");
  console.log("✅ Saved structured timetable");

  return structured; // ✅ now it returns
}

module.exports = {excelJson};

