# CryptoCompass Design Guidelines

## Design Approach
**Selected Approach:** Hybrid - Material Design System + Coinbase/Robinhood Reference Patterns

**Justification:** Crypto applications require data clarity and trust. We'll combine Material Design's robust component system with the clean, modern aesthetic of leading crypto platforms like Coinbase and Robinhood.

**Key Principles:**
- Data-first hierarchy: Numbers and trends take visual priority
- Trust through clarity: Clean layouts, ample whitespace, clear typography
- Scan-optimized: Users should quickly parse prices, changes, and trends

---

## Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - for UI text, labels, body content
- Accent: JetBrains Mono (Google Fonts) - for numerical data, prices, percentages

**Hierarchy:**
- Hero Headlines: text-5xl md:text-6xl font-bold
- Page Titles: text-3xl md:text-4xl font-semibold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base
- Prices/Data: font-mono text-xl md:text-2xl font-semibold
- Small Data/Labels: font-mono text-sm
- Captions: text-sm text-muted-foreground

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16** (as in p-2, gap-4, space-y-6, mt-8, py-12, mb-16)

**Container Strategy:**
- Max-width: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Page sections: py-12 md:py-16
- Card padding: p-4 md:p-6
- Grid gaps: gap-4 md:gap-6

**Responsive Grid:**
- Crypto cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- News cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Portfolio table: Full-width responsive table with horizontal scroll on mobile

---

## Component Library

### Navigation
- Fixed top navbar with backdrop blur: sticky top-0 z-50 backdrop-blur-sm
- Logo left, nav links center/right, theme toggle far right
- Mobile: Hamburger menu with slide-in drawer
- Active state: Subtle underline or highlight on current page

### Home Page Structure
**Hero Section:**
- Height: min-h-[600px] md:min-h-[700px]
- Full-width gradient background (implement via Tailwind gradient utilities)
- Centered content with hero image showing abstract crypto/blockchain visualization (network nodes, digital currency imagery)
- Hero headline + subheadline stacked vertically
- Search bar prominent below headline: Large input with search icon, rounded-lg
- CTA buttons with blurred backgrounds when over imagery

**Supporting Sections:**
- Featured Cryptos: 3-column grid of top trending coins with mini charts
- Quick Stats: 4-column metric display (24h volume, market cap, etc.)
- Features showcase: 2-column alternating layout highlighting app capabilities

### Cryptos Page
- Top section: Filter pills and sort dropdown (inline flex layout)
- Crypto cards in responsive grid
- Each card: Coin logo + name, current price (large mono font), 24h change with colored indicator (positive/negative), mini sparkline chart, "Add to Portfolio" button

### Portfolio Page
- Summary cards at top: Total Value, 24h Change, Best Performer (3-column grid)
- Action button: "Add New Coin" - opens modal
- Portfolio table: Columns for Icon|Name, Quantity, Buy Price, Current Price, 24h Change, Total Value, Actions (Edit/Delete icons)
- Mobile: Cards instead of table, swipe actions for edit/delete

### News Page
- News cards in 3-column grid (single column mobile)
- Each card: Featured image (16:9 ratio), headline (2 lines max with ellipsis), source + timestamp, "Read More" link
- Lazy loading for infinite scroll

### Modals/Overlays
- Add/Edit Portfolio: Centered modal with backdrop blur
- Form fields: Coin selector dropdown, quantity input, purchase price input
- Button arrangement: Cancel (ghost) left, Save (primary) right

### Data Display Components
**Price Cards:**
- Rounded corners: rounded-xl
- Shadow: shadow-sm hover:shadow-md transition
- Border: border subtle

**Charts:**
- Use recharts or lightweight charting library via CDN
- Sparklines: 80-100px height, no axes, minimal chrome
- Portfolio chart: 300-400px height with grid and tooltips

**Stat Displays:**
- Large number: font-mono text-3xl font-bold
- Percentage change: Inline badge with rounded-full, small font
- Trend indicator: Up/down arrows using Heroicons

---

## Component Patterns

**Buttons:**
- Primary: font-medium rounded-lg px-4 py-2
- Secondary: Outline variant
- Icon buttons: Square with padding, hover scale
- Loading states: Spinner icon from Heroicons

**Forms:**
- Input fields: rounded-lg border px-4 py-2
- Focus: ring offset pattern
- Labels: text-sm font-medium mb-2
- Error states: Red border + error message below

**Cards:**
- Base: rounded-xl border shadow-sm p-4 md:p-6
- Hover: transform hover:scale-[1.02] transition-transform
- Interactive cards: cursor-pointer

---

## Icons
**Library:** Heroicons (via CDN)
- Use outline variant for navbar, buttons
- Use solid variant for emphasis, filled states
- Common icons: ChartBarIcon, CurrencyDollarIcon, NewspaperIcon, PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon

---

## Images

**Hero Section:**
- Large hero image: Abstract cryptocurrency/blockchain visualization
- Placement: Full-width background of hero section with gradient overlay
- Style: Modern, digital, network/node imagery or coin stack
- Buttons over image: Use backdrop-blur-sm bg-white/10 for glass-morphism effect

**Crypto Logos:**
- Size: 40x40px (w-10 h-10)
- Rounded: rounded-full
- Source: CoinGecko API provides logo URLs

**News Thumbnails:**
- Aspect ratio: 16:9
- Rounded: rounded-t-lg (top corners only)
- Object-fit: object-cover

---

## Accessibility
- All form inputs with proper labels and aria-labels
- Focus visible on all interactive elements
- Sufficient contrast ratios throughout
- Icon buttons include sr-only text for screen readers
- Table headers properly marked with scope
- Modal focus trapping

---

## Animations
**Minimal, purposeful only:**
- Page transitions: None (instant navigation)
- Hover states: Scale 1.02 or subtle shadow increase
- Number animations: CountUp effect for portfolio totals (use countup.js via CDN)
- Loading states: Simple spinner rotation

---

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns, full layout)