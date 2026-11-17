# How India Moves

Live site: https://shivanshpahwa741-sudo.github.io/Mobility-dashboard/

An interactive dashboard, an insight map and a gap map for India's intra-city road passenger mobility sector, with a running news board, a company tracker and three investment memos.

## Why this exists

I work in this sector and I built this to understand it more deeply. The sector is worth the attention: road is 85.4% of India's passenger spend, 96.9% of road spend is intra-city, and over 99% of daily trips stay within a city or town. At ₹7.2 lakh crore a year across 165.5 crore trips a day, intra-city road is the largest part of how India moves from point A to point B.

## What is in it

- **Interactive dashboard** (`/dashboard`): the road tracker - eight market indicators followed over time (EV shares of three- and two-wheeler sales, metro network, Rapido rides a day, state bus losses and ridership, road deaths, urban women in the labour force), each with its trend.
- **Insight map** (`/structure`, `/insights`): the sector sized and structured - annual spend split by mode, ownership and vehicle fleet; the four forces shaping it (regulation, infrastructure, technology, population); ride-hailing economics; public transport; women's mobility.
- **Gap map**: eight potential market gaps sized and ranked, from employee commute (₹72,000 Cr a year) down to EV fleets for ride-hailing (₹4,000 Cr). Each gap links to the startups attacking it and the news that affects it.
- **News and implications** (`/dashboard`): a dated board of sector news, each item mapped to its gap with a one-line implication. Updated by hand as relevant news appears - there is no automated feed.
- **Company tracker** (`/companies`): 22 startups - 13 passenger-service and 9 enabling-tech - plus six benchmarks, with stage, funding, investors and traction for each.
- **Investment memos** (`/memos`): three memos, one per problem statement: Inlane (driver training and safety), ZeroMoblt (student transport) and Kyra Rides (women-safe commute).
- **Thesis** (`/thesis`): the full written sector thesis behind all of the above, with sources.

## How to run

Static site, no build step. Open `index.html` in any browser, or use the live link above.

## Data discipline

- Figures carry their sources on the page: National Household Travel Survey 2025-26 (MoSPI), MoRTH, VAHAN, FADA, PIB, MoSPI PLFS, MCA filings via Entrackr, Inc42 and Outlook Business, Tracxn (Nov 2026), and linked company press.
- Press-reported figures are labelled as press; funding amounts are as reported at announcement.
- Market sizes from different scopes are never added together.

## Methodology

AI-assisted research under my direction: source discovery, extraction, composition and coding used AI tools, with scope, structure and editorial calls made by me. Sources are cited on the page and AI output is checked against them; Tracxn profiles were used to check company stage, funding and investors. Figures and news are updated manually as new data appears - there is no scheduled refresh. As of November 2026.
