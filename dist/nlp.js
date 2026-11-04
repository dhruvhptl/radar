// Deterministic, local text matching. No profile text leaves the browser.
(function () {
  const stop = new Set(`a an and are as at be been by can could do does for from has have in into is it its of on or our out that the their them there these they this to we what when where who will with you your
    about across after all also any based better building builds built company companies customer customers data early end experience first founder founders help helping how including industry inside looking make making more new now one people platform problem product products public team teams technology tool tools use used using want work works world year years startup startups
    artificial intelligence software solution service services system systems business businesses`.split(/\s+/));
  const aliases = new Map(Object.entries({
    robotics: "robot", robots: "robot", robotic: "robot", llms: "llm", models: "model",
    agents: "agent", agentic: "agent", gpus: "gpu", developers: "developer",
    engineers: "engineer", engineering: "engineer", healthcare: "health",
    clinicians: "clinician", patients: "patient", games: "game", gaming: "game",
    simulations: "simulation", factories: "factory", manufacturing: "manufacture",
    payments: "payment", finances: "finance", financial: "finance",
    autonomous: "autonomy", automation: "automate", automated: "automate",
    researchers: "research", researching: "research", research: "research"
  }));

  function tokens(text) {
    const normalized = String(text || "").normalize("NFKD").toLowerCase()
      .replace(/\b(?:large language models?|llms?)\b/g, " llm ")
      .replace(/\bmachine learning\b/g, " machinelearning ")
      .replace(/\bml\b/g, " machinelearning ")
      .replace(/\bartificial intelligence\b/g, " ai ")
      .replace(/\bnatural language processing\b/g, " nlp ")
      .replace(/\bgenerative ai\b/g, " generativeai ")
      .replace(/[^a-z0-9]+/g, " ");
    return (normalized.match(/[a-z0-9]+/g) || []).map(token => aliases.get(token) || token)
      .filter(token => (token.length > 2 || ["ai","ux","vr","ar"].includes(token)) && !stop.has(token) && !/^\d+$/.test(token));
  }

  function companyText(company) {
    const founders = (company.founders || []).flatMap(founder => [founder[1], founder[2]]).join(" ");
    return [company.mission, company.mission, company.problem, company.overview,
      company.note, (company.tags || []).join(" "), (company.tags || []).join(" "),
      company.ycIndustry, founders].filter(Boolean).join(" ");
  }

  function createIndex(companies) {
    const docs = new Map();
    const frequency = new Map();
    let totalLength = 0;
    for (const company of companies) {
      const terms = tokens(companyText(company));
      const counts = new Map();
      for (const term of terms) counts.set(term, (counts.get(term) || 0) + 1);
      for (const term of counts.keys()) frequency.set(term, (frequency.get(term) || 0) + 1);
      docs.set(company.id, { counts, length: terms.length || 1 });
      totalLength += terms.length || 1;
    }
    const count = docs.size || 1;
    const averageLength = totalLength / count;
    const idf = term => Math.log(1 + (count - (frequency.get(term) || 0) + .5) / ((frequency.get(term) || 0) + .5));

    function query(text, limit) {
      const counts = new Map();
      for (const term of tokens(text)) if (frequency.has(term)) counts.set(term, (counts.get(term) || 0) + 1);
      return [...counts].sort((a,b) => (idf(b[0]) * Math.log1p(b[1])) - (idf(a[0]) * Math.log1p(a[1])))
        .slice(0,limit).map(([term, hits]) => ({ term, weight: idf(term) * (1 + Math.log(hits)) }));
    }

    function score(company, terms) {
      const doc = docs.get(company.id);
      if (!doc || !terms.length) return { score: 0, terms: [] };
      let total = 0;
      const matched = [];
      const normalizer = terms.reduce((sum,item) => sum + item.weight,0) || 1;
      for (const item of terms) {
        const hits = doc.counts.get(item.term) || 0;
        if (!hits) continue;
        const contribution = item.weight * (hits * 2.2) / (hits + 1.2 * (.25 + .75 * doc.length / averageLength));
        total += contribution;
        matched.push({ term: item.term, contribution });
      }
      matched.sort((a,b) => b.contribution - a.contribution);
      return { score: total / normalizer, terms: matched.slice(0,5).map(item => item.term) };
    }

    function prepare(interests, resume) {
      const interestTerms = query(interests,35);
      const resumeTerms = query(resume,65);
      const hasInterests = interestTerms.length > 0;
      const hasResume = resumeTerms.length > 0;
      const weight = hasInterests && hasResume ? [.72,.28] : hasInterests ? [1,0] : [0,1];
      return { interestTerms, resumeTerms, weight };
    }
    function matchPrepared(company, prepared) {
      const interest = score(company, prepared.interestTerms);
      const experience = score(company, prepared.resumeTerms);
      const weight = prepared.weight;
      return { score: interest.score * weight[0] + experience.score * weight[1], interest, experience };
    }
    function match(company, interests, resume) { return matchPrepared(company,prepare(interests,resume)); }

    const vectors = new Map();
    for (const [id,doc] of docs) {
      const values = new Map();
      let norm = 0;
      for (const [term,hits] of doc.counts) {
        const value = (1 + Math.log(hits)) * idf(term);
        values.set(term,value); norm += value * value;
      }
      vectors.set(id,{ values, norm: Math.sqrt(norm) || 1 });
    }
    function related(company, candidates, limit = 3) {
      const source = vectors.get(company.id);
      if (!source) return [];
      return candidates.filter(other => other.id !== company.id).map(other => {
        const target = vectors.get(other.id);
        if (!target) return null;
        let dot = 0;
        const [small,large] = source.values.size < target.values.size ? [source.values,target.values] : [target.values,source.values];
        for (const [term,value] of small) dot += value * (large.get(term) || 0);
        return { company: other, score: dot / (source.norm * target.norm) };
      }).filter(item => item && item.score > .05).sort((a,b) => b.score - a.score).slice(0,limit);
    }
    return { prepare, matchPrepared, match, related, tokens };
  }

  window.RadarNLP = { createIndex, tokens };
})();
