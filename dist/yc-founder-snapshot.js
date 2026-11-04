// Public founder names and roles from an August 2026 YC directory snapshot.
// https://github.com/LdwS123/startup-portfolio-scrapers
// Reviewed official YC profile bios in yc-founders.js take precedence.
(function () {
  const base = "https://raw.githubusercontent.com/LdwS123/startup-portfolio-scrapers/main/data/";
  const files = ["yc_hiring.csv", "yc_not_hiring.csv"];
  let pending;

  function parseCsv(text) {
    const rows = [];
    let row = [], value = "", quoted = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"' && text[i + 1] === '"') { value += '"'; i++; }
        else if (char === '"') quoted = false;
        else value += char;
      } else if (char === '"') quoted = true;
      else if (char === ',') { row.push(value); value = ""; }
      else if (char === '\n') { row.push(value); if (row.some(Boolean)) rows.push(row); row = []; value = ""; }
      else if (char !== '\r') value += char;
    }
    row.push(value);
    if (row.some(Boolean)) rows.push(row);
    return rows;
  }

  function linkedinUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && /(^|\.)linkedin\.com$/i.test(url.hostname) ? url.href : "";
    } catch { return ""; }
  }

  function load() {
    if (pending) return pending;
    pending = Promise.allSettled(files.map(async file => {
      const response = await fetch(base + file);
      if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
      return parseCsv(await response.text());
    })).then(results => {
      const index = new Map();
      let loaded = 0;
      for (const result of results) {
        if (result.status !== "fulfilled") continue;
        loaded++;
        for (const fields of result.value.slice(1)) {
          const [,,, company, domain,, title, linkedin,,,, batch] = fields;
          const name = fields[2]?.trim();
          if (!company || !batch || !name || !domain) continue;
          const key = `${batch.trim().toLowerCase()}\u0000${company.trim().toLowerCase()}`;
          if (!index.has(key)) index.set(key, []);
          const founders = index.get(key);
          if (founders.some(founder => founder.name.toLowerCase() === name.toLowerCase())) continue;
          founders.push({ name, role: title?.trim() || "Founder", linkedin: linkedinUrl(linkedin?.trim()), domain: domain.trim().toLowerCase() });
        }
      }
      if (!loaded) throw new Error("Founder snapshot unavailable");
      return index;
    }).catch(error => { pending = undefined; throw error; });
    return pending;
  }

  function forCompany(index, company) {
    const key = `${company.cohort.toLowerCase()}\u0000${company.name.toLowerCase()}`;
    const rows = index.get(key) || [];
    let domain = "";
    try { domain = new URL(company.website).hostname.replace(/^www\./, "").toLowerCase(); } catch {}
    const matched = domain ? rows.filter(row => row.domain.replace(/^www\./, "") === domain) : [];
    return matched.map(row => [row.name, row.role, "", row.linkedin]);
  }

  window.YCFounderSnapshot = { load, forCompany, parseCsv };
})();
