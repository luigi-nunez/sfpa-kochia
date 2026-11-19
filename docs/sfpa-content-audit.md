# sudanfpa.org content audit and integration notes

Retrieved 19 November 2026 from https://sudanfpa.org (Arabic default, English via `?lang=en`). This document records what was imported into the Kochia/SFPA web app, what was left out, and what SFPA must validate before the site is presented as authoritative.

## 1. What sudanfpa.org contains

sudanfpa.org is a WordPress site, Arabic-first, with an English toggle. Its pages are Home, About (من نحن), Departments (الإدارات), Projects, Branches, News, Partners (الشركاء), Statistics (الإحصائيات), and Contact (تواصل معنا).

| Area | What the site has | Reliability |
|---|---|---|
| History | Founded 1965 by obstetrics and gynaecology pioneers, in response to high maternal and infant mortality. IPPF member; one of the founders of IPPF/AWR. | Verified as published. Milestones after 1965 are absent. |
| Vision, mission, goals | One vision sentence, one mission sentence, four goals. English version exists. | Verified as published. |
| Values, leadership, board | Not present. | Missing. |
| Departments | Nine departments. Six have one-line descriptions; Health Services and Digital Interventions, Media and Behaviour Change, and Humanitarian Interventions have none. Each links to a team page. | Verified as published; incomplete. |
| Projects | Six programme areas, all marked "in progress". One or two sentences each. No objectives, locations, dates, partners, budgets, or results. | Verified as published; thin. Arabic only, even on the English site. |
| Branches | 15 branches in 14 states (North Kordofan has El Obeid and Umm Ruwaba). Each has a town, two named service points with a service type, and an OpenStreetMap embed. Three have a street-level address (Khartoum, Gedaref, Kassala). Every branch description reads "no description added yet". | Names and towns verified as published. Operational status unknown. Coordinates are town-level. |
| Branch phones and emails | +249-000-000-001 to -015 and `<branch>@sfpa.sd`. | Placeholder. Sequential zeros, and a different domain from sudanfpa.org. |
| Interactive map | "Interactive map" heading, a state filter, and a branches/service-points toggle. No service point is actually typed as a service point; every entry is a branch. | Partially built. |
| News | Two stories, both dated 8 July 2026: Khartoum women's workshops (more than 500 women) and a North Kordofan mobile clinic. One or two sentences each. | Published; same-day dates suggest bulk entry. |
| Partners | Six named: UNFPA, IPPF (strategic), Federal Ministry of Health (government), WHO, UNICEF, UNHCR (international). No links. | Verified as published. The statistics page claims 25. |
| Statistics (2025) | Total beneficiaries 13,552,299; service delivery points 26; active branches 15; training courses 85; awareness sessions 1,200; partners and supporters 25. Source note: annual reports, updated yearly. Charts have no data. | Published, but see conflicts below. |
| Home hero figures | 250K+ beneficiaries, 120+ service points, 15+ projects, 40+ years. | Conflicts with the statistics page and with the 1965 founding date. Not used. |
| Contact | Address "SFPA headquarters, Khartoum, Sudan"; info@sudanfpa.org; +249-183-000-000; 1700. Facebook and YouTube profiles; Instagram links to instagram.com only. Contact form (name, email, subject, message). | Email and 1700 plausible. Landline looks like a placeholder. Instagram is a placeholder. |
| Service pathway | Patient journey (data entry, medical director, GP, specialist, nurse, lab, pharmacy) and an administrative team list, on the home page. | Internal-facing; not imported. |

### Translation gaps on sudanfpa.org

The English version translates navigation, headings, and About content, but branch names, state filter options, all six project titles and descriptions, and page titles (meta) remain in Arabic. Several URL slugs are Arabic-encoded. Statistic units on the English home page mix languages ("Branche").

## 2. Comparison

| Capability | Our app (before) | sudanfpa.org | CEMOPLAF | Decision |
|---|---|---|---|---|
| Home layout (hero, quick access, stats band, specialties, catalogue, programmes, news, CTA) | Yes, modelled on CEMOPLAF | Simpler hero and sections | Reference | Keep. Stats band now uses SFPA's 2025 figures. |
| Service catalogue and per-service pages with prices | Yes (SFPA Medical Services Registry) | No | Yes | Keep unchanged. |
| Clinic directory and map | Three placeholder Khartoum-area clinics, no coordinates | 15 branches, 30 service points, town-level map embeds | 20 centres, city filter | Import SFPA branches into our Leaflet directory; filter by state as SFPA does. |
| Booking | Data-free request flow to WhatsApp or phone | None | Online scheduling | Keep ours. Now lists the 15 branches. |
| Remote support (WhatsApp, phone) | Yes | Call centre listed without number | Telehealth | Keep. |
| About: mission, vision, history | Placeholders | Present | Present | Import. |
| Departments | No | Nine | No | Add as a section of About, not a new page. |
| Partners | No | Six | No | Add as a section of About. |
| Statistics page | No | 2025 table | Stats band | Add as a section of About (`/about#numbers`), linked from the home band. |
| Programmes | Three, two placeholders | Six | Three featured | Replace placeholders with SFPA's six; keep Kochia; feature three on home and Donate. |
| News | Three samples | Two real stories | News grid | Replace samples with SFPA's stories, original dates and source links. |
| Contact form | Opens WhatsApp, stores nothing | Email form (backend unknown) | Form | Keep ours. Do not add an email form until backend and privacy are approved. |
| Donations | Disabled until a provider exists | None | Payment page | Keep. |
| Arabic/English, RTL, dark mode, PWA, voice | Yes | Arabic/English only, partial | Spanish only | Keep. |

No new routes were added. Everything new lives inside existing pages.

## 3. What changed in the app

`src/data/facilities.js` holds the 15 branches with state, town, address where published, service points, town-level coordinates, an `advisory` flag, the source URL, and the placeholder phone and email in an `unverified` field that the UI never renders. `src/content/org.js` is new and holds history, IPPF membership, vision, mission, goals, departments, and partners. `src/content/site.js` now carries the email, headquarters, founding year, Facebook and YouTube, source URLs, and the 2025 statistics. `src/content/programmes.js` has SFPA's six programme areas plus Kochia. `src/content/news.js` has SFPA's two stories.

On the pages: the clinics page filters by state, shows each branch's service points, marks every branch "status not confirmed", routes calls to the 1700 call centre instead of placeholder numbers, adds a call-before-travelling advisory for Darfur and North Kordofan branches, uses dashed "approximate" map pins, and removes turn-by-turn directions for town-level coordinates. About gains goals, history, the 2025 figures, departments, and partners, each with a source link. Programmes show status, focus areas only where SFPA names them, a "details to be added" marker, and a link to SFPA's page. News articles link to their original. Contact and footer show the email and social links.

## 4. Validation list for SFPA (priority order)

1. **Which branches and service points are operating now.** Every branch is shown as "status not confirmed". El Fasher, Nyala, and El Geneina are in areas controlled by the RSF since late 2025, and El Obeid and Umm Ruwaba are on the active Kordofan front. SFPA should confirm status branch by branch and decide whether publishing named service-point locations in these areas creates risk for staff or clients, especially for GBV services.
2. **Branch phone numbers.** +249-000-000-001 to -015 are placeholders. Supply real numbers or confirm that all calls go through 1700.
3. **Branch emails.** `@sfpa.sd` addresses differ from the `sudanfpa.org` domain. Confirm which domain is live.
4. **Head office landline +249-183-000-000.** Looks like a placeholder; not shown.
5. **WhatsApp number 249965100301** (in `src/config.js`). Not published on sudanfpa.org; confirm it is the call-centre WhatsApp line.
6. **Statistics definitions.** "Total beneficiaries 13,552,299" is far larger than the hero's "250K+" and implausible for 26 service points in one year; confirm whether it counts people, visits, or campaign reach, and over what period. Reconcile 26 service delivery points with the 30 service points listed in the branch directory, and 25 partners with the six named. Confirm the home-hero figures should be retired.
7. **Exact coordinates.** Current pins mark towns. Supply building coordinates to enable directions.
8. **Opening hours** for headquarters and branches.
9. **Street addresses** for the 12 branches listed by town only.
10. **Programme details:** objectives, locations, partners, dates, and results for each of the six areas; confirm all six are still active.
11. **Arabic wording** of mission, vision, and goals against SFPA's official text, and review of the English translations of department and partner text.
12. **Service-point names:** spelling of "Qunays" (قنيص) in Blue Nile and "Al Nazir" (الناظر) in Gedaref; whether Sennar's branch is in Singa as listed.
13. **News:** confirm the two 8 July 2026 dates, add photos with consent, and supply newer stories.
14. **Instagram:** supply the real profile or remove it from sudanfpa.org.
15. **Values:** the four values on About are still our draft.

## 5. Sources

- https://sudanfpa.org/?lang=en and https://sudanfpa.org/
- https://sudanfpa.org/من-نحن/ (About)
- https://sudanfpa.org/الإدارات/ (Departments)
- https://sudanfpa.org/projects/ and the six project pages
- https://sudanfpa.org/branches/ and the 15 branch pages
- https://sudanfpa.org/news/ and both stories
- https://sudanfpa.org/الشركاء/ (Partners)
- https://sudanfpa.org/الإحصائيات/ (Statistics)
- https://sudanfpa.org/تواصل-معنا/ (Contact)
- https://www.cemoplaf.org.ec/ (structural reference)
