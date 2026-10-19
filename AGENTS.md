<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Development Rules & Guidelines

### 1. Lightweight & Fully Functional UI
- **Keep it Light**: Always build lightweight, optimized, and performant UI components to ensure fast load times and smooth rendering.
- **Fully Working**: Ensure all features, interactions, navigation, and controls are completely working and functional without breaking existing flows.

### 2. GSAP Animations with `useGSAP`
- **Hook Requirement**: Whenever using GSAP for animations, always use the `useGSAP` hook from `@gsap/react` (never raw `useEffect` or unscoped GSAP tweens).
- **Proper Scoping & Cleanup**: Always pass the component container reference (`scope`) to `useGSAP` so animations, timelines, and ScrollTriggers are properly scoped and automatically cleaned up during React re-renders and unmounts.

### 3. Image & Media Handling
- **Do Not Generate New Images**: Do not create, generate, or request new placeholder images.
- **Use Existing Assets**: The project already has more than enough images and media assets in `/public` (`/public/images/`, etc.) for UI construction.
- **Reference Only**: Treat all frontend mock data and imagery purely as reference/prototyping material, as the backend will provide the full production data.

### 4. Code Organization: Reusable Components & Data Files
- **Reusable Components**: Always create separate, dedicated files for reusable UI components (in `src/components/`) rather than creating monolithic files.
- **Dedicated Data Files**: Always place shared data, mock lists, and reference models into separate files under `src/data/` rather than inlining data objects inside component files.

### 5. Test Files & Verification
- **Always Create Test Files**: Always make dedicated test files (`*.test.tsx` / `*.test.ts`) when implementing or modifying components, hooks, and business logic to ensure everything is working and regressions are prevented.
- **Test File Location**: Place test files directly alongside the file they are testing (co-located, e.g. `ComponentName.test.tsx` next to `ComponentName.tsx`) or within an adjacent `__tests__/` directory.


