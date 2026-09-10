# Rakib Portfolio — Multi-OS Interactive OS Portfolio

An interactive, native-mirroring portfolio that recreates multiple operating system shells (Windows, macOS, iOS, Android, Ubuntu) as an immersive portfolio experience for Md Rakib Ali.

This repository is built with modern web tooling and the Next.js App Router.

---

## Quick overview

- Author: Md Rakib Ali
- Purpose: A portfolio site showcasing projects and skills presented as a multi-OS desktop environment.
- Entry: open http://localhost:3000 after starting the dev server

---

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel (recommended for deployment)
- Optional tooling: pnpm, yarn or npm (pnpm recommended)

---

## Key features

- Automatic OS detection and device-adaptive rendering (Windows, macOS, iOS, Android, Ubuntu)
- Draggable, resizable windows with z-index and focus management
- Multiple desktop apps: Projects, Skills, About, Resume, YouTube player, Terminal, Settings, Recycle Bin
- Centralized project & content data at [src/data/portfolioData.ts](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/data/portfolioData.ts)

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- Git
- A package manager: pnpm (recommended), npm or yarn

If using pnpm (recommended) install it globally:

```powershell
npm install -g pnpm
```

---

## Setup (local development)

1. Clone the repository (if you haven't already):

```powershell
git clone https://github.com/Rakibislam22/rakibPortfolio.git
cd rakibPortfolio
```

2. Install dependencies (choose one):

```powershell
pnpm install
# or
npm install
# or
yarn
```

3. Start the development server:

```powershell
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open your browser at http://localhost:3000

---

## Build and production

Build the optimized production app:

```powershell
pnpm build
# or
npm run build
# or
yarn build
```

Run the production server locally:

```powershell
pnpm start
# or
npm start
# or
yarn start
```

For deployment, Vercel is recommended — this project is configured to work well with Vercel's platform.

---

## Important files & where to change content

- Site data (projects, skills, wallpapers, resume content): [src/data/portfolioData.ts](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/data/portfolioData.ts)
- Global OS state and window defaults: [src/context/OSContext.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/context/OSContext.tsx)
- Desktop canvas and app renderer: [src/components/desktop/Desktop.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/components/desktop/Desktop.tsx)
- App root and routing: [src/app/page.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/app/page.tsx)

When adding a new desktop application:
1. Create the React component under [src/components/apps/YourNewApp.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/components/apps/YourNewApp.tsx).
2. Add the app ID to the `AppId` type in [src/types/os.ts](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/types/os.ts).
3. Add initial window state in [src/context/OSContext.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/context/OSContext.tsx).
4. Add a desktop icon entry in `defaultDesktopItems` inside [src/data/portfolioData.ts](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/data/portfolioData.ts).
5. Map the app component inside `renderAppContent` in [src/components/desktop/Desktop.tsx](C:/Users/Rakib/Documents/WEB/rakibPortfolio/src/components/desktop/Desktop.tsx).

---

## Environment variables

This project does not require any secret environment variables to run in development by default. If runtime API keys or other values are needed later, add them to a `.env.local` (gitignored) file and reference them via process.env.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch for your change
3. Run the project and add tests if appropriate
4. Open a pull request describing your changes

Please keep TypeScript types and linting consistent with the existing code.

---

## Troubleshooting

- If you see missing dependency errors, run the chosen package manager's install command again
- If the dev server fails to start, ensure Node.js and the package manager versions meet the prerequisites
- If styling looks broken, ensure Tailwind processed successfully (the dev server normally handles this)

---

## License

MIT

---

*Generated/updated README — for developer reference see [AGENTS.md](C:/Users/Rakib/Documents/WEB/rakibPortfolio/AGENTS.md).*