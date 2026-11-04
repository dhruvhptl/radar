const reviewedCompanies = [
  {
    id: "superset", name: "Superset", program: "yc", cohort: "Spring 2026", location: "San Francisco", teamSize: 4,
    tags: ["Developer tools", "AI infrastructure"], rank: 1,
    mission: "Give engineers a better workspace for building alongside coding agents.",
    problem: "As engineers run more coding agents at once, keeping track of sessions, changes, and reviews gets harder. Superset is building an open-source IDE around that workflow.",
    note: "A clear product for a fast-changing developer workflow, with a public release and a visible team.",
    founders: [
      ["Kiet Ho", "Founder / CEO", "Previously co-founded Onlook and worked at Amazon and ServiceNow."],
      ["Satya Patel", "Founder / CTO", "Previously CTO of Untether Labs and worked at Google and Amazon."],
      ["Avi Peltz", "Founder / CPO", "Previously co-founded Adam and BioGlyph."]
    ],
    funding: "Amount not listed", jobs: "2 roles listed on YC", website: "https://www.superset.sh/", jobsUrl: "https://www.ycombinator.com/companies/superset/jobs", source: "https://www.ycombinator.com/companies/superset"
  },
  {
    id: "harbor", name: "Harbor AI", program: "speedrun", cohort: "SR007", location: "San Francisco", teamSize: 2,
    tags: ["AI infrastructure", "Developer tools"], rank: 2,
    mission: "Help AI teams get more useful work from the GPU fleets they already run.",
    problem: "A GPU fleet can be online while training and inference jobs still waste capacity. Harbor says its software diagnoses slowdowns, recommends supported fixes, and checks whether performance recovers.",
    note: "An infrastructure problem with a specific first product and founders who have worked close to the systems involved.",
    founders: [
      ["Param Shah", "Co-founder / CEO", "Previously led product at Microsoft AI Supercomputing."],
      ["Sahaj Putcha", "Co-founder", "Previously worked at Amazon Robotics."]
    ],
    funding: "Amount not listed", jobs: "Check company site", website: "https://harborops.ai/", jobsUrl: "https://harborops.ai/", source: "https://speedrun.a16z.com/companies/harbor-ai"
  },
  {
    id: "arctic", name: "Arctic Health", program: "yc", cohort: "Spring 2026", location: "New York City", teamSize: 4,
    tags: ["Healthcare", "AI applications"], rank: 3,
    mission: "Remove the paperwork that keeps healthcare providers from getting paid and patients from getting care.",
    problem: "Credentialing and payer contracts involve documents, verifications, and hundreds of portal workflows. Arctic combines experts and software to handle enrollment and contracting end to end.",
    note: "The team describes a concrete administrative bottleneck and how its product handles the entire workflow.",
    founders: [
      ["Sam Slezek", "Founder / CEO", "Previously led product work at Scale AI and Instacart."],
      ["Raghav Mehrish", "Founder / CTO", "Previously engineered at Airbnb and Zenefits; co-founded Handstamp."],
      ["Michael Clark", "COO", "Previously helped build healthcare AI sales at Instabase."]
    ],
    funding: "Amount not listed", jobs: "No YC roles listed", website: "https://arctic.health/", jobsUrl: "https://arctic.health/", source: "https://www.ycombinator.com/companies/arctic-health"
  },
  {
    id: "most-robotic", name: "Most Robotic", program: "yc", cohort: "Summer 2026", location: "San Francisco", teamSize: 2,
    tags: ["Robotics", "AI infrastructure"], rank: 4,
    mission: "Make robot learning easier to measure in the real world.",
    problem: "Robotics researchers still spend time watching trials and manually recording whether tasks succeeded. The team's first product, Instance, evaluates video of robot rollouts so teams can run more experiments.",
    note: "A research-led team starting with a very tangible pain point in robotics evaluation.",
    founders: [
      ["Claire Mao", "Founder / CEO", "MIT math and computer science; previous research at NASA JPL and MIT Media Lab."],
      ["Lucy Cai", "Founder / CTO", "MIT robotics research; previous work at SpaceX and AWS."]
    ],
    funding: "Amount not listed", jobs: "No YC roles listed", website: "https://mostrobotic.com/", jobsUrl: "https://mostrobotic.com/", source: "https://www.ycombinator.com/companies/most-robotic"
  },
  {
    id: "corlen", name: "Corlen", program: "speedrun", cohort: "SR007", location: "San Francisco", teamSize: 2,
    tags: ["Fintech", "AI applications"], rank: 5,
    mission: "Make commercial real estate lending less manual.",
    problem: "Commercial loans move through intake and underwriting with a lot of handoffs. Corlen is building an autonomous loan origination platform aimed at taking that work from intake to decision.",
    note: "The founder team combines real estate deal experience with AI platform engineering.",
    founders: [
      ["Waruna Yapa", "Co-founder / CEO", "Worked on systems at Meta, LinkedIn, and Microsoft; has completed real estate deals."],
      ["Meheresh Yeditha", "Co-founder / CTO", "Previously led AI platform work at Rippling."]
    ],
    funding: "Amount not listed", jobs: "Check company site", website: "https://corlen.ai/", jobsUrl: "https://corlen.ai/", source: "https://speedrun.a16z.com/companies/corlen"
  },
  {
    id: "rumbo", name: "Rumbo", program: "speedrun", cohort: "SR007", location: "New York City", teamSize: 5,
    tags: ["Logistics", "AI applications"], rank: 6,
    mission: "Help freight teams move more cargo without more paperwork.",
    problem: "Freight forwarders receive messy requests across email, PDFs, and screenshots. Rumbo builds agents that turn those requests into shipment quotes, while operators make the final call.",
    note: "The team includes a founder with direct freight forwarding experience, alongside product and engineering backgrounds.",
    founders: [
      ["Guido Haissiner", "Co-founder / CEO", "Previously worked in corporate finance at Rappi and cybersecurity at Mastercard."],
      ["Agustin Baiocco", "Co-founder / CPTO", "Previously led an AI product for retailers at Swiftly."],
      ["Gonzalo Leiva", "Co-founder / Head of Sales", "Spent twelve years in freight forwarding, including commercial leadership."]
    ],
    funding: "Amount not listed", jobs: "Check company site", website: "https://rumbo-ai.com/", jobsUrl: "https://rumbo-ai.com/", source: "https://speedrun.a16z.com/companies/rumbo"
  }
];

const importedCompanies = [...(window.SR007_ROSTER || []), ...(window.SPEEDRUN_ARCHIVE || [])]
  .filter(entry => !reviewedCompanies.some(company => company.name === entry.name && company.cohort === entry.cohort && company.program === "speedrun"))
  .map((entry, index) => ({
    ...entry, program: "speedrun", rank: 100 + (7 - Number(entry.cohort.slice(2))) * 1000 + index, reviewed: false,
    problem: null, note: null,
    founders: entry.founders.map(name => [name, "Founder", "", entry.cohort === "SR007" ? `${entry.source}/${name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` : entry.source]),
    funding: "Amount not listed", jobs: entry.website ? "Check company site" : "Check profile",
    website: entry.website || "", jobsUrl: entry.website || entry.source
  }));
let companies = [...reviewedCompanies, ...importedCompanies];
const interests = ["Developer tools", "AI infrastructure", "AI research", "Robotics", "Healthcare", "Climate", "Fintech", "Consumer", "Gaming", "Media", "Commerce", "Security", "Defense", "Logistics", "Hardware", "Future of work", "AI applications"];
const founderLinks = {
  "Kiet Ho": "https://linkedin.com/in/kiet-ho",
  "Satya Patel": "https://www.linkedin.com/in/saddlepaddle/",
  "Avi Peltz": "https://linkedin.com/in/avipeltz",
  "Sam Slezek": "https://www.linkedin.com/in/slezek/",
  "Raghav Mehrish": "https://www.linkedin.com/in/rmehrish/",
  "Claire Mao": "https://www.linkedin.com/in/clairemao-/",
  "Lucy Cai": "https://www.linkedin.com/in/lucy-cai/",
  "Param Shah": "https://speedrun.a16z.com/companies/harbor-ai/param-shah",
  "Sahaj Putcha": "https://speedrun.a16z.com/companies/harbor-ai/sahaj-putcha",
  "Waruna Yapa": "https://speedrun.a16z.com/companies/corlen/waruna-yapa",
  "Meheresh Yeditha": "https://speedrun.a16z.com/companies/corlen/meheresh-yeditha",
  "Guido Haissiner": "https://speedrun.a16z.com/companies/rumbo/guido-haissiner",
  "Agustin Baiocco": "https://speedrun.a16z.com/companies/rumbo/agustin-baiocco",
  "Gonzalo Leiva": "https://speedrun.a16z.com/companies/rumbo/gonzalo-leiva"
};
const manualBackgrounds = {
  superset: ["Repeat founder", "Big tech"],
  arctic: ["Product leadership"],
  "most-robotic": ["Research / academia"]
};
const backgroundOptions = ["Big tech", "Industry operator", "Product leadership", "Repeat founder", "Research / academia"];
const initialParams = new URLSearchParams(window.location?.search || "");
const initialProgram = ["all", "yc", "speedrun"].includes(initialParams.get("program")) ? initialParams.get("program") : "all";
const initialCohort = initialProgram === "all" ? "all" : initialProgram === "yc" ? window.YC_BATCHES.some(([batch]) => batch === initialParams.get("cohort")) ? initialParams.get("cohort") : "Summer 2026" : /^(?:all|SR00[1-7])$/.test(initialParams.get("cohort") || "") ? initialParams.get("cohort") : "SR007";
const state = {
  view: "explore", mode: "shared", program: initialProgram, cohort: initialCohort, ycFocus: "active", visibleLimit: 80, industry: "all", background: "all", school: "all", sector: "all", theme: "all", query: "", selected: initialParams.get("company") || "harbor", interestText: "", resumeText: "",
  interests: readStored("radar-interests", []), saved: readStored("radar-saved", [])
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let toastTimer;
let textIndex;
let preparedText;
let preparedKey = "";
let matchCache = new Map();

function rebuildTextIndex() {
  textIndex = window.RadarNLP.createIndex(companies.map(company => {
    const context = companyContext(company);
    return { ...company,
      overview: [company.overview, context.overview, context.officialOverview].filter((part,index,array) => part && array.indexOf(part) === index).join(" "),
      founders: company.founders.map(founder => [founder[0], founder[1], founder[2] || context.founderDetails?.[founder[0]]?.bio || ""])
    };
  }));
  preparedKey = "";
  matchCache = new Map();
}
function personalText() { return [state.interests.join(" "), state.interestText].filter(Boolean).join(" "); }
function hasPersonalText() { return Boolean(personalText().trim() || state.resumeText.trim()); }
function matchFor(company) {
  const interests = personalText();
  const key = `${interests}\u0000${state.resumeText}`;
  if (key !== preparedKey) { preparedText = textIndex.prepare(interests,state.resumeText); preparedKey = key; matchCache = new Map(); }
  if (!matchCache.has(company.id)) matchCache.set(company.id,textIndex.matchPrepared(company,preparedText));
  return matchCache.get(company.id);
}

const sectors = [
  { name: "Dev tools", color: "#5ee4c6", tags: ["Developer tools"] },
  { name: "AI infra", color: "#78e8da", tags: ["AI infrastructure", "AI research", "Infrastructure"] },
  { name: "Work", color: "#93a8ff", tags: ["Future of work", "Enterprise software", "Sales", "Logistics", "Legal", "Real estate", "Marketing", "Adtech / Marketing Tech", "AI applications"] },
  { name: "Finance", color: "#b5a4ff", tags: ["Fintech", "Insurance", "Crypto"] },
  { name: "Health", color: "#ff9d81", tags: ["Healthcare", "Biotech"] },
  { name: "Commerce", color: "#ffc28e", tags: ["Commerce"] },
  { name: "Consumer", color: "#ffcf70", tags: ["Consumer", "Travel", "Education", "Sports"] },
  { name: "Games", color: "#f4dc78", tags: ["Gaming"] },
  { name: "Media", color: "#e2c77d", tags: ["Media"] },
  { name: "Physical", color: "#71d5f4", tags: ["Robotics", "Hardware", "Industry", "Space", "Construction", "Construction Tech", "Food & agriculture", "Mobility", "Deep tech"] },
  { name: "Climate", color: "#67d7b0", tags: ["Climate"] },
  { name: "Security", color: "#db9cf5", tags: ["Defense", "Security"] }
];
function companySector(company) {
  if (company.tags.includes("Climate")) return 11;
  if (company.tags.includes("Defense") || company.tags.includes("Security")) return 12;
  const primary = company.tags.find(tag => tag !== "AI applications") || "AI applications";
  return sectors.findIndex(sector => sector.tags.includes(primary)) + 1 || 3;
}
function companyTheme(company) {
  const industry = String(company.ycIndustry || "").split(" -> ").pop().trim();
  if (industry && !/^(?:B2B|B2C|Consumer|Industrials|Other|Unspecified)$/i.test(industry) && industry !== sectors[companySector(company)-1].name) return industry;
  const tag = (company.rawTags || company.tags).find(value => value && !/^(?:AI applications|AI Agents|B2B|B2C)$/i.test(value) && value !== sectors[companySector(company)-1].name);
  return tag || "Other teams";
}
function companyContext(company) { return company.program === "yc" ? { overview: company.overview } : window.SPEEDRUN_CONTEXT?.[`${company.cohort}:${company.name}`] || {}; }
function logoFallback(company) {
  try { return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(company.website).hostname)}&sz=128`; } catch { return ""; }
}
function logoMarkup(company, extraClass = "") {
  const official = company.logo || window.SR007_LOGOS?.[company.name];
  const fallback = logoFallback(company);
  const src = official || fallback;
  return `<span class="company-logo ${extraClass}">${src ? `<img src="${escapeHtml(src)}" data-fallback="${escapeHtml(official ? fallback : "")}" alt="" loading="lazy">` : ""}<span aria-hidden="true">${escapeHtml(company.name.slice(0,1))}</span></span>`;
}
function readStored(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; } }
function store(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]); }
function programName(company) { return company.program === "yc" ? "Y Combinator" : "a16z Speedrun"; }
function backgrounds(company) { return manualBackgrounds[company.id] || window.SPEEDRUN_ARCHIVE_BACKGROUNDS?.[`${company.cohort}:${company.name}`] || window.SR007_BACKGROUNDS?.[company.name] || []; }
function schools(company) { return window.RADAR_SCHOOLS?.[`${company.cohort}:${company.name}`] || []; }
function matches(company) { return company.tags.filter(tag => state.interests.includes(tag)); }
function sortedCompanies({ ignoreAtlas = false } = {}) {
  let list = companies.filter(company =>
    (state.view !== "saved" || state.saved.includes(company.id)) &&
    (state.program === "all" || state.program === company.program) &&
    (state.cohort === "all" || company.cohort === state.cohort) &&
    (company.program !== "yc" || state.program !== "yc" || state.ycFocus === "all" || (state.ycFocus === "hiring" ? company.isHiring : company.reviewed !== false || company.status === "Active")) &&
    (state.industry === "all" || company.tags.includes(state.industry)) &&
    (state.background === "all" || (state.background === "unknown" ? !backgrounds(company).length : backgrounds(company).includes(state.background))) &&
    (state.school === "all" || (state.school === "documented" ? schools(company).length > 0 : schools(company).some(([school]) => school === state.school)))
  );
  const q = state.query.trim().toLowerCase();
  if (q) list = list.filter(company => [company.name,company.mission,company.overview,company.problem,company.location,company.ycIndustry,...company.tags,...company.founders.map(f => f[0])].join(" ").toLowerCase().includes(q));
  if (!ignoreAtlas && state.sector !== "all") list = list.filter(company => companySector(company) === state.sector);
  if (!ignoreAtlas && state.theme !== "all") list = list.filter(company => companyTheme(company) === state.theme);
  list.sort((a,b) => state.mode === "personal" && hasPersonalText() ? (matchFor(b).score - matchFor(a).score || a.rank - b.rank) : a.rank - b.rank);
  return list;
}
function showToast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2400); }
function toggleSaved(id) {
  state.saved = state.saved.includes(id) ? state.saved.filter(x => x !== id) : [...state.saved,id];
  store("radar-saved", state.saved);
  showToast(state.saved.includes(id) ? "Added to saved companies" : "Removed from saved companies");
  render();
}
function renderInterests() {
  $("#interest-options").innerHTML = interests.map(interest => `<button type="button" class="interest-chip ${state.interests.includes(interest) ? "active" : ""}" data-interest="${escapeHtml(interest)}" aria-pressed="${state.interests.includes(interest)}">${escapeHtml(interest)}</button>`).join("");
}
function renderDiscoveryFilters() {
  const program = state.program;
  const cohorts = program === "yc" ? window.YC_BATCHES.map(entry => entry[0]) : program === "speedrun" ? ["SR007", "SR006", "SR005", "SR004", "SR003", "SR002", "SR001"] : [];
  $("#cohort-filter").innerHTML = `<option value="all">All cohorts (${companies.filter(company => program === "all" || company.program === program).length})</option>${cohorts.map(cohort => `<option value="${cohort}">${escapeHtml(cohort)} (${companies.filter(company => company.program === program && company.cohort === cohort).length})</option>`).join("")}`;
  $("#cohort-filter").value = state.cohort;
  $("#cohort-filter").disabled = state.program === "all";
  $("#yc-focus-filter").value = state.ycFocus;
  $("#yc-focus-filter").hidden = state.program !== "yc";
  $(".yc-focus-label").hidden = state.program !== "yc";
  $("#yc-load-status").hidden = state.program === "speedrun";
  $("#founder-load-status").hidden = state.program === "speedrun";
  const tags = [...new Set(companies.flatMap(company => company.tags))].sort((a,b) => a.localeCompare(b));
  $("#industry-filter").innerHTML = `<option value="all">All industries</option>${tags.map(tag => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)} (${companies.filter(company => company.tags.includes(tag)).length})</option>`).join("")}`;
  $("#industry-filter").value = state.industry;
  $("#background-filter").innerHTML = `<option value="all">All backgrounds</option>${backgroundOptions.map(tag => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)} (${companies.filter(company => backgrounds(company).includes(tag)).length})</option>`).join("")}<option value="unknown">Not yet documented (${companies.filter(company => !backgrounds(company).length).length})</option>`;
  $("#background-filter").value = state.background;
  const schoolScope = companies.filter(company => (state.program === "all" || company.program === state.program) && (state.cohort === "all" || company.cohort === state.cohort));
  const schoolNames = [...new Set(schoolScope.flatMap(company => schools(company).map(([school]) => school)))].sort((a,b) => a.localeCompare(b));
  const countSchoolFounders = school => new Set(schoolScope.flatMap(company => schools(company)
    .filter(([name]) => !school || name === school)
    .map(([, founder]) => `${company.program}:${company.cohort}:${company.name}:${founder.toLowerCase()}`))).size;
  const documentedFounders = countSchoolFounders();
  const listedFounders = new Set(schoolScope.flatMap(company => company.founders.map(([founder]) => `${company.program}:${company.cohort}:${company.name}:${founder.toLowerCase()}`))).size;
  $("#school-filter").innerHTML = `<option value="all">Any school</option><option value="documented">School documented (${documentedFounders} of ${listedFounders} founders)</option>${schoolNames.map(school => { const count = countSchoolFounders(school); return `<option value="${escapeHtml(school)}">${escapeHtml(school)} (${count} ${count === 1 ? "founder" : "founders"})</option>`; }).join("")}`;
  $("#school-filter").value = state.school;
  const documentedTeams = schoolScope.filter(company => schools(company).length).length;
  $("#school-coverage").textContent = state.school !== "all" && state.school !== "documented"
    ? `${countSchoolFounders(state.school)} documented ${countSchoolFounders(state.school) === 1 ? "founder" : "founders"} from ${state.school} across ${schoolScope.filter(company => schools(company).some(([school]) => school === state.school)).length} teams. School known for ${documentedFounders} of ${listedFounders} listed founders.`
    : `School known for ${documentedFounders} of ${listedFounders} listed founders across ${documentedTeams} of ${schoolScope.length} teams. This is incomplete.`;
}
function renderAtlas(list) {
  const groups = sectors.map((sector, index) => ({ sector, index: index + 1, companies: list.filter(company => companySector(company) === index + 1) }));
  const maxCount = Math.max(1, ...groups.map(group => group.companies.length));
  const selected = list.find(company => company.id === state.selected);
  const personal = state.mode === "personal" && hasPersonalText();
  const focus = selected ? `<div class="atlas-focus">${logoMarkup(selected, "map-logo")}<div><span>In focus · ${escapeHtml(sectors[companySector(selected)-1].name)}</span><strong>${escapeHtml(selected.name)}</strong><p>${escapeHtml(selected.mission)}</p></div><button type="button" data-select="${escapeHtml(selected.id)}">Explore team ↗</button></div>` : "";
  const panel = $("#radar-map");
  panel.classList.toggle("atlas-drilled", state.sector !== "all");
  if (state.sector === "all") {
    const spectrum = groups.filter(group => group.companies.length).map(group => `<span style="width:${group.companies.length / list.length * 100}%;background:${group.sector.color}" title="${escapeHtml(group.sector.name)}: ${group.companies.length} teams"></span>`).join("");
    const cards = groups.map(group => {
      const count = group.companies.length;
      const samples = group.companies.slice(0, 2);
      const preview = samples.length ? `<span class="atlas-area-preview">${samples.map(company => logoMarkup(company, "atlas-small-logo")).join("")}<span>${personal ? `Closest text match: ${escapeHtml(samples[0].name)}` : samples.map(company => escapeHtml(company.name)).join(" / ")}</span></span>` : `<span class="atlas-area-preview atlas-no-teams">No teams in this view</span>`;
      return `<button type="button" class="atlas-area" data-sector="${group.index}" style="--area:${group.sector.color};--share:${Math.max(2, count / maxCount * 100)}%" ${count ? "" : "disabled"} aria-label="Explore ${escapeHtml(group.sector.name)}, ${count} ${count === 1 ? "company" : "companies"}"><span class="atlas-area-top"><span class="atlas-area-signal"></span><span>${count.toLocaleString()} teams</span></span><strong>${escapeHtml(group.sector.name)}</strong>${preview}<span class="atlas-area-bar"><i></i></span></button>`;
    }).join("");
    panel.innerHTML = `<div class="atlas-head"><div><span class="atlas-overline">Radar atlas</span><h3>Explore the landscape<span>.</span></h3><p>${personal ? "Your strongest text matches lead each area. Pick one to see its topics and teams." : "Start with an area of work. Open it to see the topics and teams inside."}</p></div><div class="atlas-total"><strong>${list.length.toLocaleString()}</strong><span>teams in view</span></div></div><div class="atlas-distribution"><span>Where teams are building</span><div class="atlas-spectrum" aria-hidden="true">${spectrum}</div></div><div class="atlas-grid">${cards}</div>${focus}`;
    return;
  }
  const active = groups[state.sector - 1];
  const themes = new Map();
  for (const company of active.companies) {
    const name = companyTheme(company);
    if (!themes.has(name)) themes.set(name, []);
    themes.get(name).push(company);
  }
  const rankedThemes = [...themes].sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  const themeButton = ([name, companies]) => `<button type="button" class="atlas-topic ${state.theme === name ? "active" : ""}" data-theme="${escapeHtml(name)}" aria-pressed="${state.theme === name}"><span>${escapeHtml(name)}</span><strong>${companies.length.toLocaleString()}</strong></button>`;
  const visibleThemes = rankedThemes.slice(0, 8);
  if (state.theme !== "all" && !visibleThemes.some(([name]) => name === state.theme)) {
    const selectedTheme = rankedThemes.find(([name]) => name === state.theme);
    if (selectedTheme) visibleThemes.push(selectedTheme);
  }
  const extraThemes = rankedThemes.filter(([name]) => !visibleThemes.some(([visible]) => visible === name));
  panel.innerHTML = `<div class="atlas-head atlas-head-detail"><div><button type="button" class="atlas-back" data-sector="all">← All areas</button><span class="atlas-overline" style="--area:${active.sector.color}">Area of work</span><h3>${escapeHtml(active.sector.name)}<span>.</span></h3><p>${active.companies.length.toLocaleString()} teams in this area. Narrow to a topic, then explore the companies below.</p></div><div class="atlas-total"><strong>${active.companies.length.toLocaleString()}</strong><span>in this area</span></div></div><div class="atlas-topic-section"><div class="atlas-topic-heading"><h4>Topics inside ${escapeHtml(active.sector.name)}</h4><button type="button" class="atlas-topic-all ${state.theme === "all" ? "active" : ""}" data-theme="all" aria-pressed="${state.theme === "all"}">All ${active.companies.length.toLocaleString()}</button></div><div class="atlas-topic-grid">${visibleThemes.map(themeButton).join("")}</div>${extraThemes.length ? `<details class="atlas-more"><summary>Show ${extraThemes.length} more topics</summary><div class="atlas-topic-grid">${extraThemes.map(themeButton).join("")}</div></details>` : ""}${!rankedThemes.length ? `<p class="atlas-empty">No teams match the current filters. Try another cohort or search.</p>` : ""}</div>${focus}`;
}
function renderCards(list) {
  $("#results-label").textContent = `${list.length} ${list.length === 1 ? "company" : "companies"}${state.sector === "all" ? " to explore" : ` in ${state.theme === "all" ? sectors[state.sector - 1].name : state.theme}`}`;
  $("#result-total").textContent = String(list.length).padStart(2,"0");
  $("#sort-label").textContent = state.mode === "shared" ? `${list.filter(company => company.reviewed !== false).length} researched picks, then cohort A–Z` : hasPersonalText() ? "Ordered by text overlap" : "Add interests or experience to tune your order";
  if (!list.length) {
    $("#company-list").innerHTML = `<div class="empty-state"><h3>${state.view === "saved" && !state.saved.length ? "Your shortlist starts here" : "No companies found"}</h3><p>${state.view === "saved" && !state.saved.length ? "Save a team that catches your eye and return to it here." : "Try another search or broaden your filters."}</p><button type="button" id="reset-results">${state.view === "saved" && !state.saved.length ? "Explore companies" : "Clear filters"}</button></div>`;
    return;
  }
  $("#company-list").innerHTML = list.slice(0,state.visibleLimit).map((company,index) => {
    const connection = state.mode === "personal" && hasPersonalText() ? matchFor(company) : null;
    const evidence = connection ? [...new Set([...connection.interest.terms,...connection.experience.terms])].slice(0,3) : [];
    return `<article class="company-card ${state.selected === company.id ? "selected" : ""}">
      <span class="rank">${state.mode === "shared" && company.reviewed === false ? "·" : String(index+1).padStart(2,"0")}</span><div class="card-main">
      <div class="card-top">${logoMarkup(company)}<button type="button" class="card-title" data-select="${company.id}">${escapeHtml(company.name)}</button><button type="button" class="card-save ${state.saved.includes(company.id) ? "saved" : ""}" data-save="${company.id}" aria-label="${state.saved.includes(company.id) ? "Remove" : "Save"} ${escapeHtml(company.name)}" aria-pressed="${state.saved.includes(company.id)}">${state.saved.includes(company.id) ? "♥" : "♡"}</button></div>
      <div class="card-meta"><span class="program-pill ${company.program}">${programName(company)}</span><span>${escapeHtml(company.cohort)}</span><i class="meta-sep"></i><span>${escapeHtml(company.location)}</span></div>
      <p class="card-mission">${escapeHtml(company.mission)}</p><p class="card-note">${company.note ? escapeHtml(company.note) : company.founders.length ? `Founders: ${escapeHtml(company.founders.map(founder => founder[0]).join(", "))}` : company.program === "yc" ? `${escapeHtml(company.ycIndustry || company.tags[0])}${company.isHiring ? " · YC lists roles" : ""}` : "Founder names not listed in the public record"}</p>
      <div class="card-bottom"><span class="topic">${escapeHtml(company.tags[0])}</span>${evidence.length ? `<span class="personal-tag">Shared: ${evidence.map(escapeHtml).join(" · ")}</span>` : ""}<button type="button" class="card-open" data-select="${company.id}">Explore team <span aria-hidden="true">↗</span></button></div>
      </div></article>`;
  }).join("") + (list.length > state.visibleLimit ? `<button type="button" class="load-more" id="load-more">Show more companies <span>${Math.min(state.visibleLimit,list.length)} of ${list.length}</span></button>` : "");
}
function renderDetail(company) {
  const detail = $("#detail-panel");
  if (!company) { detail.innerHTML = ""; return; }
  const saved = state.saved.includes(company.id);
  const matched = matches(company);
  const context = companyContext(company);
  const schoolRecords = schools(company);
  const overview = context.overview?.startsWith(company.mission) ? context.overview.slice(company.mission.length).trim() : context.overview;
  const connection = state.mode === "personal" && hasPersonalText() ? matchFor(company) : null;
  const related = textIndex.related(company,companies,3);
  detail.innerHTML = `<div class="detail-inner">
    <div class="detail-head"><div class="detail-ident">${logoMarkup(company,"detail-logo")}<div><span class="detail-eyebrow">${programName(company)} / ${company.cohort}</span><h2>${escapeHtml(company.name)}</h2><div class="detail-small">${escapeHtml(company.location)} · ${company.teamSize == null ? "Team size not listed" : `${company.teamSize} people`}</div></div></div><button type="button" class="detail-close" aria-label="Close company details">×</button></div>
    <div class="detail-actions"><a class="primary-link" href="${company.website || company.source}" target="_blank" rel="noopener noreferrer">${company.website ? "Visit company" : "View profile"} <span aria-hidden="true">↗</span></a><button type="button" class="secondary-button ${saved ? "saved" : ""}" data-save="${company.id}">${saved ? "♥ Saved" : "♡ Save team"}</button></div>
    <section class="detail-section"><h3>The mission</h3><p>${escapeHtml(company.mission)}</p>${company.problem ? `<div class="mission-block"><span>The problem they are tackling</span><p>${escapeHtml(company.problem)}</p></div>` : ""}${overview && overview.length > 24 ? `<div class="profile-context"><span>Inside the company</span><p>${escapeHtml(overview)}</p><a href="${company.source}" target="_blank" rel="noopener noreferrer">Read the public profile ↗</a></div>` : ""}${context.officialOverview ? `<div class="team-voice"><span>From the team</span><p>${escapeHtml(context.officialOverview)}</p><a href="${context.officialUrl}" target="_blank" rel="noopener noreferrer">View a16z profile ↗</a></div>` : ""}</section>
    <section class="detail-section"><h3>${company.note ? "Why look closer" : "Areas of work"}</h3><p>${company.note ? escapeHtml(company.note) : escapeHtml(company.tags.join(" · "))}${state.mode === "personal" && matched.length ? ` Your selected interests overlap with ${matched.map(escapeHtml).join(" and ")}.` : ""}</p></section>
    ${connection ? `<section class="detail-section connection-section"><h3>Your connection</h3><p class="connection-intro">Public company text compared with the interests and experience you entered.</p>${personalText().trim() ? `<div class="connection-row"><span>Interests</span><strong>${connection.interest.terms.length ? connection.interest.terms.slice(0,5).map(escapeHtml).join(" · ") : "No clear text overlap"}</strong></div>` : ""}${state.resumeText.trim() ? `<div class="connection-row"><span>Experience</span><strong>${connection.experience.terms.length ? connection.experience.terms.slice(0,5).map(escapeHtml).join(" · ") : "No clear text overlap"}</strong></div>` : ""}<p class="connection-caveat">Text overlap helps you explore; it does not judge your qualifications or the team's success.</p></section>` : ""}
    <section class="detail-section"><h3>The team</h3><div class="background-badges">${backgrounds(company).length ? backgrounds(company).map(tag => `<span>${escapeHtml(tag)}</span>`).join("") : `<span class="background-unknown">Background not yet documented</span>`}</div>${backgrounds(company).length ? `<p class="background-caption">Tags describe at least one founder, based on public profile details.</p>` : ""}${company.founders.length ? company.founders.map(founder => { const details = context.founderDetails?.[founder[0]] || {}; return `<div class="founder"><div class="avatar" aria-hidden="true">${founder[0].split(" ").map(part => part[0]).slice(0,2).join("")}</div><div><a class="founder-link" href="${founder[3] || founderLinks[founder[0]] || company.source}" target="_blank" rel="noopener noreferrer">${escapeHtml(founder[0])} ↗</a><span>${escapeHtml(founder[1] === "Founder" && details.role ? details.role : founder[1])}</span>${founder[2] || details.bio ? `<p>${escapeHtml(founder[2] || details.bio)}</p>` : ""}</div></div>`; }).join("") : `<p>The batch directory does not include founder names. Open the YC company profile to learn about the team.</p>`}</section>
    <section class="detail-section"><h3>At a glance</h3><div class="detail-facts"><div><span>${context.founded ? "Founded" : "Cohort"}</span><strong>${context.founded || company.cohort}</strong></div><div><span>Public team size</span><strong>${company.teamSize == null ? "Not listed" : `${company.teamSize} ${company.teamSize === 1 ? "person" : "people"}`}</strong></div>${company.program === "yc" ? `<div><span>YC listing</span><strong>${company.status === "Inactive" ? "Inactive" : company.isHiring ? "Hiring" : "Active"}</strong></div>` : ""}</div><p class="detail-disclaimer">Snapshot details can change. Check the linked profile for updates.</p></section>
    ${related.length ? `<section class="detail-section related-section"><h3>Nearby teams</h3><p>Similar language in their public profiles.</p><div class="related-list">${related.map(item => `<button type="button" data-related="${item.company.id}"><strong>${escapeHtml(item.company.name)}</strong><span>${escapeHtml(programName(item.company))} · ${escapeHtml(item.company.cohort)}</span><small>${escapeHtml(item.company.mission)}</small></button>`).join("")}</div></section>` : ""}
    <section class="detail-section"><h3>Go deeper</h3><div class="source-list"><a href="${company.source}" target="_blank" rel="noopener noreferrer">${company.program === "speedrun" && company.cohort !== "SR007" ? "Public company record" : "Program profile"} ↗</a>${context.officialUrl ? `<a href="${context.officialUrl}" target="_blank" rel="noopener noreferrer">a16z company profile ↗</a>` : company.program === "speedrun" && company.cohort !== "SR007" ? `<a href="https://speedrun.a16z.com/companies?cohort=${company.cohort}" target="_blank" rel="noopener noreferrer">a16z cohort ↗</a>` : ""}<a href="${company.jobsUrl}" target="_blank" rel="noopener noreferrer">${company.program === "yc" ? "Check roles" : company.website ? "Company site" : "Company record"} ↗</a></div><p class="detail-disclaimer">${company.reviewed === false ? company.program === "yc" ? "Company facts come from a public YC directory mirror. Hiring and activity can change; check the YC profile before reaching out." : company.cohort === "SR007" ? "Cohort facts come from public a16z profiles. The short mission line is the company's own description or a concise Radar paraphrase." : "Archived cohort facts and the shortened description come from the linked public company record. Check the company site for current details." : "Mission summaries and the “why look closer” note are Radar interpretations of the linked public profile."}</p></section>
  </div>`;
  const schoolMarkup = `<section class="detail-section founder-schools"><h3>Founder schools</h3>${schoolRecords.length ? schoolRecords.map(([school, founder]) => `<a href="${escapeHtml(context.officialUrl || company.source)}" target="_blank" rel="noopener noreferrer"><strong>${escapeHtml(school)}</strong><span>${escapeHtml(founder)} ↗</span></a>`).join("") : `<p>Not yet documented in the public profiles we have.</p>`}</section>`;
  const founderProvenance = company.program === "yc" && company.founders.length
    ? `<p class="founder-source-caption">${company.founderSource === "snapshot" ? `Names and roles from an August 2026 public directory snapshot. <a href="${escapeHtml(company.source)}" target="_blank" rel="noopener noreferrer">Check the current YC profile ↗</a>` : `Founder details reviewed from the linked YC company profile.`}</p>`
    : "";
  detail.innerHTML = detail.innerHTML.replace('<section class="detail-section"><h3>At a glance</h3>', `${founderProvenance}${schoolMarkup}<section class="detail-section"><h3>At a glance</h3>`);
}
function render() {
  const list = sortedCompanies();
  if (!list.some(company => company.id === state.selected)) state.selected = list[0]?.id ?? null;
  renderInterests(); renderDiscoveryFilters(); renderAtlas(sortedCompanies({ ignoreAtlas: true })); renderCards(list); renderDetail(list.find(company => company.id === state.selected));
  $("#saved-count").textContent = state.saved.length;
  $$("[data-count]").forEach(el => { el.textContent = el.dataset.count === "all" ? companies.length : companies.filter(company => company.program === el.dataset.count).length; });
  $$(".mode").forEach(el => { const active = el.dataset.mode === state.mode; el.classList.toggle("active",active); el.setAttribute("aria-pressed",String(active)); });
  $$(".filter").forEach(el => el.classList.toggle("active",el.dataset.program === state.program));
  $$(".nav-link").forEach(el => el.classList.toggle("active",el.dataset.view === state.view));
}

document.addEventListener("click", event => {
  const target = event.target.closest("button"); if (!target) return;
  if (target.dataset.view) { state.view = target.dataset.view; render(); }
  if (target.dataset.mode) { state.mode = target.dataset.mode; render(); if (state.mode === "personal" && !hasPersonalText()) showToast("Add interests or experience to tune your order"); }
  if (target.dataset.program) { state.program = target.dataset.program; state.cohort = state.program === "yc" ? "Summer 2026" : state.program === "speedrun" ? "SR007" : "all"; state.school = "all"; state.sector = "all"; state.theme = "all"; state.visibleLimit = 80; render(); }
  if (target.dataset.sector) { state.sector = target.dataset.sector === "all" ? "all" : Number(target.dataset.sector); state.theme = "all"; state.visibleLimit = 80; render(); }
  if (target.dataset.theme) { state.theme = target.dataset.theme; state.visibleLimit = 80; render(); }
  if (target.dataset.interest) { const value = target.dataset.interest; state.interests = state.interests.includes(value) ? state.interests.filter(x => x !== value) : [...state.interests,value]; store("radar-interests",state.interests); render(); }
  if (target.dataset.select) { state.selected = target.dataset.select; render(); $("#detail-panel").classList.add("open"); $("#detail-panel").scrollTop = 0; }
  if (target.dataset.related) { state.program = "all"; state.cohort = "all"; state.industry = "all"; state.background = "all"; state.school = "all"; state.sector = "all"; state.theme = "all"; state.query = ""; $("#search").value = ""; state.selected = target.dataset.related; render(); $("#detail-panel").classList.add("open"); $("#detail-panel").scrollTop = 0; }
  if (target.dataset.save) toggleSaved(target.dataset.save);
  if (target.id === "find-connections") { state.interestText = $("#interest-text").value.trim().slice(0,3000); state.resumeText = $("#resume-text").value.trim().slice(0,15000); if (!hasPersonalText()) { showToast("Add an interest or some experience first"); $("#interest-text").focus(); return; } state.mode = "personal"; state.visibleLimit = 80; render(); $("#match-status").textContent = "Connections use term overlap in public company descriptions. Your text stays in this browser."; }
  if (target.id === "clear-connections") { state.interestText = ""; state.resumeText = ""; $("#interest-text").value = ""; $("#resume-text").value = ""; $("#resume-file").value = ""; $("#match-status").textContent = "Text cleared. Your selected interest chips still apply."; render(); }
  if (target.id === "load-more") { state.visibleLimit += 80; renderCards(sortedCompanies()); }
  if (target.id === "retry-yc") refreshYcArchive();
  if (target.id === "reset-results") { if (state.view === "saved" && !state.saved.length) state.view = "explore"; state.program = "all"; state.cohort = "all"; state.industry = "all"; state.background = "all"; state.school = "all"; state.sector = "all"; state.theme = "all"; state.query = ""; $("#search").value = ""; render(); }
  if (target.id === "method-link") { const note = $(".method-note"); let extra = note.querySelector(".method-extra"); if (!extra) { extra = document.createElement("p"); extra.className = "method-extra"; extra.textContent = "Shared order puts six researched notes first. For you uses BM25 term matching on public company text, giving your interests more weight than resume experience. Nearby teams use TF-IDF cosine similarity. There is no AI-generated fit verdict."; note.append(extra); target.textContent = "Hide the approach ↑"; } else { extra.remove(); target.innerHTML = 'See the approach <span aria-hidden="true">↗</span>'; } }
  if (target.classList.contains("detail-close")) $("#detail-panel").classList.remove("open");
});
$("#search").addEventListener("input", event => { state.query = event.target.value; render(); });
$("#industry-filter").addEventListener("change", event => { state.industry = event.target.value; state.sector = "all"; state.theme = "all"; render(); });
$("#cohort-filter").addEventListener("change", event => { state.cohort = event.target.value; state.school = "all"; state.sector = "all"; state.theme = "all"; render(); });
$("#yc-focus-filter").addEventListener("change", event => { state.ycFocus = event.target.value; render(); });
$("#background-filter").addEventListener("change", event => { state.background = event.target.value; render(); });
$("#school-filter").addEventListener("change", event => { state.school = event.target.value; render(); });
async function readResumeFile(file) {
  if (!/\.pdf$/i.test(file.name)) return file.text();
  const pdfjs = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  try {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages,12); pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map(item => `${item.str || ""}${item.hasEOL ? "\n" : " "}`).join(""));
    }
    return pages.join("\n\n");
  } finally { await pdf.destroy(); }
}
$("#resume-file").addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!/\.(pdf|txt|text|md)$/i.test(file.name) || file.size > 5_000_000) { $("#match-status").textContent = "Choose a .pdf, .txt or .md file under 5 MB, or paste resume text above."; event.target.value = ""; return; }
  $("#match-status").textContent = "Reading resume in this browser…";
  try {
    const extracted = (await readResumeFile(file)).trim();
    if (!extracted) throw new Error("No selectable text");
    $("#resume-text").value = extracted.slice(0,15000);
    $("#match-status").textContent = "Resume text added. Choose Find connections to compare it with companies.";
  } catch { $("#match-status").textContent = "Could not read selectable text. Paste the resume text above instead."; }
});
document.addEventListener("error", event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.closest(".company-logo")) return;
  if (image.dataset.fallback && image.src !== image.dataset.fallback) { image.src = image.dataset.fallback; image.dataset.fallback = ""; }
  else image.hidden = true;
}, true);
document.addEventListener("keydown", event => { if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#search").focus(); } if (event.key === "Escape") $("#detail-panel").classList.remove("open"); });
rebuildTextIndex();
render();
let ycLoading = false;
async function refreshYcArchive() {
  if (ycLoading) return;
  ycLoading = true;
  const status = $("#yc-load-status");
  const founderStatus = $("#founder-load-status");
  founderStatus.textContent = "Loading public founder details…";
  status.textContent = "Loading YC batches from public profiles…";
  try {
    const founderIndexPromise = window.YCFounderSnapshot?.load().catch(() => null) || Promise.resolve(null);
    const { records, failedBatches } = await window.loadYcArchive();
    const founderIndex = await founderIndexPromise;
    const knownSources = new Set(reviewedCompanies.filter(company => company.program === "yc").map(company => company.source.replace(/\/$/, "")));
    const batchOrder = new Map(window.YC_BATCHES.map(([batch], index) => [batch,index]));
    const imported = records.filter(company => !knownSources.has(company.source.replace(/\/$/, "")))
      .sort((a,b) => batchOrder.get(a.cohort) - batchOrder.get(b.cohort) || a.name.localeCompare(b.name))
      .map((company,index) => {
        const snapshotFounders = !company.founders.length && founderIndex ? window.YCFounderSnapshot.forCompany(founderIndex, company) : [];
        return { ...company, founders: company.founders.length ? company.founders : snapshotFounders,
          founderSource: company.founders.length ? "reviewed" : snapshotFounders.length ? "snapshot" : null,
          rank: 100 + batchOrder.get(company.cohort) * 1000 + index };
      });
    companies = [...reviewedCompanies, ...importedCompanies, ...imported];
    rebuildTextIndex();
    status.innerHTML = failedBatches.length
      ? `${records.length} YC records loaded; ${failedBatches.length} ${failedBatches.length === 1 ? "batch" : "batches"} unavailable. <button type="button" id="retry-yc">Retry</button>`
      : `${records.length} YC records loaded across Winter 2023–Fall 2026.`;
    const founderCount = imported.filter(company => company.founders.length).length;
    founderStatus.innerHTML = founderIndex
      ? `Founder names found for ${founderCount} of ${imported.length} imported YC teams. <a href="https://github.com/LdwS123/startup-portfolio-scrapers" target="_blank" rel="noopener noreferrer">Snapshot: August 2026 ↗</a> Check YC for updates.`
      : `${founderCount} imported YC teams have reviewed founder profiles. The wider founder snapshot is unavailable right now.`;
    render();
  } catch {
    status.innerHTML = `YC archive could not load. <button type="button" id="retry-yc">Retry</button>`;
    founderStatus.textContent = "";
  } finally { ycLoading = false; }
}
if (typeof fetch === "function" && window.loadYcArchive) refreshYcArchive();
else $("#yc-load-status").textContent = "YC archive requires an internet connection.";
