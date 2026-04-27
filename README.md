# playwright-tests
playwright-tests is a project for YAJSC homeworks dedicated to practicing with auto-tests creation.
Includes end-to-end tests for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) written with [Playwright](https://playwright.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running Tests

| Command           | Description               |
|-------------------|---------------------------|
| `npm test`        | Run all tests (headless)  |
| `npm run ui:mode` | Open Playwright UI mode   |
| `npm run codegen` | Launch Playwright codegen |
| `npm run report`  | Open the last HTML report |

## Configuration

Key settings in `playwright.config.ts`:

- **Base URL**: `https://practicesoftwaretesting.com`
- **Test ID attribute**: `data-test`
- **Timeout per test**: 30 s
- **Expect timeout**: 10 s
- **Browsers**: Chromium (Firefox and WebKit are commented out)
- **Trace**: always collected locally (`on`), retained on failure in CI (`retain-on-failure`)
- **HTML report**: written to `playwright-report/html/`

## CI — GitHub Actions

Tests run automatically on every push and pull request targeting `main` or `master`.