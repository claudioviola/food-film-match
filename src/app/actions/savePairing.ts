'use server';

import { addPairing, deletePairing } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export interface SavePairingResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action: Save a new pairing
 */
export async function savePairingAction(formData: FormData): Promise<SavePairingResult> {
  try {
    const mealName = formData.get('mealName') as string;
    const mealImage = formData.get('mealImage') as string;
    const mealCategory = formData.get('mealCategory') as string;
    const movieTitle = formData.get('movieTitle') as string;
    const movieImage = formData.get('movieImage') as string;
    const movieReleaseDate = formData.get('movieReleaseDate') as string;
    const movieRating = formData.get('movieRating') as string;

    if (!mealName || !mealImage || !movieTitle || !movieImage) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    await addPairing({
      meal: {
        name: mealName,
        image: mealImage,
        category: mealCategory || undefined,
      },
      movie: {
        title: movieTitle,
        image: movieImage,
        releaseDate: movieReleaseDate || undefined,
        rating: movieRating ? parseFloat(movieRating) : undefined,
      },
    });

    // Revalidate the pairings page
    revalidatePath('/pairings');

    return {
      success: true,
      message: 'Pairing saved successfully!',
    };
  } catch (error) {
    console.error('Error saving pairing:', error);
    return {
      success: false,
      error: 'Failed to save pairing',
    };
  }
}

/**
 * Server Action: Delete a pairing
 */
export async function deletePairingAction(id: string): Promise<SavePairingResult> {
  try {
    const deleted = await deletePairing(id);
    
    if (!deleted) {
      return {
        success: false,
        error: 'Pairing not found',
      };
    }

    revalidatePath('/pairings');

    return {
      success: true,
      message: 'Pairing deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting pairing:', error);
    return {
      success: false,
      error: 'Failed to delete pairing',
    };
  }
}
