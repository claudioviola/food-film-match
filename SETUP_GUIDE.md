# 🚀 Food & Film Pairing - Complete Setup Guide

## ✅ Project Successfully Created!

Your Next.js 14+ Food & Film Pairing application has been fully generated with:

- ✅ Next.js 14+ with App Router
- ✅ TypeScript configured
- ✅ TailwindCSS + shadcn/ui installed
- ✅ React Server Components (RSC)
- ✅ Server Actions
- ✅ API Routes (REST-like)
- ✅ Local JSON storage

---

## 📋 STEP-BY-STEP SETUP

### 1️⃣ Get Your TMDB API Key (REQUIRED)

The app needs a TMDB API key to fetch movies:

1. Go to: https://www.themoviedb.org/signup
2. Create a free account
3. Go to: https://www.themoviedb.org/settings/api
4. Click "Request an API Key"
5. Choose "Developer" option
6. Fill out the form (use any URL for development)
7. Copy your **API Key (v3 auth)**

### 2️⃣ Configure Environment Variables

Edit the `.env.local` file in the project root:

```bash
# Open the file
nano .env.local

# Or use your editor
code .env.local
```

Replace `your_tmdb_api_key_here` with your actual TMDB API key:

```env
TMDB_API_KEY=abc123yourrealapikey456xyz
```

Save and close the file.

### 3️⃣ Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 🧪 TESTING CHECKLIST

### ✅ Test 1: Home Page (RSC)

1. Open http://localhost:3000
2. You should see:
   - A random meal from MealDB
   - A random movie from TMDB
   - A "Save This Pairing" button
3. **Verify RSC**: View page source (right-click → View Page Source)
   - The meal and movie data should be in the HTML

### ✅ Test 2: Server Actions

1. On the home page, click "Save This Pairing"
2. The page should reload/refresh
3. Go to http://localhost:3000/pairings
4. You should see your saved pairing!

### ✅ Test 3: Pairings Page (CSR)

1. Open http://localhost:3000/pairings
2. Open DevTools (F12) → Network tab
3. Refresh the page
4. You should see a fetch to `/api/pairings`
5. The saved pairings should display in a grid

### ✅ Test 4: Delete Pairing

1. On the pairings page, click the 🗑️ button on any pairing
2. Confirm deletion
3. The pairing should disappear from the list

### ✅ Test 5: API Routes

Test the API endpoints directly:

```bash
# GET all pairings
curl http://localhost:3000/api/pairings

# Should return JSON like:
# {"success":true,"data":[...]}
```

### ✅ Test 6: Multiple Pairings

1. Go back to home page (http://localhost:3000)
2. Refresh multiple times to get different pairings
3. Save 3-5 different pairings
4. Verify they all appear on `/pairings`

---

## 📁 KEY FILES TO UNDERSTAND

### Server Components (RSC)
- `src/app/page.tsx` - Home page with server-side data fetching

### Client Components (CSR)
- `src/app/pairings/page.tsx` - Pairings list with client-side rendering
- `src/components/SaveButton.tsx` - Form submit button

### Server Actions
- `src/app/actions/savePairing.ts` - Save and delete actions

### API Routes
- `src/app/api/pairings/route.ts` - GET, POST, DELETE handlers

### Storage
- `src/lib/storage.ts` - File system utilities
- `pairings.json` - Local storage file (auto-created)

### UI Components
- `src/components/PairingCard.tsx` - Main pairing display
- `src/components/ui/*` - shadcn/ui components

---

## 🎨 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────┐
│                   BROWSER                        │
├─────────────────────────────────────────────────┤
│                                                  │
│  Home (/)                  Pairings (/pairings) │
│  ┌──────────┐              ┌──────────┐         │
│  │   RSC    │              │   CSR    │         │
│  │ (Server) │              │ (Client) │         │
│  └────┬─────┘              └────┬─────┘         │
│       │                         │                │
└───────┼─────────────────────────┼────────────────┘
        │                         │
        ▼                         ▼
┌─────────────────────────────────────────────────┐
│                NEXT.JS SERVER                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  Server Actions          API Routes             │
│  ┌──────────────┐        ┌──────────────┐       │
│  │ savePairing  │        │ GET /api/... │       │
│  │ deletePairing│        │ POST         │       │
│  └──────┬───────┘        │ DELETE       │       │
│         │                └──────┬───────┘       │
│         └───────┬───────────────┘                │
│                 ▼                                │
│         ┌───────────────┐                        │
│         │  storage.ts   │                        │
│         │  (File I/O)   │                        │
│         └───────┬───────┘                        │
│                 ▼                                │
│         ┌───────────────┐                        │
│         │ pairings.json │                        │
│         └───────────────┘                        │
│                                                  │
│  External APIs:                                  │
│  • MealDB (random meal)                          │
│  • TMDB (popular movies)                         │
└─────────────────────────────────────────────────┘
```

---

## 🐛 TROUBLESHOOTING

### Problem: "Failed to fetch movie"

**Solution:**
1. Check your `.env.local` file has `TMDB_API_KEY` set
2. Verify the API key is correct at https://www.themoviedb.org/settings/api
3. Restart the dev server: `Ctrl+C` then `npm run dev`

### Problem: Images not showing

**Solution:**
1. Check `next.config.ts` has the correct `remotePatterns`
2. Restart dev server after config changes
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Problem: pairings.json not updating

**Solution:**
1. Check file permissions: `ls -la pairings.json`
2. Make sure the file exists in the project root
3. Try manually creating it: `echo "[]" > pairings.json`

### Problem: Port 3000 already in use

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process on port 3000
lsof -ti:3000 | xargs kill
```

---

## 🚢 DEPLOYMENT TO VERCEL

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Food & Film Pairing"
   git branch -M main
   git remote add origin https://github.com/yourusername/food-film-pairing.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `TMDB_API_KEY`
     - Value: Your TMDB API key
   - Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add TMDB_API_KEY

# Redeploy
vercel --prod
```

---

## 📊 FEATURES IMPLEMENTED

✅ **Home Page (RSC)**
- Server-side data fetching from MealDB
- Server-side data fetching from TMDB
- Pre-rendered HTML with meal and movie data
- Form with Server Action

✅ **Server Actions**
- `savePairingAction` - saves pairing to JSON
- `deletePairingAction` - removes pairing
- Form submission without API routes
- Automatic revalidation

✅ **Pairings Page (CSR)**
- Client-side rendering with `'use client'`
- Fetch from API route on mount
- Interactive delete functionality
- Loading and error states

✅ **API Routes**
- `GET /api/pairings` - returns all pairings
- `POST /api/pairings` - adds new pairing
- `DELETE /api/pairings?id=xxx` - deletes pairing
- Proper error handling and status codes

✅ **Local Storage**
- File-based storage using `fs.promises`
- Automatic file creation if missing
- CRUD operations on `pairings.json`

✅ **UI/UX**
- TailwindCSS styling
- shadcn/ui components (Card, Button, Badge, Separator)
- Responsive design
- Next.js Image optimization
- Navigation between pages

---

## 📝 NEXT STEPS

### Enhancements You Could Add:

1. **Add a database** (PostgreSQL, MongoDB, etc.)
   - Replace file storage for production use

2. **Add authentication**
   - Use NextAuth.js or Clerk
   - User-specific pairings

3. **Add more filters**
   - Search by meal category
   - Filter by movie genre
   - Sort by date/rating

4. **Add sharing**
   - Share pairings via URL
   - Social media integration

5. **Add favorites**
   - Mark pairings as favorites
   - Create custom collections

6. **Add animations**
   - Framer Motion for smooth transitions
   - Loading skeletons

7. **Add PWA support**
   - Offline functionality
   - Install as app

---

## 📚 LEARNING RESOURCES

- **Next.js Docs**: https://nextjs.org/docs
- **Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- **React Server Components**: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- **shadcn/ui**: https://ui.shadcn.com
- **TailwindCSS**: https://tailwindcss.com/docs

---

## 🎉 CONGRATULATIONS!

You now have a fully functional Next.js 14+ application with:
- ✅ RSC (React Server Components)
- ✅ CSR (Client-Side Rendering)
- ✅ SSR (Server-Side Rendering)
- ✅ Server Actions
- ✅ API Routes
- ✅ Modern UI with TailwindCSS + shadcn/ui

Enjoy building! 🚀
