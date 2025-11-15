# 🍿 Food & Film Pairing

A Next.js 14+ application that generates random food and movie pairings using **React Server Components (RSC)**, **Server Actions**, and **API Routes**.

## 🎯 Features

- **Random Pairing Generation**: Get random meal + movie combinations from MealDB and TMDB APIs
- **Server-Side Rendering (SSR)**: Home page uses React Server Components for optimal performance
- **Client-Side Rendering (CSR)**: Pairings list page for dynamic interactions
- **Server Actions**: Modern form handling without API routes
- **REST API**: Full CRUD operations via `/api/pairings`
- **Local Storage**: Pairings saved to `pairings.json` file
- **Modern UI**: Built with TailwindCSS and shadcn/ui components
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **External APIs**: 
  - [MealDB](https://www.themealdb.com/api.php) (meals)
  - [TMDB](https://www.themoviedb.org/settings/api) (movies)
- **Storage**: Local JSON file (`pairings.json`)

## 📁 Project Structure

```
food-film-pairing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with navigation
│   │   ├── page.tsx                # Home page (RSC)
│   │   ├── actions/
│   │   │   └── savePairing.ts      # Server Actions
│   │   ├── pairings/
│   │   │   └── page.tsx            # Pairings list (CSR)
│   │   └── api/
│   │       └── pairings/
│   │           └── route.ts        # REST API handlers
│   ├── components/
│   │   ├── PairingCard.tsx         # Meal + Movie card component
│   │   ├── SaveButton.tsx          # Form submit button
│   │   └── ui/                     # shadcn/ui components
│   └── lib/
│       ├── storage.ts              # File system utilities
│       └── utils.ts                # shadcn utils
├── pairings.json                   # Local storage file
├── .env.local.example              # Environment variables template
└── next.config.ts                  # Next.js configuration
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get TMDB API Key

1. Visit [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Create a free account
3. Request an API key (v3 auth)
4. Copy your API key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your TMDB API key:

```env
TMDB_API_KEY=your_actual_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Home Page (/)

- Displays a random meal from MealDB
- Displays a random popular movie from TMDB
- Click "Save This Pairing" to save the combination
- Refresh the page to get a new pairing

### My Pairings (/pairings)

- View all saved pairings in a grid layout
- Delete pairings by clicking the 🗑️ button
- Empty state with link back to home page

## 🔌 API Routes

### GET `/api/pairings`

Returns all saved pairings.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "meal": {
        "name": "Spaghetti Carbonara",
        "image": "https://...",
        "category": "Pasta"
      },
      "movie": {
        "title": "The Godfather",
        "image": "https://...",
        "releaseDate": "1972-03-24",
        "rating": 8.7
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### POST `/api/pairings`

Add a new pairing.

**Request Body:**
```json
{
  "meal": {
    "name": "Pizza Margherita",
    "image": "https://...",
    "category": "Italian"
  },
  "movie": {
    "title": "Spider-Man",
    "image": "https://...",
    "releaseDate": "2002-05-01",
    "rating": 7.3
  }
}
```

### DELETE `/api/pairings?id={id}`

Delete a pairing by ID.

**Query Parameters:**
- `id`: The pairing ID to delete

## 🧪 Testing

### Test RSC (React Server Components)
```bash
# Visit home page - view page source to see pre-rendered HTML
curl http://localhost:3000
```

### Test Server Actions
1. Go to home page
2. Click "Save This Pairing"
3. Verify the pairing is saved by visiting `/pairings`

### Test API Routes
```bash
# GET all pairings
curl http://localhost:3000/api/pairings

# DELETE a pairing
curl -X DELETE "http://localhost:3000/api/pairings?id=1234567890"
```

### Test CSR (Client-Side Rendering)
1. Go to `/pairings`
2. Open DevTools Network tab
3. See the API call to `/api/pairings`

## 🚢 Deployment (Vercel)

### Option 1: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - Key: `TMDB_API_KEY`
   - Value: Your TMDB API key
5. Deploy!

### Important: Environment Variables

Don't forget to add `TMDB_API_KEY` in your Vercel project settings:

1. Go to Project Settings → Environment Variables
2. Add `TMDB_API_KEY` with your API key
3. Redeploy if necessary

## 🐛 Troubleshooting

### "Failed to fetch movie"
- Make sure `TMDB_API_KEY` is set in `.env.local`
- Verify your API key is valid at [TMDB Settings](https://www.themoviedb.org/settings/api)

### Images not loading
- Check `next.config.ts` has correct `remotePatterns` for image domains
- Restart dev server after config changes

### pairings.json permission errors
- Ensure the file has write permissions
- On production (Vercel), consider using a database instead of file storage

## 📝 Notes

- **MealDB** is free and doesn't require an API key
- **TMDB** requires a free API key (get one at themoviedb.org)
- Local file storage (`pairings.json`) works for development but consider a database for production
- The app uses `cache: 'no-store'` for fetches to ensure fresh data on each page load

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

MIT

---

Made with ❤️ using Next.js 14+ App Router
