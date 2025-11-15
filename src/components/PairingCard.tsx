import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PairingCardProps {
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
  children?: React.ReactNode;
}

export function PairingCard({ meal, movie, children }: PairingCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">🍿 Food & Film Pairing 🎬</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meal Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">🍽️ Tonight&apos;s Meal</h3>
            {meal.category && (
              <Badge variant="secondary">{meal.category}</Badge>
            )}
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <p className="text-lg font-medium text-center">{meal.name}</p>
        </div>

        <Separator />

        {/* Movie Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">🎥 Perfect Movie Match</h3>
            {movie.rating && (
              <Badge variant="default">⭐ {movie.rating.toFixed(1)}</Badge>
            )}
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">{movie.title}</p>
            {movie.releaseDate && (
              <p className="text-sm text-muted-foreground">
                {new Date(movie.releaseDate).getFullYear()}
              </p>
            )}
          </div>
        </div>

        {/* Action Button Area */}
        {children && (
          <div className="pt-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
