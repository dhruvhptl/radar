# Radar prototype

Radar is a mission-first startup directory for people looking for teams they may want to work with. This prototype includes 322 a16z Speedrun cohort records across SR001–SR007 and publicly launched YC companies from Winter 2023 through Fall 2026, the batches after ChatGPT's November 2022 launch.

## Run locally

Open `dist/index.html` in a browser. The prototype has no build step or backend. Loading the expanded YC roster requires an internet connection; the three authored YC examples remain available offline.

## What works

- Browse or search the Speedrun archive and the post-2022 YC batches; filter by program and cohort.
- Focus the YC view on active teams, YC listings marked as hiring, or all company statuses. Hiring flags are snapshots, so check the linked YC profile before reaching out.
- Filter by industry tag or documented founder background. Background tags are conservative and come from explicit public founder bios; an untagged team is not assumed to lack that experience.
- Filter by a founder's school where a public bio explicitly describes study, a degree, graduation, or dropout. The reviewed school data currently covers 100 Speedrun companies and 17 YC companies. In SR007, 73 of 175 listed founders have verified school details. School option counts represent distinct documented founders, so two cofounders at one company count as two for their shared school. The filter still returns companies. Counts use the selected program and cohort; missing school data means not yet documented, not that a founder did not attend college. Company details name the founder and link to the public profile.
- Switch between a shared editorial order and a local text-matching order based on selected interests, a free-form interests note, and optional resume text.
- Explore related startups through TF-IDF similarity suggestions in each company panel. The panel shows which terms from your interests and experience overlap with its public text.
- Scan the topic atlas to see all 12 areas of work, company counts, and sample teams without sampling away records. Open an area, then a topic, to narrow the company list; existing program, cohort, founder, and interest filters continue to apply.
- Open a company to read its mission, longer public descriptions, founder roles and bios where available, founding year, team size, and source links.
- Save companies locally in the browser.
- Explore the atlas: twelve areas show how many teams work in each space. Open an area to see its more specific topics; opening a topic narrows the directory below.
- See official a16z logo assets for SR007. Other cohorts use the company site's icon; a monogram appears when an image is unavailable.

The default view covers both programs and all loaded cohorts. Switch to YC or Speedrun to focus on one program, then choose a cohort. The atlas groups every company in view without sampling; the directory shows 80 cards at a time, with more available on request. Six companies have a hand-written Radar research note. They appear first in shared order; the remaining companies follow newer cohorts before older ones. Personal order uses text overlap and shared order to break ties. Neither order predicts success. Funding is omitted when a verified current amount is unavailable.

## Personal matching

The **Find your connections** panel accepts free-form interests and pasted resume or experience text. It also reads `.pdf`, `.txt`, and `.md` files in the browser. PDF extraction loads a pinned [Mozilla PDF.js](https://github.com/mozilla/pdf.js) build from a CDN; scanned PDFs without selectable text need to be pasted or converted first. Radar does not upload or save the resume text. Interest chips are saved in browser storage, as before. **Clear text** removes the free-form interests and resume text from the page.

Radar tokenizes the public mission, description, tags, and available founder biographies. BM25 ranks companies by overlap with your terms, weighing interests at 72% and resume experience at 28% when both are present. TF-IDF cosine similarity identifies nearby teams from their public descriptions in the company panel. The labels show matching terms, not a probability of fit or a hiring prediction. Common terms are filtered; rare terms carry more weight. These methods cannot infer unstated interests, skills, or founder backgrounds.

SR001–SR006 come from GPAgent's public cohort pages dated September 25, 2026. SR007 is a public roster snapshot dated October 18, 2026, cross-checked against individual a16z Speedrun profiles on October 19, 2026. All 322 Speedrun records have expanded public descriptions in the detail panel. For 232 archived companies, the panel also links to a direct a16z company profile and uses public founder roles and bios where listed. Two archived records do not list founder names. Conservative founder background tags cover 88 archived companies and 30 SR007 companies, plus the three YC examples; an untagged team is not assumed to lack that experience. The deeper Radar research notes remain limited to the original six examples.

YC batch records load from [yc-oss/api](https://github.com/yc-oss/api), an unofficial daily mirror of YC's public directory. Only batches Winter 2023 through Fall 2026 are requested; each company links to its YC profile. The feed includes mission line, longer company description, logo, location, team size, industry, status, and hiring flag where available. It does not include founder names or bios. Radar separately loads founder names, roles, and LinkedIn links from an [August 2026 public snapshot](https://github.com/LdwS123/startup-portfolio-scrapers), matching both batch, company name, and company website domain. It has reviewed richer founder bios for 21 YC teams from their official profiles, including 17 with school details; those reviewed bios take priority. The three authored YC profiles keep their sourced founder details. Snapshot founder data needs an internet connection and may be outdated; the panel reports coverage and links to the current YC profile. Batch counts change as companies launch or update their listings.

## Sources

- [a16z Speedrun directory](https://speedrun.a16z.com/companies)
- [YC Startup Directory](https://www.ycombinator.com/companies)
- [YC public directory mirror](https://github.com/yc-oss/api)
- [SR001](https://www.gpagent.ai/speedrun/sr001), [SR002](https://www.gpagent.ai/speedrun/sr002), [SR003](https://www.gpagent.ai/speedrun/sr003), [SR004](https://www.gpagent.ai/speedrun/sr004), [SR005](https://www.gpagent.ai/speedrun/sr005), [SR006](https://www.gpagent.ai/speedrun/sr006), [SR007](https://www.gpagent.ai/speedrun/sr007)
- [Superset at YC](https://www.ycombinator.com/companies/superset)
- [Arctic Health at YC](https://www.ycombinator.com/companies/arctic-health)
- [Most Robotic at YC](https://www.ycombinator.com/companies/most-robotic)
- [Harbor AI at Speedrun](https://speedrun.a16z.com/companies/harbor-ai)
- [Corlen at Speedrun](https://speedrun.a16z.com/companies/corlen)
- [Rumbo at Speedrun](https://speedrun.a16z.com/companies/rumbo)

Next product decisions: define the real ranking rubric, decide how editorial judgments are reviewed, and choose how to keep source, founder, funding, and hiring data fresh. No resume upload or AI generation is implemented in this prototype.
