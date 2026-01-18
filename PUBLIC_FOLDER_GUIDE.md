# Public Folder Image Reference Guide

## The Problem: Why `/public/image.png` Breaks After Deployment

When you use paths like `/public/image.png` in your React/Vite/Next.js app, it works locally but breaks after deployment. Here's why:

### How It Works Locally vs. Production

**During Development (Vite dev server):**
- The dev server serves files from the `public` folder at the root URL
- A path like `/public/image.png` might work because the dev server is more forgiving
- However, this is **not the correct way** and will fail in production

**After Build/Deployment:**
- Vite copies everything from `public/` to the `dist/` root during build
- Files in `public/sun.png` become `dist/sun.png` (NOT `dist/public/sun.png`)
- When deployed, the server looks for files at the root, not in a `/public/` subdirectory
- A request to `/public/sun.png` returns 404 because that path doesn't exist

## ✅ Correct Way to Reference Public Folder Assets

### For Vite (React + Vite)

Files in the `public` folder should be referenced with a **leading slash `/`** but **without** the `public/` part:

```tsx
// ✅ CORRECT
<img src="/sun-removebg-preview.png" alt="Sun" />
<div style={{ backgroundImage: "url(/background.jpg)" }} />

// ❌ WRONG
<img src="public/sun-removebg-preview.png" alt="Sun" />
<img src="/public/sun-removebg-preview.png" alt="Sun" />
<img src="./public/sun-removebg-preview.png" alt="Sun" />
```

### For Next.js

Next.js works the same way:

```tsx
// ✅ CORRECT
<img src="/sun-removebg-preview.png" alt="Sun" />

// ❌ WRONG
<img src="public/sun-removebg-preview.png" alt="Sun" />
<img src="/public/sun-removebg-preview.png" alt="Sun" />
```

### Using `import.meta.env.BASE_URL` (For Subdirectory Deployments)

If deploying to a subdirectory (e.g., `https://example.com/my-app/`), use:

```tsx
// ✅ CORRECT for subdirectory deployments
<img src={`${import.meta.env.BASE_URL}sun-removebg-preview.png`} alt="Sun" />
```

## Examples from This Project

### Before (Broken):
```tsx
const getIconPath = (condition: string) => {
  switch (condition) {
    case "clear":
      return "public/sun-removebg-preview.png"; // ❌ Wrong!
    // ...
  }
};
```

### After (Fixed):
```tsx
const getIconPath = (condition: string) => {
  switch (condition) {
    case "clear":
      return "/sun-removebg-preview.png"; // ✅ Correct!
    // ...
  }
};
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Including `public/` in the path
```tsx
// Wrong
<img src="public/logo.png" />
<img src="/public/logo.png" />
```

### ❌ Mistake 2: Using relative paths
```tsx
// Wrong - these won't work from public folder
<img src="./public/logo.png" />
<img src="../public/logo.png" />
```

### ❌ Mistake 3: Using `require()` or `import` for public assets
```tsx
// Wrong - don't import public folder assets
import logo from '/public/logo.png'; // This won't work as expected
```

### ✅ Correct Approaches:

**1. Direct path reference (most common):**
```tsx
<img src="/logo.png" alt="Logo" />
```

**2. In CSS/Inline styles:**
```tsx
<div style={{ backgroundImage: "url(/background.jpg)" }} />
```

**3. In CSS files:**
```css
.hero {
  background-image: url(/background.jpg);
}
```

**4. Dynamic paths:**
```tsx
const imagePath = `/images/${imageName}.png`;
<img src={imagePath} alt="Dynamic" />
```

## Understanding the Build Process

### File Structure:
```
project-root/
├── public/              ← Source files (not included in bundle)
│   ├── sun.png
│   ├── logo.svg
│   └── favicon.ico
├── src/                 ← Source code (bundled)
│   └── components/
└── dist/                ← Build output
    ├── index.html
    ├── assets/          ← Bundled JS/CSS
    ├── sun.png          ← Copied from public/ (NOT in public/ subfolder!)
    ├── logo.svg
    └── favicon.ico
```

### What Happens During Build:

1. **Vite copies** all files from `public/` directly to `dist/` root
2. **No `public/` folder** exists in `dist/`
3. Files are served from the root URL path
4. `/sun.png` maps to `dist/sun.png` ✅
5. `/public/sun.png` would look for `dist/public/sun.png` ❌ (doesn't exist!)

## Testing Your Fix

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Check the `dist` folder:**
   - Verify images are in `dist/` root, not `dist/public/`

3. **Preview locally:**
   ```bash
   npm run preview
   ```
   - Test that images load correctly

4. **Deploy and verify:**
   - Images should now work on your hosted site

## Quick Reference

| What You Want | Correct Path | Wrong Path |
|--------------|--------------|------------|
| Image in public folder | `/image.png` | `public/image.png` |
| Background image | `url(/bg.jpg)` | `url(/public/bg.jpg)` |
| Favicon | `/favicon.ico` | `public/favicon.ico` |
| Subdirectory deploy | `${import.meta.env.BASE_URL}image.png` | `/public/image.png` |

## Summary

- ✅ Use `/filename.png` (leading slash, no `public/`)
- ❌ Never use `public/filename.png` or `/public/filename.png`
- ✅ Public folder files are copied to dist root during build
- ✅ Reference them as if they're at the website root

Your images should now work both locally and after deployment! 🎉
