'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={pending}
      size="lg"
    >
      {pending ? '💾 Saving...' : '💾 Save This Pairing'}
    </Button>
  );
}
