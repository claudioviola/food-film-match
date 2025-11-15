import fs from 'fs/promises';
import path from 'path';

export interface Pairing {
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

const PAIRINGS_FILE = path.join(process.cwd(), 'pairings.json');

/**
 * Ensure pairings.json exists
 */
async function ensureFile(): Promise<void> {
  try {
    await fs.access(PAIRINGS_FILE);
  } catch {
    await fs.writeFile(PAIRINGS_FILE, '[]', 'utf-8');
  }
}

/**
 * Read all pairings from JSON file
 */
export async function readPairings(): Promise<Pairing[]> {
  await ensureFile();
  const data = await fs.readFile(PAIRINGS_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Write pairings to JSON file
 */
export async function writePairings(pairings: Pairing[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(PAIRINGS_FILE, JSON.stringify(pairings, null, 2), 'utf-8');
}

/**
 * Add a new pairing
 */
export async function addPairing(pairing: Omit<Pairing, 'id' | 'createdAt'>): Promise<Pairing> {
  const pairings = await readPairings();
  const newPairing: Pairing = {
    ...pairing,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  pairings.push(newPairing);
  await writePairings(pairings);
  return newPairing;
}

/**
 * Delete a pairing by ID
 */
export async function deletePairing(id: string): Promise<boolean> {
  const pairings = await readPairings();
  const filtered = pairings.filter((p) => p.id !== id);
  if (filtered.length === pairings.length) {
    return false; // Not found
  }
  await writePairings(filtered);
  return true;
}
