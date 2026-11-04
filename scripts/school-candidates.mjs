import fs from "node:fs";
import vm from "node:vm";

const window = {};
const context = { window };
for (const file of ["dist/company-context.js", "dist/official-enrichment.js", "dist/sr007.js", "dist/speedrun-archive.js", "dist/schools.js"]) {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const education = /\b(?:university|college|school of|bachelor|master(?:'s)?|ph\.?d\.?|graduat\w*|studied|attended|MIT|Caltech|Stanford|Harvard|Berkeley|Waterloo|Princeton|Oxford|Cambridge|Georgia Tech|Carnegie Mellon|Dartmouth|Yale|IIT|UCLA|USC)\b/i;
for (const [key, company] of Object.entries(window.SPEEDRUN_CONTEXT)) {
  for (const [founder, details] of Object.entries(company.founderDetails || {})) {
    const bio = details.bio || "";
    if (process.argv.includes("--all-sr007")) {
      if (!key.startsWith("SR007:")) continue;
    } else if (!education.test(bio)) continue;
    if ((window.RADAR_SCHOOLS[key] || []).some(([, name]) => name === founder)) continue;
    const roster = [...window.SR007_ROSTER, ...window.SPEEDRUN_ARCHIVE].find(item => `${item.cohort}:${item.name}` === key);
    console.log(JSON.stringify({ key, founder, inRoster: roster?.founders.includes(founder), role: details.role, bio: process.argv.includes("--all-sr007") ? bio.slice(0,190) : bio }));
  }
}
