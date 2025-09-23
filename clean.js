const fs = require("fs");

// Load raw data.json
const raw = fs.readFileSync("./data.json", "utf8");
let rows = JSON.parse(raw);

// Helper: detect types
function guessKey(value) {
  if (typeof value !== "string") return null;

  const val = value.trim();

  if (/^\d{4}-\d{4}$/.test(val)) return "Time";   // e.g. 0800-1100
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i.test(val)) return "Day"; // weekdays
  if (/^[A-Z]{2,}\s?Y?\d+/.test(val)) return "Unit Code"; // e.g. BBAM Y1S1
  return "Unit Name"; // fallback
}

// Clean + realign
rows = rows.map(row => {
  const cleaned = { "Unit Code": "", "Unit Name": "", "Day": "", "Time": "" };

  for (const key in row) {
    let val = row[key];
    if (!val) continue;

    if (typeof val === "string") {
      val = val.replace(/\s+/g, " ").replace(/\u00A0/g, " ").trim();
    }

    // If key already correct → keep
    if (cleaned[key] !== undefined) {
      cleaned[key] = val;
    } else {
      // Try to guess correct key
      const guessed = guessKey(val);
      cleaned[guessed] = val;
    }
  }

  return cleaned;
});

// Save fixed JSON
fs.writeFileSync("./data.json", JSON.stringify(rows, null, 2), "utf8");

console.log("✅ Fixed JSON with aligned keys saved to data.json");
