'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Pairing {
  id: string;
  meal: {
    name: string;
    image: string;
    category?: string;
  };
  movie: {
    title: string;
    image: string;
    releaseDate?: string;
    rating?: number;
  };
  createdAt: string;
}

/**
 * Pairings Page - Client-Side Rendered
 */
export default function PairingsPage() {
  const [pairings, setPairings] = useState<Pairing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pairings on mount
  useEffect(() => {
    fetchPairings();
  }, []);

  async function fetchPairings() {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/pairings');
      const data = await res.json();
      
      if (data.success) {
        setPairings(data.data);
      } else {
        setError(data.error || 'Failed to load pairings');
      }
    } catch (err) {
      console.error('Error fetching pairings:', err);
      setError('Failed to load pairings');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this pairing?')) {
      return;
    }

    try {
      const res = await fetch(`/api/pairings?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (data.success) {
        setPairings((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || 'Failed to delete pairing');
      }
    } catch (err) {
      console.error('Error deleting pairing:', err);
      alert('Failed to delete pairing');
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Loading your pairings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">⚠️ Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={fetchPairings} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (pairings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">📭 No Pairings Yet</h2>
        <p className="text-muted-foreground mb-6">
          You haven&apos;t saved any pairings yet. Go to the home page to discover your first match!
        </p>
        <Button asChild>
          <a href="/">Discover Pairings</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">My Food & Film Pairings</h2>
        <p className="text-muted-foreground">
          You have saved {pairings.length} pairing{pairings.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pairings.map((pairing) => (
          <Card key={pairing.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>🍿 Pairing</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(pairing.id)}
                  className="text-destructive hover:text-destructive"
                >
                  🗑️
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">🍽️ Meal</p>
                  {pairing.meal.category && (
                    <Badge variant="outline" className="text-xs">
                      {pairing.meal.category}
                    </Badge>
                  )}
                </div>
                <div className="relative w-full h-32 rounded overflow-hidden">
                  <Image
                    src={pairing.meal.image}
                    alt={pairing.meal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <p className="text-sm font-medium line-clamp-2">{pairing.meal.name}</p>
              </div>

              <Separator />

              {/* Movie */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">🎥 Movie</p>
                  {pairing.movie.rating && (
                    <Badge variant="default" className="text-xs">
                      ⭐ {pairing.movie.rating.toFixed(1)}
                    </Badge>
                  )}
                </div>
                <div className="relative w-full h-32 rounded overflow-hidden">
                  <Image
                    src={pairing.movie.image}
                    alt={pairing.movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <p className="text-sm font-medium line-clamp-2">{pairing.movie.title}</p>
                {pairing.movie.releaseDate && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(pairing.movie.releaseDate).getFullYear()}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground text-center">
                  Saved {new Date(pairing.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
