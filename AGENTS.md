<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 🖥️ Rakib Portfolio - Multi-OS System Architecture & Guide

This project is an interactive, native-mirroring Operating System Portfolio built for **Md Rakib Ali** using **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🌟 Core System Features

1. **Automatic Device OS Auto-Detection**:
   - Automatically detects whether the visitor is accessing from **Windows**, **macOS**, **Apple iOS (iPhone/iPad)**, **Android**, or **Linux / Ubuntu** using `useOSDetection`.
   - Directly renders that exact authentic OS interface without any manual switcher UI, creating a 1:1 immersive feeling that matches the visitor's own operating system.

2. **Authentic Multi-OS Shells**:
   - **🪟 Windows 11**: Centered acrylic taskbar, animated Start Menu with search and pinned apps, Quick Settings flyout (Wi-Fi, Bluetooth, Night Light, Volume slider), Calendar flyout, and acrylic window controls (`—`, `□`, `✕`).
   - **🍎 macOS (Sequoia / Sonoma)**: Frosted top menu bar with Apple logo, Spotlight search bar popover, Control Center flyout (Display brightness, Sound volume, Wi-Fi, Bluetooth), floating bottom dock with hover scaling and running indicator dots, and traffic light controls (`🔴`, `🟡`, `🟢`).
   - **📱 Apple iOS 18**: Top status bar with interactive **Dynamic Island**, authentic squircle app grid (`rounded-[22%]`), frosted bottom dock, search badge, page indicator dots, and full-screen slide-up app sheets with gesture home indicator bar.
   - **🤖 Android 15 Material You**: Top status bar with battery %, **At A Glance** date/weather widget, themed circular/squircle app icons with pastel tonal accent rings, Google search pill, and bottom navigation bar.
   - **🐧 Ubuntu Linux (24.04 LTS)**: Top status panel with Activities, left vertical app dock with running indicators, and dark aubergine Yaru theme.

3. **Multi-Window Management**:
   - Draggable windows with viewport boundary collision checks.
   - Resizable windows (edges and corners).
   - Minimize, maximize/restore, and close controls.
   - Z-index and active focus orchestration.

4. **Desktop Applications**:
   - 📁 **Projects Explorer** (`ProjectsApp.tsx`): Filterable portfolio showcase with screenshots, tags, live demo buttons, GitHub links, and detail modal.
   - ⚡ **Skills & Tech Stack** (`SkillsApp.tsx`): Interactive control panel with proficiency meters, experience years, and search filter.
   - 👤 **About Me** (`AboutApp.tsx`): Notepad/profile view with Md Rakib Ali's photo, story tabs, Competitive Programming showcase (LeetCode, Codeforces, HackerRank, CodeChef), and client testimonials.
   - 🎓 **Education & Resume** (`ResumeApp.tsx`): Credentials, GPA, coursework, 4 certifications, and printable/downloadable CV PDF.
   - 🎬 **YouTube Studio & Player** (`YouTubeApp.tsx`): Interactive video and audio player with Project Demos, Live Lo-Fi Coding Beats, and Tech Talks.
   - ✉️ **Contact & Mail** (`ContactApp.tsx`): Interactive mail composer, one-click email copy, phone number, and direct social links.
   - 💻 **Terminal Shell** (`TerminalApp.tsx`): Interactive CLI with `neofetch`, `projects`, `skills`, `youtube`, `theme <os>`, `matrix`, `help`, and command history.
   - ⚙️ **Settings & Customization** (`SettingsApp.tsx`): Detected OS profile, wallpaper picker, system specifications.
   - 🗑️ **Recycle Bin** (`RecycleBinApp.tsx`): Easter eggs, humorous deleted bugs, and code snippets.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout with Geist font and viewport settings
│   ├── page.tsx               # Main entry point with OSProvider & Desktop
│   └── globals.css            # Tailwind v4 theme, custom OS scrollbars & full viewport
├── types/
│   └── os.ts                  # TypeScript interfaces (OSType, AppId, WindowInstance, ProjectItem, etc.)
├── data/
│   └── portfolioData.ts       # Central data repository for Rakib (Projects, Skills, Bio, Education, Wallpapers)
├── context/
│   └── OSContext.tsx          # Global OS state (active OS, window stack, active window, wallpaper)
├── hooks/
│   └── useOSDetection.ts      # Client OS auto-detection hook (iOS, Android, Windows, Mac, Linux)
├── components/
│   ├── desktop/
│   │   ├── Desktop.tsx        # Main desktop canvas & icon grid
│   │   ├── DesktopIcon.tsx    # Double-click / tap desktop shortcut icon
│   │   ├── ContextMenu.tsx    # Right-click context menu
│   │   └── WindowFrame.tsx    # Draggable, resizable, OS-adaptive window wrapper
│   ├── shells/
│   │   ├── WindowsShell.tsx   # Windows 11 Taskbar, Start Menu, Quick Settings & Calendar
│   │   ├── MacOSShell.tsx     # macOS Top Menu Bar, Spotlight & Control Center & Dock
│   │   ├── IOSShell.tsx       # Apple iOS 18 Dynamic Island, App Grid & Home Indicator
│   │   ├── AndroidShell.tsx   # Android 15 Material You Widget, App Grid & Search Pill
│   │   └── UbuntuShell.tsx    # Ubuntu Top Panel & Left Dock
│   └── apps/
│       ├── ProjectsApp.tsx    # Projects file explorer & modal showcase
│       ├── SkillsApp.tsx      # Skills tree & control panel
│       ├── AboutApp.tsx       # Bio & Profile Notepad with CP and Testimonials
│       ├── ResumeApp.tsx      # Education credentials & Resume viewer
│       ├── YouTubeApp.tsx     # Embedded YouTube player & developer playlist
│       ├── ContactApp.tsx     # Mail client & social links
│       ├── TerminalApp.tsx    # Interactive CLI shell (neofetch, custom commands)
│       ├── SettingsApp.tsx    # Wallpaper picker, system information
│       └── RecycleBinApp.tsx  # Easter eggs & deleted bugs
```

---

## 🚀 Step-by-Step Guide for Future Upgrades

### 1. How to Add or Modify Projects, Skills, and Bio
All portfolio information is centralized in [`src/data/portfolioData.ts`](file:///d:/my-code/WEB/rakib-portfolio/src/data/portfolioData.ts).
- To add a project, add an entry to the `projects` array.
- To update skills, edit the `skillCategories` array.
- To change wallpapers, edit the `wallpapers` array.

### 2. How to Add a New Desktop Application
1. Create your component in `src/components/apps/YourNewApp.tsx`.
2. Add the app ID to `AppId` in [`src/types/os.ts`](file:///d:/my-code/WEB/rakib-portfolio/src/types/os.ts).
3. Add window initial state in [`src/context/OSContext.tsx`](file:///d:/my-code/WEB/rakib-portfolio/src/context/OSContext.tsx).
4. Add the desktop icon shortcut in `defaultDesktopItems` in [`src/data/portfolioData.ts`](file:///d:/my-code/WEB/rakib-portfolio/src/data/portfolioData.ts).
5. Map the app component inside `renderAppContent` in [`src/components/desktop/Desktop.tsx`](file:///d:/my-code/WEB/rakib-portfolio/src/components/desktop/Desktop.tsx).

---

## 💡 Important Rules for AI Agents
- Always maintain full type safety with TypeScript.
- Preserve the Next.js rules block at the top of `AGENTS.md`.
- Keep window management responsive across desktop, tablet, and mobile displays.
