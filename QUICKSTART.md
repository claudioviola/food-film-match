# ⚡ Quick Start - Food & Film Pairing

## 🎯 In 3 Steps:

### 1. Get TMDB API Key
Visit: https://www.themoviedb.org/settings/api
Copy your API key (v3 auth)

### 2. Add API Key to .env.local
```bash
# Edit this file
nano .env.local

# Replace with your real key:
TMDB_API_KEY=paste_your_key_here
```

### 3. Run the App
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📂 Files Created

```
food-film-pairing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ✅ Root layout
│   │   ├── page.tsx                ✅ Home (RSC)
│   │   ├── actions/
│   │   │   └── savePairing.ts      ✅ Server Actions
│   │   ├── pairings/
│   │   │   └── page.tsx            ✅ List (CSR)
│   │   └── api/
│   │       └── pairings/
│   │           └── route.ts        ✅ REST API
│   ├── components/
│   │   ├── PairingCard.tsx         ✅ Card UI
│   │   ├── SaveButton.tsx          ✅ Button
│   │   └── ui/                     ✅ shadcn/ui
│   └── lib/
│       └── storage.ts              ✅ File I/O
├── pairings.json                   ✅ Data storage
├── .env.local.example              ✅ Template
└── README.md                       ✅ Full docs
```

---

## ✨ What You Can Do

1. **Home Page** (`/`)
   - View random meal + movie pairing
   - Click "Save This Pairing"

2. **My Pairings** (`/pairings`)
   - View all saved pairings
   - Delete pairings

3. **API** (`/api/pairings`)
   - GET: List all
   - POST: Add new
   - DELETE: Remove one

---

## 🧪 Quick Test

```bash
# Test RSC (view HTML source)
curl http://localhost:3000

# Test API
curl http://localhost:3000/api/pairings
```

---

## 📚 More Info

- Full documentation: `README.md`
- Complete setup guide: `SETUP_GUIDE.md`

---

**Ready to code!** 🚀
