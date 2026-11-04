import fs from 'node:fs';
import vm from 'node:vm';

const window = {};
const context = { window };
for (const file of ['dist/company-context.js', 'dist/official-enrichment.js', 'dist/sr007.js', 'dist/yc-founders.js', 'dist/schools.js']) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

let entries = 0;
for (const [key, records] of Object.entries(window.RADAR_SCHOOLS)) {
  if (!key.startsWith('SR')) continue;
  const details = window.SPEEDRUN_CONTEXT[key]?.founderDetails || {};
  if (!Object.keys(details).length) throw new Error(`${key}: no public founder bio`);
  for (const [school, founder] of records) {
    if (!details[founder]?.bio) throw new Error(`${key}: no public bio for ${founder} (${school})`);
    entries++;
  }
}
for (const [key, founders] of Object.entries(window.YC_FOUNDER_PROFILES)) {
  if (!founders.length || founders.some(founder => !founder.name || !founder.role || !founder.bio)) throw new Error(`${key}: incomplete YC founder record`);
}
console.log(`${entries} Speedrun school–founder entries have linked public bios; ${Object.keys(window.YC_FOUNDER_PROFILES).length} YC companies have reviewed founder bios, and ${Object.keys(window.RADAR_SCHOOLS).filter(key => !key.startsWith('SR')).length} have school details.`);
const latestFounders = new Set(window.SR007_ROSTER.flatMap(company => company.founders.map(founder => `${company.name}:${founder}`)));
const latestDocumented = new Set(Object.entries(window.RADAR_SCHOOLS).filter(([key]) => key.startsWith('SR007:')).flatMap(([key, records]) => records.map(([, founder]) => `${key.slice(6)}:${founder}`)));
console.log(`SR007: ${latestDocumented.size} founders with verified school details of ${latestFounders.size} listed founders across ${window.SR007_ROSTER.length} companies.`);
