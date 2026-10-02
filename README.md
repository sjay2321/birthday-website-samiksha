# A Birthday Surprise for Samiksha 🎉

A personalized cinematic birthday experience from Jay, built with React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, GSAP and React Three Fiber. Includes animated chapters, interactive reason cards, a 3D gift, letter, photo gallery, music, and a surprise finale.

## Requirements
- Node.js 22.12+ (recommended current LTS) and npm
- Windows 10/11, macOS, or Linux

## Run on Windows (PowerShell)
1. Extract the ZIP to a folder, e.g. `C:\Projects\birthday-website`.
2. Open that folder in VS Code, then Terminal → New Terminal.
3. Run:

```powershell
cd C:\Projects\birthday-website
npm install
npm run dev
```

4. Open the local URL printed by Vite (normally `http://localhost:5173`).
5. Validate before sharing:

```powershell
npm run build
npm run lint
npm run preview
```

## Personalize content and photos
Edit `src/config/content.ts` for the recipient, sender, chapter text, and captions. Add personal photos to `public/photos/`, then set each gallery item `src` to `/photos/your-file.jpg`. The included gallery cards are placeholders until you add your own images. Replace `public/audio/theme-song.mp3` with audio you have permission to use, keeping the same filename, or update `musicSrc`. Browsers require a user gesture before audio can start; use the music control if playback does not begin automatically.

## Navigation and accessibility
Use the chapter controls and progress indicator; on touch screens, swipe horizontally to move between chapters. Vertical scrolling is retained for content. Keyboard focus outlines and reduced-motion CSS are included.

## Deploy
### Vercel
1. Push the extracted project to a GitHub repository.
2. Import the repository at https://vercel.com/.
3. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
4. Deploy and open the assigned URL.

### Netlify
1. Push to GitHub and import at https://app.netlify.com/.
2. Build command: `npm run build`; publish directory: `dist`.
3. Deploy and test the live URL on both desktop and mobile.

## Project structure
- `src/components/chapters/` — six narrative chapters
- `src/components/` — shared loader, music, cursor, particles and progress UI
- `src/scenes/GiftBoxScene.tsx` — lazy-loaded 3D gift
- `src/config/content.ts` — personalization settings
- `public/audio/` — background music; `public/photos/` — add personal gallery images

Build/lint status should be confirmed on the target machine with the commands above.
