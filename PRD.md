# Ukraine Frontline Tracker — PRD

> Short Title: Ukraine Territory Control & Frontline Position Monitor
> Last Updated: 2026-04-14

---

## Overview

Ukraine Frontline Tracker is a multilingual, statically generated web application that monitors the current state of the Russia-Ukraine frontline. It presents oblast-level territorial control data, tracks recent advances and retreats, and provides a structured view of the conflict's geographic progression over time. The site is designed for researchers, journalists, policymakers, and engaged citizens who need a clear, sourced reference for the current and historical positions of the frontline.

Unlike map-heavy applications that require WebGL or expensive tile services, this site presents frontline data primarily through structured data tables, region control summaries, and a timeline of significant territorial changes — keeping load times minimal and accessibility high. Interactive map embedding (via embedded iframes or static map images) is used where appropriate without blocking SSG.

Live URL: https://ukraine-frontline-tracker.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| Journalists & war correspondents | Need a reliable summary of which oblasts are contested or controlled without manually reading ISW reports daily | Oblast-level control table with "last changed" dates and trend indicators |
| Conflict researchers & academics | Territorial change data is hard to aggregate historically from disparate sources | frontline.json provides a structured, versioned record of territorial changes |
| Policy analysts & government staffers | Briefings need a quick reference for current control percentages | Summary stats per region with estimated % controlled by each party |
| Educators & students | Need a comprehensible overview of the Ukraine conflict's geography | Plain-language region summaries with context paragraphs |
| General public | Confused by inconsistent news coverage of territorial gains/losses | Unified, consistent data with clear methodology disclosure |
| SEO-driven users | Searching "ukraine frontline tracker" or "ukraine territory control 2026" | Homepage and region pages target these exact queries |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (frontline.json, regions.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Analytics: Vercel Analytics (free tier)

---

## Pages & Routes

### App Router Structure

```
app/
  [locale]/
    layout.tsx              — Root layout: header, footer, locale provider, AdSense script
    page.tsx                — Homepage: frontline overview, recent changes, summary stats
    loading.tsx             — Skeleton loader
    not-found.tsx           — 404 page
    regions/
      page.tsx              — Oblast index: all oblasts with control status and trend
      [regionSlug]/
        page.tsx            — Region detail: full control breakdown, change timeline, context
    frontline/
      page.tsx              — Full frontline status page: all oblasts in one view
      changes/
        page.tsx            — Recent territorial changes timeline
    map/
      page.tsx              — Map view page: static map image or embedded map with control overlay
    about/
      page.tsx              — Methodology, data sources, update frequency, limitations
  api/
    frontline/
      route.ts              — GET: returns frontline.json (optional ?region= filter)
    regions/
      route.ts              — GET: returns regions.json
    revalidate/
      route.ts              — POST: ISR revalidation
```

### Key Page Descriptions

**Homepage (`/[locale]/`)**
- Hero: "Ukraine Frontline — Last Updated [date]" with overall summary sentence
- Quick stats bar: % of Ukraine under Russian control, % contested, % under Ukrainian control (based on oblast estimates)
- Recent changes feed: last 10 territorial change events (advances, retreats, stabilizations)
- Each change card: date, region, direction of change (advance/retreat/stabilization), magnitude, source
- Oblast status grid: compact card grid showing all 25 oblasts with status color coding (Ukrainian control / Contested / Russian control / Occupied)
- Link to full map view
- Conflict context sidebar: key dates, current phase description
- Ad placements: leaderboard top, rectangle after recent changes

**Regions / Oblast Index (`/[locale]/regions/`)**
- Table of all Ukrainian oblasts relevant to the conflict
- Columns: Oblast name, Status (controlled/contested/occupied), Control % (est.), Last Changed, Trend (arrow indicator)
- Color-coded status badges
- Sort by: status, last changed, oblast name
- Filter by: status type
- Links to each region detail page

**Region Detail (`/[locale]/regions/[regionSlug]/`)**
- Region header: oblast name, capital city, geographic context
- Current status card: control estimate, confidence level, status badge
- Control breakdown: estimated % Ukrainian control / % Russian control / % contested
- Change timeline: all recorded changes for this region, in reverse chronological order
- Significant events: key battles, major advances/retreats (with source links)
- Adjacent regions: links to neighboring oblasts
- Context paragraph: importance of this region to the overall conflict
- Source attribution for current control estimates
- Ad unit: rectangle below timeline

**Frontline Status Page (`/[locale]/frontline/`)**
- Full table: every oblast in one view, sortable
- Summary row: overall totals
- Export: download as JSON button (links to /api/frontline)

**Recent Changes (`/[locale]/frontline/changes/`)**
- Full timeline of all recorded territorial changes
- Filter by: region, change type (advance/retreat), date range
- Date grouping headers
- Each entry: date, region, change description, source link, magnitude rating

**Map Page (`/[locale]/map/`)**
- Static map image of Ukraine with control overlay (pre-rendered SVG or PNG)
- Alternatively: embedded iframe of a reliable public map source (ISW, DeepStateMap)
- Below map: oblast control legend, data table
- Note: map is supplementary; the structured data pages are the primary resource
- Last updated timestamp prominent

---

## Data Model (JSON schema)

### /public/data/frontline.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "dataSource": "ISW, DeepStateMap, Ukrainian General Staff reports",
    "methodology": "Oblast-level estimates based on reported frontline positions. Control percentages are approximations.",
    "version": "2.0.0",
    "totalChangesLogged": 1240
  },
  "currentStatus": {
    "asOf": "2026-04-14",
    "overallEstimate": {
      "ukrainianControlPercent": 77.5,
      "russianControlPercent": 18.2,
      "contestedPercent": 4.3,
      "confidence": "medium"
    }
  },
  "changes": [
    {
      "id": "chg-20260414-001",
      "date": "2026-04-14",
      "regionSlug": "donetsk",
      "regionName": "Donetsk Oblast",
      "changeType": "russian-advance | ukrainian-advance | stabilization | withdrawal",
      "location": "Near Pokrovsk",
      "magnitudeKm2": 12,
      "magnitudeConfidence": "low | medium | high",
      "description": "Russian forces advanced approximately 2km along the Pokrovsk axis",
      "sources": [
        {
          "name": "ISW",
          "url": "https://understandingwar.org/...",
          "publishedAt": "2026-04-14"
        }
      ],
      "tags": ["pokrovsk", "donetsk", "russian-advance"]
    }
  ]
}
```

### /public/data/regions.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalRegions": 25
  },
  "regions": [
    {
      "slug": "donetsk",
      "name": "Donetsk Oblast",
      "nameUk": "Донецька область",
      "capital": "Donetsk (occupied) / Kramatorsk (Ukrainian admin)",
      "areaKm2": 26517,
      "conflictRelevance": "high | medium | low",
      "currentStatus": {
        "asOf": "2026-04-14",
        "controlStatus": "contested",
        "ukrainianControlPercent": 38,
        "russianControlPercent": 62,
        "confidence": "medium",
        "lastChanged": "2026-04-10",
        "trend": "russian-advance | ukrainian-advance | stable"
      },
      "statusHistory": [
        {
          "date": "2026-04-10",
          "ukrainianControlPercent": 39,
          "russianControlPercent": 61,
          "note": "Russian advance near Pokrovsk"
        }
      ],
      "keyLocations": [
        {
          "name": "Pokrovsk",
          "type": "city",
          "strategicImportance": "Major logistics hub for Ukrainian forces in southern Donetsk",
          "currentControl": "ukraine | russia | contested",
          "lat": 48.2821,
          "lng": 37.1786
        }
      ],
      "context": "Donetsk Oblast has been the primary focus of Russian ground operations since the 2022 invasion. Russia controls significant portions including the pre-2022 occupied areas.",
      "adjacentRegions": ["zaporizhzhia", "dnipropetrovsk", "kharkiv", "luhansk"],
      "sources": [
        {
          "name": "DeepStateMap",
          "url": "https://deepstatemap.live/",
          "lastChecked": "2026-04-14"
        }
      ]
    },
    {
      "slug": "zaporizhzhia",
      "name": "Zaporizhzhia Oblast",
      "nameUk": "Запорізька область",
      "capital": "Zaporizhzhia",
      "areaKm2": 27183,
      "conflictRelevance": "high",
      "currentStatus": {
        "asOf": "2026-04-14",
        "controlStatus": "contested",
        "ukrainianControlPercent": 72,
        "russianControlPercent": 28,
        "confidence": "medium",
        "lastChanged": "2026-03-22",
        "trend": "stable"
      }
    },
    {
      "slug": "kherson",
      "name": "Kherson Oblast",
      "nameUk": "Херсонська область",
      "capital": "Kherson",
      "areaKm2": 28461,
      "conflictRelevance": "high",
      "currentStatus": {
        "asOf": "2026-04-14",
        "controlStatus": "contested",
        "ukrainianControlPercent": 55,
        "russianControlPercent": 45,
        "confidence": "medium",
        "lastChanged": "2026-04-01",
        "trend": "stable"
      }
    }
  ]
}
```

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 initialized with App Router
- Tailwind CSS and next-intl configured for 8 locales
- App directory structure created: app/[locale]/, app/api/, public/data/
- Placeholder frontline.json and regions.json committed
- Vercel project linked and first deploy successful
- Git push: `feat: scaffold ukraine-frontline-tracker with i18n`

### M1 — Data Layer
- regions.json populated: all 25 oblasts with current control estimates
- frontline.json populated: ≥ 200 territorial change records
- /api/frontline/route.ts and /api/regions/route.ts implemented
- Data sourcing documented in about page draft
- Validation script passing
- Git push: `feat: frontline and regions data with API routes`

### M2 — Layout & Homepage
- Root layout with header (Home, Regions, Frontline, Map, About), language switcher, footer
- AdSense script injected
- Homepage: hero stats, recent changes feed, oblast status grid
- Oblast status grid component with color-coded control badges
- Mobile-first responsive layout
- Git push: `feat: homepage with frontline overview and oblast grid`

### M3 — Regions Pages
- Oblast index table (all 25 oblasts, sortable/filterable)
- Region detail page template
- generateStaticParams for all region slugs
- Status history component (mini timeline per region)
- Adjacent regions links
- Git push: `feat: regions index and detail pages`

### M4 — Frontline & Map Pages
- Frontline status full table page
- Recent changes timeline with filter
- Map page (static control map SVG + data table)
- Change type icon components
- Git push: `feat: frontline status and map pages`

### M5 — i18n, SEO, Sitemap
- All 8 locale translations complete
- Per-page metadata (title, description, og:image) for all routes
- sitemap.xml covering all region slugs × 8 locales
- robots.txt, hreflang, canonical URLs
- JSON-LD: Dataset schema on homepage
- Git push: `feat: i18n, SEO, and sitemap`

### M6 — QA & Launch
- Lighthouse scores: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- All oblasts verified rendering correct data
- Language switcher tested all 8 locales
- Map page verified on mobile
- Ad units verified (no CLS)
- Google Search Console verified, sitemap submitted
- Git push: `chore: QA, performance tuning, production launch`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Build oblast grid, status table, change timeline components
- Control status badge system (color-coded by Ukrainian/Russian/Contested)
- Trend arrow indicators
- Responsive layout for desktop and mobile
- Static SVG map component for map page
- next-intl integration for all labels

**Key Files:**
- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- app/[locale]/regions/page.tsx
- components/OblastCard.tsx, OblastTable.tsx, ControlBadge.tsx
- components/ChangeTimeline.tsx, TrendArrow.tsx
- components/StaticMap.tsx

### Backend / Data Agent
**Responsibilities:**
- Source and maintain regions.json (control estimates for all 25 oblasts)
- Source and maintain frontline.json (territorial changes log)
- Write /api/frontline and /api/regions route handlers
- Document data sourcing (ISW, DeepStateMap, Ukrainian General Staff)
- Establish update cadence and diff-tracking for data changes

**Key Files:**
- public/data/frontline.json
- public/data/regions.json
- app/api/frontline/route.ts
- app/api/regions/route.ts
- scripts/update-frontline.js

### SEO / Content Agent
**Responsibilities:**
- Page-level metadata for all routes and locales
- Translation files: messages/en.json through messages/pt.json
- About page: methodology, sources, limitations, update frequency
- Structured data JSON-LD
- Sitemap generation

**Key Files:**
- messages/ (8 locale files)
- app/[locale]/about/page.tsx
- public/sitemap.xml

### QA Agent
**Responsibilities:**
- Test all oblasts render correctly with valid data
- Verify control percentage calculations are consistent
- Confirm static map SVG renders on all target browsers
- Test all 8 locales
- Lighthouse audits on homepage and at least 3 region pages
- Verify ad units don't cause layout shift

---

## SEO Strategy

### Primary Keywords
- "ukraine frontline tracker" — homepage title and H1
- "ukraine frontline map 2026" — map page and homepage
- "ukraine territory control" — regions index page
- "ukraine frontline today" — homepage with last-updated signal
- "ukraine war map 2026" — homepage and map page

### Secondary Keywords
- "donetsk frontline 2026" — Donetsk region page
- "zaporizhzhia frontline" — Zaporizhzhia region page
- "kherson frontline" — Kherson region page
- "ukraine controlled territory percentage" — stats and frontline page
- "russia ukraine border map 2026"

### Long-tail Keywords
- "how much of ukraine does russia control in 2026"
- "ukraine frontline changes this week"
- "which oblasts are under russian control"
- "pokrovsk frontline update"

### Technical SEO
- Each region gets its own optimized page (25 potential ranking pages)
- Homepage last-updated signal reinforces freshness
- hreflang across 8 languages maximizes international organic reach
- OG image per page includes oblast name and control % for social sharing
- Internal links: region pages link to relevant strike-signal conflict entries
- JSON-LD Dataset on homepage citing data sources (ISW, DeepStateMap) builds credibility

### Content Authority Strategy
- About page explains data methodology in detail (E-E-A-T signal)
- Source attribution on every data point
- "Data confidence" ratings show epistemic honesty
- Regular update schedule maintained (minimum weekly redeploy)

---

## Launch Checklist

- [ ] regions.json contains all 25 oblasts with current control data
- [ ] frontline.json contains ≥ 200 change records
- [ ] All 8 locale routes return 200
- [ ] Homepage recent changes shows last 10 events
- [ ] Oblast status grid shows all regions color-coded
- [ ] Regions index table renders and is sortable
- [ ] At least 10 region detail pages tested individually
- [ ] Donetsk, Zaporizhzhia, Kherson, Kharkiv, Luhansk pages verified correct
- [ ] Frontline status page loads full table
- [ ] Recent changes timeline loads and filter works
- [ ] Map page displays static map and legend
- [ ] Language switcher tested across all 8 locales
- [ ] AdSense ca-pub-7098271335538021 in page source
- [ ] Adsterra units rendering without layout shift
- [ ] sitemap.xml includes all region slugs × 8 locales
- [ ] robots.txt accessible and correctly configured
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] No console errors on any page
- [ ] OG tags correct (og:title, og:description, og:image)
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC
- [ ] Vercel URL confirmed: https://ukraine-frontline-tracker.vercel.app
- [ ] 404 for unknown region slugs working
