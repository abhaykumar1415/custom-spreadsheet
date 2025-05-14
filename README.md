# Custom React Spreadsheet Application

This is a fully custom-built **React spreadsheet** — developed from scratch without using any third-party spreadsheet libraries. It emulates core functionality of tools like Google Sheets including formulas, formatting, copy/paste, and file import/export.

---

## ✅ Feature Checklist

| Feature                                                               | Status |
| --------------------------------------------------------------------- | ------ |
| 1. Display a default 10x10 grid                                       | ✅     |
| 2. Add more rows and columns dynamically                              | ✅     |
| 3. Add formulas for SUM and AVERAGE that update automatically         | ✅     |
| 4. Format cells with bold text and background color                   | ✅     |
| 5. Ability to copy and paste cells                                    | ✅     |
| 6. Save the spreadsheet to JSON format and load existing spreadsheets | ✅     |

---

## Highlights

- Real-time formula evaluation (`=SUM`, `=AVERAGE`)
- Keyboard support for `Ctrl/Cmd + C` and `Ctrl/Cmd + V`
- Bold and background color formatting
- Extendable and modular architecture
- Clean and minimal UI inspired by spreadsheet tools

---

## Tech Stack

| Tech          | Purpose                   |
| ------------- | ------------------------- |
| React + Hooks | Component and state logic |
| JavaScript    | Formula evaluation logic  |
| CSS           | Styling and layout        |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone
cd to Application
npm install
npm start
```

## Architecture Overview

### 1. Performance Optimization

#### - React.memo() used for memoizing cells and headers

#### - useCallback() and useMemo() prevent unnecessary renders

#### - Atomic Component Design enables single-responsibility components that are easy to reason about, test, and extend individually

#### - Smart vs Dumb Component Separation

##### Spreadsheet handles state and logic (smart)

##### Cell, Toolbar, Header, Body are focused on UI (dumb))

### 2. Code Readability

#### - Logic split into utility files: formulaEngine.js, spreadsheetUtils.js

#### - Styling extracted to a centralized CSS file

#### - Separation of UI (Cell, Header, Body) and logic
