# Personal Expense Manager

A complete, production-quality frontend application built with **React**, **Vite**, and **Modern CSS**. Designed with a modern **Neo-FinTech SaaS aesthetic**, it empowers individuals to log, categorize, analyze, and manage their day-to-day spending with clarity, speed, and visual elegance.

---

## Overview

**Personal Expense Manager** is a frontend-only application running 100% in the browser. It combines instant state responsiveness with persistent browser storage (`LocalStorage`), dynamic financial calculations, an **Obsidian Aurora & Luminous Pearl theme engine**, and fluid micro-animations.

---

## Features

- **Neo-FinTech Theme & Animations**:
  - **Dual-Mode Theme Engine**: Default **Obsidian Aurora** (dark luxury FinTech with electric indigo, cyan, and emerald glows) and **Luminous Pearl** (crisp modern light mode) with instant toggle in the Header and `localStorage` persistence.
  - **Fluid Micro-Animations**: Card entrance fade-and-glide, floating emblem, animated gradient category progress fills, interactive card hover lift & glow, and spring modal transitions.
  - **Live Indicator**: Real-time pulsing badge in the header indicating active browser storage synchronization.

- **Smart Financial Insights Banner**:
  - **Top Category Aura**: Automatically highlights your largest spending category and its percentage of your total budget.
  - **Daily Average Pace**: Real-time calculation of daily spending for the current month.
  - **Instant CSV Export**: One-click download of all transaction records as a `.csv` file.

- **Dashboard Analytics**:
  - **Total Spending**: Dynamic sum of all recorded transactions formatted in Indian Rupees (₹) using Indian numbering standards.
  - **This Month's Spending**: Smart comparison of current year and month against transaction dates.
  - **Transaction Count**: Live tally of active records.
  - **Highest Expense**: Automatically highlights your largest single purchase.

- **Expense Management**:
  - **Add Expense**: Dedicated accessible modal dialog with input validation (Title, Amount > 0, Category, Date).
  - **Edit Expense**: In-place modal to modify existing transaction details with immediate state and storage sync.
  - **Delete Expense**: Two-step confirmation dialog with item preview preventing accidental data loss.

- **Fast Search & Multi-Tier Filtering**:
  - **Instant Title Search**: Filter expenses on every keystroke.
  - **Category Filter**: Filter by 9 dedicated categories (🍔 Food, 🚗 Transport, 🛍 Shopping, 💡 Bills, 🎬 Entertainment, ❤️ Health, 📚 Education, ✈ Travel, 📦 Other).
  - **Time Range Filter**: "All Time", "Today", "This Week", "This Month".
  - **4-Way Sorting**: "Newest First", "Oldest First", "Highest Amount", "Lowest Amount".
  - All filters and search criteria combine cohesively.

- **Data Visualizations**:
  - **Category Breakdown Chart**: Radiant gradient progress bars with percentage share and total spent per category.
  - **Recent Transactions**: Quick snapshot of the 5 most recent purchases with smooth scroll navigation.

- **User Experience & Accessibility**:
  - **Toast Notifications**: Real-time feedback for adds, edits, deletes, and errors.
  - **Contextual Empty States**: Friendly empty states for first-time users (with 1-click sample data loading) and zero-match search results (with instant filter reset).
  - **Accessible Dialogs**: Full keyboard navigation (`Esc` dismissal, focus trapping, aria attributes).
  - **Responsive Design**: Fluidly adapts across 320px, 375px, 425px, 768px, 1024px, and 1440px+ (desktop table automatically becomes interactive cards on mobile).

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: JavaScript (ES Modules)
- **Icons**: Lucide React
- **Styling**: Pure Modern CSS (CSS Variables, Flexbox, Grid, Glassmorphism, Keyframe Animations)
- **Persistence**: Browser `localStorage` (Keys: `personalExpenseManagerExpenses`, `expenseManagerTheme`)

---

## Project Structure

```text
expense-manager/
├── public/
│   └── favicon.svg              # App favicon
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Sticky frosted bar with logo, theme toggle, demo loader
│   │   ├── Dashboard.jsx        # Main orchestrator (insights banner, cards, list, charts)
│   │   ├── SummaryCards.jsx     # 4 financial stat cards (Total, Month, Count, Highest)
│   │   ├── ExpenseForm.jsx      # Modal form to add new expenses with validation
│   │   ├── ExpenseList.jsx      # Responsive table/card renderer
│   │   ├── ExpenseItem.jsx      # Individual expense row/card with actions
│   │   ├── SearchFilter.jsx     # Search bar, category filter, date pills, sort
│   │   ├── CategoryChart.jsx    # Spending breakdown bars & percentages
│   │   ├── RecentExpenses.jsx   # Top 5 recent transactions
│   │   ├── EmptyState.jsx       # Contextual empty state illustrations
│   │   ├── EditExpenseModal.jsx # Accessible modal to edit an expense
│   │   ├── DeleteConfirmation.jsx # Delete confirmation prompt
│   │   └── Toast.jsx            # Toast notifications
│   ├── utils/
│   │   ├── categories.js        # Category metadata, emojis, colors, and gradients
│   │   ├── formatters.js        # Indian Rupee (₹) & date formatters
│   │   └── sampleData.js        # Demo transactions generator
│   ├── App.jsx                  # Root state coordinator, theme sync & LocalStorage
│   ├── main.jsx                 # React root mounting
│   ├── index.css                # Design tokens & CSS reset
│   └── App.css                  # SaaS dashboard styling & media queries
├── index.html                   # HTML template with typography imports
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite React configuration
└── README.md                    # Project documentation
```

---

## How to Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Production build
npm run build
```

---

## Deployment (Netlify)

```bash
npm run build
# Deploy the generated dist/ folder to Netlify, Vercel, or GitHub Pages
```
