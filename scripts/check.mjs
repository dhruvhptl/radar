import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const elements = new Map();
const element = (selector) => {
  if (!elements.has(selector)) elements.set(selector, {
    innerHTML: "", textContent: "", value: "", dataset: {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {}, addEventListener() {}
  });
  return elements.get(selector);
};
const context = vm.createContext({
  window: { innerWidth: 1440 },
  URLSearchParams, URL,
  document: { querySelector: element, querySelectorAll: () => [], addEventListener() {} },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout, clearTimeout
});
vm.runInContext(readFileSync(new URL("../dist/sr007.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/speedrun-archive.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/company-context.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/official-enrichment.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/archive-backgrounds.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/logos.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/backgrounds.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/yc-founders.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/schools.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/yc-founder-snapshot.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/yc-feed.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/nlp.js", import.meta.url), "utf8"), context);
vm.runInContext(readFileSync(new URL("../dist/app.js", import.meta.url), "utf8") + "\nglobalThis.radarCheck = { companies, sortedCompanies, state, companySector, companyTheme, renderAtlas };", context);

const { companies, sortedCompanies, state, companySector, companyTheme, renderAtlas } = context.radarCheck;
assert.equal(state.program, "all", "Atlas should open on the full directory by default");
const speedrun = companies.filter(company => company.program === "speedrun");
assert.equal(speedrun.length, 322, "SR001–SR007 should contain all 322 listed cohort records");
assert.equal(companies.length, 325, "YC examples and Speedrun cohorts should total 325");
assert.equal(new Set(companies.map(company => company.id)).size, 325, "Company IDs should be unique across cohorts");
assert.deepEqual([25,25,32,42,59,59,80], [1,2,3,4,5,6,7].map(n => speedrun.filter(company => company.cohort === `SR00${n}`).length), "Cohort counts should match public snapshots");
for (const company of speedrun) {
  assert.ok(company.mission && company.tags.length && company.location && company.teamSize, `${company.name} is incomplete`);
  if (company.cohort === "SR007") {
    assert.match(company.source, /^https:\/\/speedrun\.a16z\.com\/companies\//);
    assert.match(context.window.SR007_LOGOS[company.name], /^https:\/\/speedrun\.a16z\.com\/_next\/image\?/);
  } else assert.match(company.source, /^https:\/\/www\.gpagent\.ai\/speedrun\/company\//);
  assert.ok(companySector(company) >= 1 && companySector(company) <= 12);
  const profileContext = context.window.SPEEDRUN_CONTEXT[`${company.cohort}:${company.name}`];
  assert.ok(profileContext?.overview && profileContext.founded, `${company.name} should have sourced profile context`);
}
state.program = "speedrun";
state.cohort = "SR007";
assert.equal(sortedCompanies().length, 80, "Program filter should show the full cohort");
state.cohort = "all";
assert.equal(sortedCompanies().length, 322, "All cohorts filter should show the full Speedrun archive");
renderAtlas(sortedCompanies());
assert.equal((element("#radar-map").innerHTML.match(/class="atlas-area"/g) || []).length, 12, "Atlas should show all twelve areas without sampling companies");
assert.match(element("#radar-map").innerHTML, /322<\/strong>/, "Atlas should show the full selected directory count");
renderAtlas(Array.from({ length: 3000 }, (_, index) => ({ ...speedrun[index % speedrun.length], id: `atlas-${index}` })));
assert.match(element("#radar-map").innerHTML, /3,000<\/strong>/, "Atlas should summarize a 3,000-company directory without sampling points");
state.sector = companySector(speedrun[0]);
assert.ok(sortedCompanies().length > 0 && sortedCompanies().every(company => companySector(company) === state.sector), "Area selection should narrow the company list");
renderAtlas(sortedCompanies({ ignoreAtlas: true }));
assert.match(element("#radar-map").innerHTML, /atlas-topic/, "Area view should expose topics for a second drill-down");
state.theme = companyTheme(sortedCompanies()[0]);
assert.ok(sortedCompanies().every(company => companyTheme(company) === state.theme), "Topic selection should narrow the company list");
state.sector = "all";
state.theme = "all";
const refactor = context.window.SPEEDRUN_CONTEXT["SR003:Refactor Games"];
assert.match(refactor.officialUrl, /^https:\/\/speedrun\.a16z\.com\/companies\//);
assert.ok(refactor.founderDetails["Nathan Burba"].bio.includes("Survios"), "Official founder bios should enrich archived profiles");
assert.ok(vm.runInContext("Object.keys(SPEEDRUN_OFFICIAL_DETAILS).length", context) >= 230, "Archived official profiles should cover most companies");
assert.ok(Object.keys(context.window.SPEEDRUN_ARCHIVE_BACKGROUNDS).length >= 80, "Sourced founder backgrounds should cover archived companies");
state.cohort = "SR007";
state.mode = "personal";
state.interests = ["Robotics"];
assert.ok(sortedCompanies()[0].tags.includes("Robotics"), "Personal order should prioritize selected interests");
state.interestText = "robot learning evaluation";
vm.runInContext("render()", context);
assert.match(element("#detail-panel").innerHTML, /Your connection/, "Company detail should explain personal text overlap");
assert.match(element("#detail-panel").innerHTML, /Nearby teams/, "Company detail should surface related startups");
const nlpIndex = context.window.RadarNLP.createIndex([
  { id: "robot", mission: "Robotics evaluation for warehouse robots", overview: "Measure robot learning and physical automation", tags: ["Robotics"], founders: [] },
  { id: "finance", mission: "Payment reconciliation for banks", overview: "Invoices and financial operations", tags: ["Fintech"], founders: [] },
  { id: "health", mission: "Clinical workflow for hospitals", overview: "Help clinicians manage patient care", tags: ["Healthcare"], founders: [] }
]);
const robotDoc = { id: "robot" }, financeDoc = { id: "finance" };
assert.ok(nlpIndex.match(robotDoc,"warehouse robotics","").score > nlpIndex.match(financeDoc,"warehouse robotics","").score, "Interest text should favor relevant companies");
assert.ok(nlpIndex.match(financeDoc,"","payments invoices").score > nlpIndex.match(robotDoc,"","payments invoices").score, "Resume text should contribute separately");
assert.ok(nlpIndex.match(robotDoc,"robotics warehouse","payments invoices").score > nlpIndex.match(financeDoc,"robotics warehouse","payments invoices").score, "Interests should carry more weight than resume terms");
assert.equal(nlpIndex.related(robotDoc,[robotDoc,financeDoc],1).length,0,"Unrelated teams should not be presented as nearby");
assert.equal(await vm.runInContext("readResumeFile({name:'resume.txt',text:async()=> 'robotics experience'})", context), "robotics experience", "Plain-text resumes should be read locally");
state.industry = "Robotics";
assert.ok(sortedCompanies().every(company => company.tags.includes("Robotics")), "Industry filter should narrow by tag");
state.industry = "all";
state.background = "Research / academia";
assert.ok(sortedCompanies().length > 0 && sortedCompanies().every(company => context.window.SR007_BACKGROUNDS[company.name]?.includes("Research / academia")), "Founder background filter should use sourced tags");
state.background = "all";
state.cohort = "all";
state.school = "MIT";
assert.ok(sortedCompanies().length > 0 && sortedCompanies().every(company => context.window.RADAR_SCHOOLS[`${company.cohort}:${company.name}`]?.some(([school]) => school === "MIT")), "Founder school filter should use reviewed education records");
vm.runInContext("render()", context);
assert.match(element("#detail-panel").innerHTML, /Founder schools/, "Company detail should show sourced school details");
state.school = "documented";
assert.equal(sortedCompanies().length, 100, "Documented schools filter should show the reviewed Speedrun teams");
state.school = "all";
state.program = "speedrun";
state.cohort = "SR003";
vm.runInContext("render()", context);
assert.match(element("#school-filter").innerHTML, /Stanford University \(3 founders\)/, "School options should count founders, including two founders at one startup");
assert.match(element("#school-coverage").textContent, /of \d+ listed founders across .* teams/, "School coverage should distinguish documented founders from the whole cohort");
state.cohort = "all";

assert.equal(context.window.YC_BATCHES.length, 13, "YC should cover Winter 2023 through Fall 2026");
const sampleYc = context.window.normalizeYcCompany({
  id: 99123, name: "Sample Robotics", batch: "Summer 2026", url: "https://www.ycombinator.com/companies/sample-robotics",
  website: "https://sample.example", one_liner: "Robots for warehouse work", long_description: "The team builds warehouse robots.",
  team_size: 5, industry: "Industrials", subindustry: "Industrials -> Manufacturing and Robotics", tags: ["Robotics", "AI"],
  all_locations: "Toronto, Canada; Remote", small_logo_thumb_url: "https://bookface-images.s3.amazonaws.com/sample.png", status: "Active", isHiring: true
});
assert.equal(sampleYc.id, "yc-99123");
assert.equal(sampleYc.tags[0], "Robotics");
assert.equal(sampleYc.teamSize, 5);
assert.equal(sampleYc.isHiring, true);
assert.equal(sampleYc.overview, "The team builds warehouse robots.");
const sourcedPeer = context.window.normalizeYcCompany({ ...sampleYc, name: "Peer", batch: "Summer 2026", url: "https://www.ycombinator.com/companies/peer" });
assert.equal(sourcedPeer.founders.length, 2, "Reviewed YC school entries should expose founder names from official profiles");
assert.equal(sourcedPeer.founders[0][0], "Aaron Zhang");
assert.match(sourcedPeer.founders[0][2], /Harvey Mudd/, "Reviewed YC profiles should show founder context");
const ontra = context.window.normalizeYcCompany({ ...sampleYc, name: "Ontra Mobility", batch: "Summer 2024", url: "https://www.ycombinator.com/companies/ontra-mobility" });
assert.equal(ontra.founders.length, 2, "Screenshot example should show its founders");
const founderRows = context.window.YCFounderSnapshot.parseCsv('First Name,Last Name,Full Name,Company,Domain,Website,Title,LinkedIn,One-Liner,Location,Team Size,Batch,Industry,Stage\nJane,Doe,Jane Doe,"Sample, Robotics",sample.example,,Founder,https://www.linkedin.com/in/jane-doe,,,,Summer 2026,,\n');
assert.equal(founderRows[1][3], "Sample, Robotics", "Founder CSV parser should preserve quoted commas");
const founderIndex = new Map([["summer 2026\u0000sample robotics", [
  { name: "Jane Doe", role: "Co-founder", linkedin: "https://www.linkedin.com/in/jane-doe", domain: "sample.example" },
  { name: "Wrong Company", role: "Founder", linkedin: "", domain: "other.example" }
]]]);
assert.equal(context.window.YCFounderSnapshot.forCompany(founderIndex, sampleYc).length, 1, "Snapshot matching should verify the company website domain");
assert.equal(context.window.YCFounderSnapshot.forCompany(founderIndex, sampleYc)[0][0], "Jane Doe");
assert.equal(context.window.YCFounderSnapshot.forCompany(founderIndex, { ...sampleYc, website: "" }).length, 0, "Founder matching requires a verified company domain");
assert.equal(context.window.normalizeYcCompany({ ...sampleYc, url: "javascript:alert(1)" }), null, "Only HTTPS YC profiles should be accepted");
context.window.YCFounderSnapshot.load = async () => founderIndex;
context.fetch = async url => ({ ok: true, json: async () => [{
  id: 90000 + context.window.YC_BATCHES.findIndex(([,slug]) => url.includes(slug)), name: "Sample Robotics", batch: context.window.YC_BATCHES.find(([,slug]) => url.includes(slug))[0],
  url: `https://www.ycombinator.com/companies/fixture-${url.split("/").at(-1).replace(".json", "")}`,
  website: "https://sample.example", one_liner: "A fixture company", team_size: 2, status: "Active"
}] });
const fetched = await context.window.loadYcArchive();
assert.equal(fetched.records.length, 13, "Every post-launch batch should load");
assert.equal(fetched.failedBatches.length, 0);
await vm.runInContext("refreshYcArchive()", context);
assert.equal(vm.runInContext("companies.length", context), 338, "Loaded YC records should join the 325 local records");
assert.equal(vm.runInContext("companies.find(company => company.id === 'yc-90001').founders[0][0]", context), "Jane Doe", "Founder snapshot should enrich the loaded YC company");
state.program = "yc";
state.cohort = "Summer 2026";
state.background = "all";
state.ycFocus = "active";
assert.ok(sortedCompanies().some(company => company.id.startsWith("yc-")), "YC cohort filter should show imported companies");
state.ycFocus = "hiring";
assert.ok(sortedCompanies().every(company => company.isHiring), "YC hiring filter should only show listings marked as hiring");
console.log("Radar checks passed: Speedrun and YC data, 12 atlas areas, topic drill-down, local BM25 matching, related teams, and discovery filters.");
