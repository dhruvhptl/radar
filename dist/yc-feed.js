// Publicly launched YC companies from the first batch after ChatGPT's November 2022 launch.
// Source: https://github.com/yc-oss/api (daily mirror of YC's public Algolia directory).
window.YC_BATCHES = [
  ["Fall 2026", "fall-2026"], ["Summer 2026", "summer-2026"],
  ["Spring 2026", "spring-2026"], ["Winter 2026", "winter-2026"],
  ["Fall 2025", "fall-2025"], ["Summer 2025", "summer-2025"],
  ["Spring 2025", "spring-2025"], ["Winter 2025", "winter-2025"],
  ["Fall 2024", "fall-2024"], ["Summer 2024", "summer-2024"],
  ["Winter 2024", "winter-2024"], ["Summer 2023", "summer-2023"],
  ["Winter 2023", "winter-2023"]
];

function ycTopic(record) {
  const subject = [record.industry, record.subindustry, ...(record.tags || [])].join(" ").toLowerCase();
  const has = expression => expression.test(subject);
  if (has(/defen[sc]e|cyber|security/)) return "Security";
  if (has(/climate|energy|carbon|sustainab/)) return "Climate";
  if (has(/health|biotech|drug|medical|therapeutic/)) return "Healthcare";
  if (has(/fintech|finance|bank|insurance|payment|crypto|lending/)) return "Fintech";
  if (has(/gaming|video game|game development/)) return "Gaming";
  if (has(/media|entertainment|content|creator/)) return "Media";
  if (has(/robot|manufactur|aerospace|space|hardware|industrial|drone|agricultur/)) return "Robotics";
  if (has(/developer|dev tools|code|programming|software engineering/)) return "Developer tools";
  if (has(/infrastructure|machine learning|large language model|model training/)) return "AI infrastructure";
  if (has(/commerce|retail|marketplace|shopping/)) return "Commerce";
  if (has(/education|travel|consumer|social/)) return "Consumer";
  return "Future of work";
}

function ycHttps(value, host) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (!host || url.hostname === host) ? url.href : "";
  } catch { return ""; }
}

window.normalizeYcCompany = function normalizeYcCompany(record) {
  if (!record || !record.id || !record.name || !record.batch || !record.url) return null;
  const source = ycHttps(record.url, "www.ycombinator.com");
  if (!source) return null;
  const overview = String(record.long_description || "").replace(/\s+/g, " ").trim();
  const mission = String(record.one_liner || "").replace(/\s+/g, " ").trim() || overview.split(/[.!?]\s/)[0] || "Explore this company's YC profile.";
  const topic = ycTopic(record);
  const rawTags = Array.isArray(record.tags) ? record.tags : [];
  const tags = [topic];
  if (rawTags.some(tag => /\b(ai|artificial intelligence|generative ai)\b/i.test(tag)) && topic !== "AI infrastructure") tags.push("AI applications");
  const industry = String(record.subindustry || record.industry || "").split(" -> ").pop();
  if (industry && industry !== "B2B" && industry !== topic) tags.push(industry);
  const location = String(record.all_locations || "").split(";")[0].trim() || "Location not listed";
  const teamSize = Number(record.team_size) > 0 ? Number(record.team_size) : null;
  const reviewedFounders = window.YC_FOUNDER_PROFILES?.[`${record.batch}:${record.name}`];
  return {
    id: `yc-${record.id}`, name: String(record.name), program: "yc", cohort: record.batch,
    location, teamSize, tags: [...new Set(tags)], rank: 10000, reviewed: false,
    mission, overview, problem: null, note: null,
    founders: reviewedFounders ? reviewedFounders.map(founder => [founder.name, founder.role, founder.bio]) : [...new Set((window.RADAR_SCHOOLS?.[`${record.batch}:${record.name}`] || []).map(([, founder]) => founder))].map(name => [name, "Founder", ""]),
    funding: "Amount not listed", jobs: record.isHiring ? "YC lists roles" : "Check YC profile",
    website: ycHttps(record.website), jobsUrl: `${source}/jobs`, source,
    logo: ycHttps(record.small_logo_thumb_url), status: record.status || "Unknown",
    isHiring: Boolean(record.isHiring), ycIndustry: record.subindustry || record.industry || ""
  };
};

window.loadYcArchive = async function loadYcArchive() {
  const results = await Promise.allSettled(window.YC_BATCHES.map(async ([batch, slug]) => {
    const response = await fetch(`https://yc-oss.github.io/api/batches/${slug}.json`);
    if (!response.ok) throw new Error(`${batch}: HTTP ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error(`${batch}: invalid data`);
    return rows.filter(row => row.batch === batch).map(window.normalizeYcCompany).filter(Boolean);
  }));
  const records = results.flatMap(result => result.status === "fulfilled" ? result.value : []);
  const failedBatches = results.flatMap((result, index) => result.status === "rejected" ? [window.YC_BATCHES[index][0]] : []);
  return { records, failedBatches };
};
