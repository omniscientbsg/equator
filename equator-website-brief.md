# Equator Property Managers Pvt Ltd — Full Website Brief
**For AI Agent Use · Next.js 14 · Industry-Best Execution**

---

## 0. Project North Star

Build the **#1 facility & property management company website in India** — one that makes Amazon, DLF, HDFC Bank, BCG, and AWS look smart for trusting Equator. The site must feel like a global FM leader (think JLL.com, CBRE.com quality) built with Indian market precision. Every pixel earns its place. No templates. No stock-photo vibes. Operational credibility radiates from every section.

---

## 1. Company Overview

| Field | Detail |
|-------|--------|
| **Company Name** | Equator Property Managers Pvt Ltd |
| **Tagline** | *"Spaces That Work. Operations That Flow."* |
| **Website** | www.equator.in |
| **Certifications** | ISO 9001 & ISO 45001 Certified |
| **Track Record** | 1 million+ sq. ft. of retail spaces executed |
| **Reach** | PAN India |
| **Services** | Retail Turnkey Projects · Technical Facility Services · Housekeeping Solutions |

---

## 2. Tech Stack (Non-Negotiable Choices)

### Core Framework
```
Next.js 14 (App Router)
TypeScript
Tailwind CSS v3
```

### Animation & Motion
```
Framer Motion v11         → Page transitions, scroll reveals, counter animations
GSAP + ScrollTrigger      → Hero cinematic scroll, pinned sections, timeline scrub
Lenis                     → Smooth scroll (buttery, inertia-based)
```

### 3D & Visual Wow
```
Three.js + React Three Fiber   → 3D building/city ambient background in hero
@react-three/drei              → Helpers (Environment, Float, Text3D)
```

### UI Components
```
Radix UI (primitives — accessible, unstyled)
shadcn/ui (built on Radix)
Lucide React (icons)
React Icons (brand logos)
```

### Data & Content
```
Contentful CMS (or Sanity.io)  → Blog, case studies, client logos
React Hook Form + Zod          → Contact / RFP forms
EmailJS or Resend              → Form email delivery
```

### Performance
```
next/image (all images)
next/font (Google Fonts, self-hosted)
next/dynamic (lazy load heavy 3D components)
Vercel Edge Network (deployment)
```

### SEO & Analytics
```
next-seo                       → Meta, OG, Schema.org
next-sitemap                   → Auto sitemap
Vercel Analytics + Speed Insights
Google Tag Manager stub
```

### Extras
```
react-countup                  → Animated stat numbers
react-intersection-observer    → Scroll trigger for animations
swiper.js                      → Client logo marquee + mobile carousels
sharp                          → Image optimization
clsx + tailwind-merge          → Class management
```

---

## 3. Design System

### 3.1 Color Palette

```
--equator-navy:     #1B2B5E   /* Primary — headlines, nav, CTA bg */
--equator-blue:     #2547A1   /* Secondary — buttons, accents */
--equator-sky:      #4A90D9   /* Interactive — links, hover states */
--equator-silver:   #E8EDF5   /* Light backgrounds, cards */
--equator-white:    #FFFFFF   /* Base bg */
--equator-charcoal: #1A1A2E   /* Dark sections bg */
--equator-gold:     #C9A84C   /* Premium accent — ISO badge, highlights */
--equator-red:      #E63946   /* Alerts, urgency */
```

### 3.2 Typography

```
Display Font:  "DM Serif Display" — hero headlines, section titles
               (authoritative, architectural, non-generic)

Body Font:     "Inter" — all body copy, UI labels, nav
               (crisp, professional, globally legible)

Mono/Data:     "JetBrains Mono" — stats, numbers, counter animations
               (technical precision feel)
```

### 3.3 Type Scale (Tailwind custom config)

```js
fontSize: {
  'display-2xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
  'display-xl':  ['56px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
  'display-lg':  ['44px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
  'display-md':  ['36px', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
  'display-sm':  ['28px', { lineHeight: '1.3'  }],
  'body-lg':     ['18px', { lineHeight: '1.7'  }],
  'body-md':     ['16px', { lineHeight: '1.75' }],
  'body-sm':     ['14px', { lineHeight: '1.6'  }],
  'label':       ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
}
```

### 3.4 Spacing & Layout

- Max content width: `1280px` centered
- Section vertical padding: `py-24` (desktop) / `py-16` (mobile)
- Grid: 12-column with `gap-8`
- Border radius: `rounded-2xl` for cards, `rounded-full` for badges
- Shadows: `shadow-equator` custom — `0 4px 32px rgba(27,43,94,0.12)`

### 3.5 Signature Design Element

**The "Blueprint Grid"** — A subtle, animated isometric grid overlay (like architectural drawings) that appears in hero and dark sections. It pulses gently, reinforcing the construction/precision theme. Built in Canvas/SVG, not a stock photo texture. This is the ONE unique element nothing else in the Indian FM space has.

---

## 4. Site Architecture (Pages & Routes)

```
/                          → Home (Landing)
/about                     → About Equator
/services                  → Services Overview
/services/retail-turnkey   → Retail Turnkey Projects (deep dive)
/services/technical        → Technical Facility Services (deep dive)
/services/housekeeping     → Housekeeping Solutions (deep dive)
/clients                   → Trusted By Leading Brands
/projects                  → Project Portfolio / Case Studies
/projects/[slug]           → Individual Case Study
/blog                      → Insights & Resources
/blog/[slug]               → Individual Blog Post
/contact                   → Contact & RFP Form
/careers                   → Join the Team (optional v2)
```

---

## 5. Page-by-Page Content & UX Spec

---

### 5.1 HOME PAGE `/`

#### Section 1: Hero (Full Viewport)

**Layout:** Full-screen, dark (charcoal bg), 3D ambient background

**3D Background:** Subtle rotating/floating 3D architectural wireframe structure (Three.js) — evokes a building under construction. Low opacity (0.15), slow rotation. Gracefully degrades on mobile (replaced by blurred gradient).

**Content:**

```
EYEBROW LABEL:
"ISO 9001 & 45001 Certified · PAN India Operations"

HEADLINE (DM Serif Display, 72px, white):
"Every Space.
 Every System.
 Every Day."

SUBHEADLINE (Inter, 20px, silver/70%):
"Equator delivers integrated retail turnkey execution,
 technical facility management, and housekeeping
 solutions for India's most demanding brands."

PRIMARY CTA (button, equator-blue bg, white text):
"Request a Proposal →"

SECONDARY CTA (ghost button, white border):
"Explore Our Services"

BOTTOM STRIP (animated entry, scroll-triggered):
Trusted by: [Amazon] [Flipkart] [AWS] [DLF] [HDFC Bank] [BCG] [JLL] [CBRE]
(Logo strip, white/grayscale, scrolling marquee on mobile)
```

**Animations:**
- Headline words stagger-reveal (GSAP, 0.1s delay each word)
- Blueprint grid fades in over 2s
- CTA buttons slide up (Framer Motion)
- Scroll indicator: animated chevron-down

---

#### Section 2: Stats Bar (Dark → Light transition)

**Layout:** Full-width strip, navy bg, 4 columns

```
Stat 1:  1M+         → sq. ft. Executed
Stat 2:  500+        → Retail Stores Built
Stat 3:  15+         → Years of Experience
Stat 4:  PAN India   → Operational Reach
```

**Animation:** `react-countup` triggers when scrolled into view. Numbers count up from 0. Label slides up beneath.

---

#### Section 3: What We Do (Services Overview)

**Layout:** White bg, centered headline + 3-column cards

**Headline:** "Integrated Solutions. Zero Gaps."

**Subtext:** "From concept to completion to continuous care — Equator owns every phase."

**Cards (3):**

```
CARD 1 — RETAIL TURNKEY PROJECTS
Icon: [custom SVG — blueprint/building]
Title: "Retail Turnkey Projects"
Body: "Complete store execution from planning and civil work to
       fixtures, lighting, branding, and final handover. We've
       delivered 1M+ sq. ft. across India."
Scope bullets:
  • Store Planning & Design
  • Civil & Interior Execution
  • Electrical Works
  • Fixture Manufacturing & Installation
  • Branding & Signage
  • Final Setup & Handover
CTA: "Learn More →"
Hover: Card lifts (translateY -8px), border glows blue

CARD 2 — TECHNICAL FACILITY SERVICES
Icon: [custom SVG — gear/wrench]
Title: "Technical Facility Services"
Body: "Preventive maintenance, HVAC, electrical, plumbing, and
       breakdown assistance — keeping commercial and retail spaces
       running without interruption."
Scope bullets:
  • Electrical Maintenance
  • HVAC Services
  • Plumbing Support
  • Preventive Maintenance
  • Lighting & Utility Management
  • Civil Repair Works
CTA: "Learn More →"

CARD 3 — HOUSEKEEPING SOLUTIONS
Icon: [custom SVG — sparkle/checklist]
Title: "Housekeeping Solutions"
Body: "Trained teams, structured cleaning schedules, and quality
       checks for commercial, retail, data centre, and hospitality
       environments."
Scope bullets:
  • Retail & Commercial Cleaning
  • Data Centre Cleaning
  • Floor Care & Maintenance
  • Washroom Hygiene Management
  • Deep Cleaning Services
  • Waste Management
CTA: "Learn More →"
```

---

#### Section 4: Why Equator (Differentiators)

**Layout:** Silver bg, left-text + right-visual alternating OR 2-col grid

**Headline:** "The Equator Edge"

**Points (4):**

```
01. STRUCTURED EXECUTION
    We run structured coordination across vendors, timelines,
    and on-site operations. No surprises. No delays.

02. ISO-CERTIFIED QUALITY
    ISO 9001 for quality management and ISO 45001 for
    occupational health & safety — certified assurance
    at every touchpoint.

03. EXPERIENCED TEAMS
    Seasoned project managers, technical specialists, and
    trained housekeeping staff — all under one accountable
    roof.

04. PAN INDIA REACH
    Deployable across India's metro and tier-2 markets.
    Single vendor. Consistent standards. Anywhere.
```

**Visual:** Animated timeline/process graphic (GSAP ScrollTrigger) showing a project lifecycle.

---

#### Section 5: Clients — "Trusted By Leading Brands"

**Layout:** White bg, category tabs + logo grid

**Headline:** "Trusted By India's Most Demanding Brands"

**Tabs (filter):** All | Retail & Turnkey | Housekeeping | Technical | Data Centres

**Client Data:**

```
RETAIL & TURNKEY CLIENTS:
  Amazon.in · Being Human · Crossword · Flipkart
  Indriya (Aditya Birla Jewellery) · More · Go Colors · Swiggy Instamart

HOUSEKEEPING CLIENTS:
  AWS · Bain & Company · DLF · Godrej
  HDFC Bank · Hiranandani Hospital (Fortis Network)

TECHNICAL SERVICE CLIENTS:
  Lodha · JLL · BCG (Boston Consulting Group) · CBRE

DATA CENTRES:
  Lumina CloudInfra · Digital Edge DC · NSE · State Bank of India
```

**Animation:** Logos fade in staggered. Hover: slight color restore (grayscale → color).

---

#### Section 6: Featured Project / Case Study Teaser

**Layout:** Full-width dark section, split content

**Headline:** "1 Million Sq. Ft. and Counting"

**Body:** "From a single Crossword bookstore to rolling out Swiggy Instamart dark stores PAN India — Equator's execution network handles every format, every timeline, every standard."

**CTA:** "View Our Portfolio →"

**Visual:** Full-bleed image (store interior / construction site), overlaid with metric chips.

---

#### Section 7: ISO Certifications & Trust Signals

**Layout:** Navy bg, centered, icon row

```
[ISO 9001 Badge]        [ISO 45001 Badge]       [PAN India Map Icon]
Quality Management      Safety Management        Nationwide Coverage
```

---

#### Section 8: Contact / CTA Strip

**Layout:** Gradient bg (navy → blue), centered

```
HEADLINE: "Ready to Transform Your Space?"

SUBTEXT: "Tell us about your project and we'll get back
          within 24 hours with a tailored proposal."

CTA: [Get a Free Quote →]    [Call Us Today]
```

---

#### Section 9: Footer

```
LEFT:
  Equator logo (white)
  "ISO 9001 & 45001 Certified Property Management"
  www.equator.in

CENTER COLUMNS:
  Services:
    Retail Turnkey Projects
    Technical Facility Services
    Housekeeping Solutions

  Company:
    About Us
    Our Clients
    Projects
    Blog
    Careers

RIGHT:
  Contact:
    [Email form field + Subscribe]
    Phone: [to be added]
    Address: [to be added]

BOTTOM BAR:
  © 2024 Equator Property Managers Pvt Ltd. All Rights Reserved.
  Privacy Policy · Terms of Use
```

---

### 5.2 ABOUT PAGE `/about`

#### Hero Section
```
HEADLINE: "Built on Execution. Driven by Trust."
SUBTEXT: "Equator Property Managers Pvt Ltd has been delivering
          integrated facility and retail solutions to India's
          leading brands for over a decade."
```

#### Our Story Section
```
Two-column: text left, image right

HEADLINE: "From Single Projects to National Operations"

BODY:
"Equator was founded with a singular belief: that brands deserve
 a facility partner who treats their space with the same care they
 do. Starting with retail store execution, we expanded into technical
 facility services and housekeeping — building the systems, teams,
 and processes that allow India's most demanding brands to focus on
 their core business.

 Today, with over 1 million sq. ft. of executed retail space and
 hundreds of facilities under maintenance, Equator operates as a
 trusted extension of our clients' teams."
```

#### Mission & Vision
```
MISSION:
"To deliver consistent, high-quality integrated facility solutions
 that enable our clients' spaces to perform at their best — every day."

VISION:
"To be India's most trusted property management and retail execution
 partner, known for operational excellence and zero-compromise delivery."
```

#### Values (4 pillars)
```
QUALITY      — ISO 9001 certified processes in everything we do.
SAFETY       — ISO 45001 commitment to every worker on every site.
RELIABILITY  — Structured execution that delivers on time, every time.
PARTNERSHIP  — We succeed when our clients succeed.
```

#### Leadership Team Section
```
[Placeholder for team photos + names + titles]
Format: Card grid, 3-4 per row
```

#### Certifications Section
```
ISO 9001:2015 — Quality Management System
ISO 45001:2018 — Occupational Health & Safety Management System
```

#### Timeline / Milestones (GSAP ScrollTrigger horizontal timeline)
```
[Year] → Company Founded
[Year] → First major retail client (Crossword / Being Human)
[Year] → Crossed 100 retail stores executed
[Year] → Launched Technical Services division
[Year] → Launched Housekeeping division
[Year] → Crossed 1 Million sq. ft. executed
[Year] → ISO Dual Certification
[Year] → Data Centre cleaning vertical launched
[Year] → Today — 500+ stores, PAN India operations
```

---

### 5.3 SERVICES OVERVIEW `/services`

**Layout:** Hero + 3 large service cards linking to individual pages + comparison table

```
HERO HEADLINE: "One Partner. Three Pillars. Zero Gaps."

INTRO:
"Whether you're building a new retail store, maintaining a corporate
 campus, or cleaning a data centre — Equator delivers the expertise,
 systems, and manpower to get it done right."
```

**Services Cards (full-width, alternating layout):**
- Same content as homepage cards but expanded
- Each card has full scope list + "View Full Service →" CTA

**Comparison / Differentiator Table:**

| Feature | Equator | Typical Vendor |
|---------|---------|----------------|
| Retail + Technical + Housekeeping under one roof | ✓ | ✗ |
| ISO 9001 & 45001 certified | ✓ | Rarely |
| PAN India deployment | ✓ | Limited |
| Structured SOPs & checklists | ✓ | Variable |
| Data centre-grade cleaning | ✓ | ✗ |
| 1M+ sq. ft. track record | ✓ | ✗ |

---

### 5.4 RETAIL TURNKEY PROJECTS `/services/retail-turnkey`

#### Hero
```
EYEBROW: "Service 01 — Retail Turnkey"
HEADLINE: "Complete Store Execution — From Concept to Handover"
SUBTEXT: "Equator manages every stage of retail store development
          so brands can focus on opening day, not the process."
BG: Construction site image / architectural rendering overlay
```

#### What We Do
```
BODY:
"Our turnkey project services are designed for brands looking for
 a seamless execution partner. From planning and civil work to
 fixtures, lighting, branding, and final setup — we handle the
 complete execution process with structured coordination, quality
 control, and timely delivery.

 With a strong execution network and experienced project management
 team, we ensure smooth coordination across vendors, timelines,
 and on-site operations to deliver retail spaces that are efficient,
 functional, and aligned with brand standards."
```

#### Track Record
```
1,000,000+   Sq. ft. executed
500+         Retail stores completed
Multiple     Formats & locations
```

#### Scope of Work (visual checklist cards)
```
COLUMN 1:
  ■ Store Planning & Design
  ■ Civil & Interior Execution
  ■ Electrical Works
  ■ Fixture Manufacturing & Installation

COLUMN 2:
  ■ Final Store Setup & Handover
  ■ Flooring & Ceiling Solutions
  ■ Branding & Signage
  ■ Lighting Systems
  ■ Site Supervision & Coordination
```

#### How It Works (Process Steps — GSAP animated)
```
STEP 1: Brief & Site Survey
         Understand brand guidelines, store format, site constraints.

STEP 2: Planning & Design
         Detailed drawings, BOQ preparation, vendor finalization.

STEP 3: Civil & Interior Execution
         Flooring, ceiling, electrical rough-in, civil modifications.

STEP 4: Fixture & Fit-Out
         Furniture, fixtures, display systems — manufactured and installed.

STEP 5: Branding & Signage
         All visual identity elements installed per brand standards.

STEP 6: Quality Check & Snagging
         Multi-point quality audit before handover.

STEP 7: Handover
         Final walkthrough, documentation, keys handed to client.
```

#### Retail Clients Served
```
Amazon.in · Being Human · Crossword · Flipkart
Indriya (Aditya Birla Jewellery) · More · Go Colors · Swiggy Instamart
```

#### CTA
```
"Ready to Open Your Next Store?"
[Start Your Project →]
```

---

### 5.5 TECHNICAL FACILITY SERVICES `/services/technical`

#### Hero
```
EYEBROW: "Service 02 — Technical Services"
HEADLINE: "Reliable Technical Support. Zero Downtime."
SUBTEXT: "Equator's technical service division ensures commercial
          and retail facilities operate without interruption —
          day in, day out."
```

#### What We Do
```
BODY:
"Our technical service division focuses on preventive maintenance,
 operational efficiency, and quick response support for commercial
 and retail facilities.

 With experienced technical teams and systematic service management,
 we help businesses reduce downtime and maintain smooth operational
 performance."
```

#### Technical Support Includes
```
  ■ Electrical Maintenance
  ■ HVAC Services
  ■ Plumbing Support
  ■ Preventive Maintenance
  ■ Lighting & Utility Management
  ■ Civil Repair Works
  ■ Breakdown Assistance
```

#### Value-Added Services
```
  ■ Electrical Thermography (For Common Area)
  ■ Electrical Audit
  ■ Earth Pit Checking
  ■ Visual Panel Check
  ■ Lux Measurement
  ■ Equipment Check
  ■ Power Analysis for Main Incomer Panel
  ■ Fire System Check
  ■ Rewards & Recognition for Employees
  ■ Birthday Celebrations for Staff
  ■ SOP & Checklists
```

#### Operational Advantages
```
  ✓ Reduced Downtime
  ✓ Faster Response Time
  ✓ Preventive Maintenance Planning
  ✓ Skilled Technical Teams
```

#### Technical Service Clients
```
Lodha · JLL · BCG (Boston Consulting Group) · CBRE
```

#### CTA
```
"Need Technical Facility Support?"
[Get a Technical Assessment →]
```

---

### 5.6 HOUSEKEEPING SOLUTIONS `/services/housekeeping`

#### Hero
```
EYEBROW: "Service 03 — Housekeeping"
HEADLINE: "Clean Spaces. Consistent Standards. Every Day."
SUBTEXT: "Professional housekeeping solutions designed to maintain
          clean, organized, and hygienic commercial and retail spaces."
```

#### What We Do
```
BODY:
"Our housekeeping teams are trained to maintain high operational
 standards while ensuring consistency, hygiene, and smooth day-to-day
 upkeep across facilities.

 We follow structured cleaning schedules, quality checks, and
 efficient manpower management to support workplaces that are
 well-maintained and professionally managed."
```

#### Services Include
```
LEFT COLUMN:
  ■ Retail & Commercial Cleaning
  ■ Data Centre Cleaning
  ■ Floor Care & Maintenance
  ■ Washroom Hygiene Management

RIGHT COLUMN:
  ■ Glass & Facade Cleaning
  ■ Deep Cleaning Services
  ■ Pantry & Utility Area Support
  ■ Waste Management
```

#### Service Benefits
```
  ✓ Trained & Supervised Staff
  ✓ Scheduled Maintenance Processes
  ✓ Quality & Hygiene Standards
  ✓ Reliable Operational Support
```

#### Housekeeping Clients
```
AWS · Bain & Company · DLF · Godrej
HDFC Bank · Hiranandani Hospital (Fortis Network Hospital)
```

#### Data Centre Specialization Callout
```
CALLOUT BOX:
"Data Centre Cleaning requires a different standard.
 Our teams are trained for static-sensitive environments,
 precision cleaning protocols, and strict access management
 required by India's leading data centre operators."

Clients: Lumina CloudInfra · Digital Edge DC · NSE · State Bank of India
```

#### CTA
```
"Ready for Cleaner, Safer Spaces?"
[Request Housekeeping Proposal →]
```

---

### 5.7 CLIENTS PAGE `/clients`

#### Hero
```
HEADLINE: "Trusted By Leading Brands"
SUBTEXT: "From e-commerce giants to institutional banks,
          global consultancies to data centre operators —
          Equator delivers where it matters most."
```

#### Client Categories (tab-filtered grid)

**Retail & Turnkey Clients:**
Amazon.in, Being Human, Crossword, Flipkart, Indriya (Aditya Birla Jewellery), More, Go Colors, Swiggy Instamart

**Housekeeping Clients:**
AWS, Bain & Company, DLF, Godrej, HDFC Bank, Hiranandani Hospital

**Technical Service Clients:**
Lodha, JLL, BCG (Boston Consulting Group), CBRE

**Data Centres:**
Lumina CloudInfra, Digital Edge DC, NSE, State Bank of India

#### Testimonials Section (if available)
```
[Placeholder for client quotes — request from company]
Format: Pull-quote cards, client name + company + logo
```

#### Client Stats
```
30+   Enterprise Clients
500+  Stores Executed
4     Service Verticals
```

---

### 5.8 PROJECTS / PORTFOLIO `/projects`

#### Hero
```
HEADLINE: "Spaces We've Built. Standards We've Set."
SUBTEXT: "A selection of retail and facility projects executed
          across India — from flagship stores to national rollouts."
```

#### Filter Bar
```
All · Retail Stores · Dark Stores · Corporate · Malls · Data Centres
```

#### Project Cards (grid, 3-column)
```
Each card:
  - Project image (before/after or finished store)
  - Client name
  - Project type (Store Execution / AMC / Housekeeping)
  - Location
  - Area (sq. ft.)
  - Brief description
  - CTA: "View Case Study →"
```

**Sample Projects to Populate (expand with actual data):**

```
PROJECT 1:
  Client: Swiggy Instamart
  Type: Retail Turnkey — Dark Store Rollout
  Description: Pan-India rollout of dark store format outlets
               with standardized fit-out and rapid delivery.
  Scale: Multiple locations, quick-commerce ready

PROJECT 2:
  Client: Being Human
  Type: Retail Turnkey — Fashion Retail
  Description: Brand-aligned store execution with custom
               fixtures, lighting, and signage.

PROJECT 3:
  Client: Crossword
  Type: Retail Turnkey — Bookstore
  Description: Complete interior and fixture solution for
               Crossword's retail bookstore format.

PROJECT 4:
  Client: AWS
  Type: Housekeeping — Corporate Campus
  Description: Day-to-day facility maintenance for
               Amazon Web Services office premises.

PROJECT 5:
  Client: Lumina CloudInfra
  Type: Housekeeping — Data Centre
  Description: Precision cleaning and hygiene management
               for a Tier-III data centre facility.

PROJECT 6:
  Client: HDFC Bank
  Type: Housekeeping — Banking Facility
  Description: Ongoing housekeeping operations for
               HDFC Bank office premises.
```

---

### 5.9 CONTACT PAGE `/contact`

#### Hero
```
HEADLINE: "Let's Build Something Together"
SUBTEXT: "Fill in the form and our team will respond
          within 24 business hours with a tailored proposal."
```

#### Contact Form (React Hook Form + Zod + Resend/EmailJS)
```
Fields:
  Full Name*
  Company Name*
  Email Address*
  Phone Number*
  Service Required* (dropdown):
    → Retail Turnkey Projects
    → Technical Facility Services
    → Housekeeping Solutions
    → All Three / Integrated
    → Other
  Project Location (City / State)
  Project Size (sq. ft. or number of facilities)
  Project Timeline (dropdown):
    → Immediate (< 1 month)
    → 1–3 months
    → 3–6 months
    → Planning phase
  Message / Additional Details (textarea)
  [Submit Request]

Success state: Animated tick + "We'll be in touch within 24 hours."
```

#### Contact Info Strip
```
Website:  www.equator.in
[Phone, email, office address — to be provided by client]
```

#### Map Embed (Google Maps)
```
[Head office location — to be provided]
```

---

## 6. Animations & Interactions Specification

### 6.1 Page Load Sequence (Home)
```
0ms    → Lenis smooth scroll init
0ms    → Nav fades in (opacity 0→1, 400ms)
300ms  → Hero eyebrow slides up
500ms  → Hero headline word-by-word reveal (stagger 80ms/word)
900ms  → Subheadline fades in
1100ms → CTA buttons slide up
1400ms → Blueprint grid canvas fades in (slow, 2s)
1600ms → Client logo strip animates in
```

### 6.2 Scroll Animations (GSAP ScrollTrigger)
```
Stats bar     → Numbers count up when 60% in viewport
Service cards → Stagger reveal from bottom (y: 40 → 0)
Why Equator   → Left panel slides in, right panel slides in opposite
Clients logos → Fade in grid, staggered
Footer        → Simple fade
```

### 6.3 Hover States
```
Nav links     → Blue underline slides in from left
Service cards → translateY(-8px), box-shadow intensifies, blue border
Client logos  → grayscale(0) from grayscale(100%), scale(1.05)
CTA buttons   → Background lightens, slight scale(1.02), shadow spreads
Project cards → Image scales (1.0 → 1.05), overlay fades
```

### 6.4 Cursor (Optional — high-impact)
```
Custom cursor: Small circle that expands on hover over interactive elements.
Inner dot follows precisely, outer ring lags slightly (lerp: 0.1).
On card hover: Cursor morphs to "VIEW" text pill.
Color: equator-blue.
```

### 6.5 Page Transitions (Framer Motion)
```
Exit: Page fades out (opacity 1→0, 300ms)
Enter: New page slides up (y: 20→0) + fades in (opacity 0→1, 400ms)
Route change indicator: Thin blue progress bar at top (like YouTube)
```

---

## 7. Component Architecture

```
src/
├── app/
│   ├── layout.tsx              (Root layout — nav, footer, smooth scroll)
│   ├── page.tsx                (Home)
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── retail-turnkey/page.tsx
│   │   ├── technical/page.tsx
│   │   └── housekeeping/page.tsx
│   ├── clients/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          (sticky, glass morphism on scroll)
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── home/
│   │   ├── Hero.tsx            (3D bg + headline + CTA)
│   │   ├── StatsBar.tsx        (countup stats)
│   │   ├── ServicesGrid.tsx
│   │   ├── WhyEquator.tsx
│   │   ├── ClientLogos.tsx
│   │   └── ContactCTA.tsx
│   ├── services/
│   │   ├── ServiceHero.tsx
│   │   ├── ScopeGrid.tsx
│   │   ├── ProcessTimeline.tsx
│   │   └── ServiceCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCard.tsx
│   │   ├── LogoGrid.tsx
│   │   ├── Tabs.tsx
│   │   └── BlueprintGrid.tsx   (signature canvas element)
│   └── three/
│       ├── HeroScene.tsx       (Three.js 3D background)
│       └── BuildingWireframe.tsx
│
├── lib/
│   ├── fonts.ts                (next/font config)
│   ├── animations.ts           (GSAP variants, Framer Motion variants)
│   ├── constants.ts            (colors, breakpoints)
│   └── clients.ts              (client data arrays)
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useLenis.ts
│   └── useCountUp.ts
│
└── styles/
    └── globals.css             (Tailwind base + custom vars)
```

---

## 8. Navbar Specification

```
HEIGHT: 72px (desktop) / 64px (mobile)
INITIAL STATE: Transparent bg, white text
ON SCROLL (>100px): Glass morphism — backdrop-blur-md + bg-white/90 + shadow
LOGO: Left aligned — Equator logo SVG (white initial, navy on scroll)
NAV LINKS (center): Services (mega menu) | Clients | Projects | About | Blog
CTA BUTTON (right): "Get a Quote" — equator-blue bg, white text, rounded-full

MEGA MENU (Services hover):
  ┌─────────────────────────────────────────────┐
  │  🏗️  Retail Turnkey    🔧  Technical       │
  │      Projects               Services        │
  │  Complete store         Maintenance &       │
  │  execution              facility support    │
  │                                             │
  │  🧹  Housekeeping      📋  View All →      │
  │      Solutions              Services        │
  │  Clean, organized                           │
  │  commercial spaces                          │
  └─────────────────────────────────────────────┘

MOBILE: Hamburger → full-screen slide-in nav with same links
```

---

## 9. SEO Configuration

### Meta Tags (via next-seo)
```
Home:
  title: "Equator Property Managers | Retail Turnkey & Facility Management India"
  description: "ISO 9001 & 45001 certified. Retail store execution, technical
                facility services, and housekeeping solutions. PAN India. Trusted
                by Amazon, Flipkart, DLF, HDFC Bank, BCG, and 30+ leading brands."

Services:
  title: "Services | Retail Turnkey, Technical & Housekeeping — Equator"

Retail Turnkey:
  title: "Retail Turnkey Projects | Store Execution India — Equator Property"
  description: "Complete retail store execution from concept to handover.
                1M+ sq. ft. executed for Amazon, Flipkart, Swiggy Instamart
                and more. PAN India delivery."
```

### Schema.org (JSON-LD)
```json
{
  "@type": "LocalBusiness",
  "name": "Equator Property Managers Pvt Ltd",
  "description": "Integrated facility and retail execution company",
  "url": "https://www.equator.in",
  "hasCredential": ["ISO 9001", "ISO 45001"],
  "areaServed": "India",
  "serviceType": [
    "Retail Turnkey Projects",
    "Technical Facility Services",
    "Housekeeping Solutions"
  ]
}
```

---

## 10. Performance Targets

```
Lighthouse Score:   Performance ≥ 90 | Accessibility ≥ 95 | SEO ≥ 95
Core Web Vitals:    LCP < 2.5s | FID < 100ms | CLS < 0.1
Bundle size:        < 200kb initial JS (Three.js lazy loaded)
Image format:       WebP/AVIF via next/image
Fonts:              Self-hosted via next/font (no FOUT)
```

---

## 11. Accessibility Requirements

```
- All interactive elements keyboard-navigable
- Focus rings visible (custom equator-blue focus style)
- ARIA labels on all icon buttons
- Color contrast ratio ≥ 4.5:1 (WCAG AA)
- prefers-reduced-motion: All GSAP/Framer animations respect this
- Alt text on all images
- Semantic HTML (nav, main, section, article, aside)
- Skip to content link
```

---

## 12. Responsive Breakpoints

```
Mobile:   < 768px    (single column, stacked sections)
Tablet:   768–1024px (2-column where applicable)
Desktop:  1024–1280px
Wide:     > 1280px   (max-width container kicks in)
```

---

## 13. Optional Advanced Features (V2 Roadmap)

```
1. Live Chat (Intercom / Crisp)
2. RFP configurator wizard (multi-step form: select services → location → size → budget)
3. Project cost estimator (interactive calculator)
4. Client portal (login → view project progress, documents)
5. Blog / Insights CMS (Sanity.io)
6. Job board / Careers page (with application form)
7. WhatsApp Business Chat integration
8. Google Reviews embed
9. Virtual tour of executed stores (360° embed)
10. Newsletter signup (Mailchimp / Resend)
```

---

## 14. Content To Request From Client

```
[ ] High-resolution company logo (SVG preferred)
[ ] Photos of completed retail stores (interior, before/after)
[ ] Photos of housekeeping teams in action
[ ] Photos of technical work in progress
[ ] Head office address and phone number
[ ] Primary contact email
[ ] Team member names, designations, and photos (for About page)
[ ] Client testimonials / quotes (with permission)
[ ] Specific project data (sq. ft., timeline, location) for case studies
[ ] Any brand guidelines / color preferences
[ ] Social media handles (LinkedIn, Instagram, etc.)
[ ] Google Maps business listing URL
[ ] Founding year / company history milestones
```

---

## 15. Deployment Checklist

```
[ ] Domain: www.equator.in (verify DNS control)
[ ] Vercel project connected to GitHub repo
[ ] Environment variables set in Vercel dashboard
[ ] Custom domain configured in Vercel
[ ] SSL certificate active
[ ] next-sitemap configured (auto-generates sitemap.xml)
[ ] robots.txt configured
[ ] Google Search Console verified
[ ] Google Analytics / Tag Manager connected
[ ] OG images created (1200×630px) for all major pages
[ ] Favicon set (32×32, 180×180 apple-touch-icon, SVG)
[ ] 404 page designed and implemented
[ ] Form email delivery tested end-to-end
[ ] Mobile tested on iOS Safari + Android Chrome
[ ] Reduced motion tested
[ ] Accessibility audit (axe DevTools)
[ ] Lighthouse audit (all pages ≥ 90)
[ ] Load test (Vercel handles CDN, but verify)
```

---

## 16. Estimated Build Phases

```
PHASE 1 (Week 1–2): Foundation
  → Next.js setup, Tailwind config, font config, design tokens
  → Navbar, Footer, layout shell
  → Lenis smooth scroll + GSAP plugin setup
  → Home Hero (static first, 3D added later)

PHASE 2 (Week 2–3): Core Pages
  → Home page (all sections)
  → Services Overview + 3 service sub-pages
  → Clients page

PHASE 3 (Week 3–4): Content Pages
  → About page with timeline
  → Projects / Portfolio (static data first)
  → Contact form (with email delivery)

PHASE 4 (Week 4–5): Polish
  → Three.js hero background
  → All GSAP scroll animations
  → Custom cursor
  → Page transitions
  → Mobile responsive pass

PHASE 5 (Week 5): Launch
  → SEO config, sitemaps, OG images
  → Performance optimization
  → Accessibility audit
  → Deployment to Vercel + domain setup
  → QA on all devices
```

---

*Brief prepared for Equator Property Managers Pvt Ltd.*
*Version 1.0 · June 2026*
*Website: www.equator.in*
