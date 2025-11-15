import { PairingCard } from '@/components/PairingCard';
import { SaveButton } from '@/components/SaveButton';
import { savePairingAction } from './actions/savePairing';

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

/**
 * Fetch random meal from MealDB
 */
async function getRandomMeal(): Promise<Meal | null> {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch meal');
    }
    
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching meal:', error);
    return null;
  }
}

/**
 * Fetch random popular movie from TMDB
 */
async function getRandomMovie(): Promise<Movie | null> {
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    console.error('TMDB_API_KEY not configured');
    return null;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch movie');
    }
    
    const data = await res.json();
    const movies = data.results || [];
    
    if (movies.length === 0) {
      return null;
    }
    
    // Pick a random movie from the popular list
    const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 10));
    return movies[randomIndex];
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

/**
 * Home Page - React Server Component
 */
export default async function HomePage() {
  const [meal, movie] = await Promise.all([
    getRandomMeal(),
    getRandomMovie(),
  ]);

  if (!meal || !movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">⚠️ Oops!</h2>
        <p className="text-muted-foreground">
          {!meal && 'Failed to fetch meal. '}
          {!movie && 'Failed to fetch movie. '}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {!movie && 'Make sure TMDB_API_KEY is configured in .env.local'}
        </p>
      </div>
    );
  }

  const mealData = {
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
  };

  const movieData = {
    title: movie.title,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Discover Your Perfect Pairing</h2>
        <p className="text-muted-foreground">
          A randomly generated meal and movie combination just for you!
        </p>
      </div>

      <form action={savePairingAction}>
        {/* Hidden fields for Server Action */}
        <input type="hidden" name="mealName" value={mealData.name} />
        <input type="hidden" name="mealImage" value={mealData.image} />
        <input type="hidden" name="mealCategory" value={mealData.category} />
        <input type="hidden" name="movieTitle" value={movieData.title} />
        <input type="hidden" name="movieImage" value={movieData.image} />
        <input type="hidden" name="movieReleaseDate" value={movieData.releaseDate} />
        <input type="hidden" name="movieRating" value={movieData.rating.toString()} />

        <PairingCard meal={mealData} movie={movieData}>
          <SaveButton />
        </PairingCard>
      </form>

      <div className="text-center mt-6">
        <a 
          href="/" 
          className="text-sm text-muted-foreground hover:underline"
        >
          🔄 Refresh for a new pairing
        </a>
      </div>
    </div>
  );
}
